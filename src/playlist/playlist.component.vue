<template>
  <v-list>
    <v-subheader>
      <span class="title">Playlist</span>
    </v-subheader>
    <v-list-item-group>
      <draggable
        v-model="playlist"
        v-bind="dragOptions"
        :setData="modifyDragItem"
        @start="startDrag($event)"
        @end="endDrag($event)"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <v-list-item
            v-for="(track, i) in playlist"
            :key="`${track[0]}-${track[1]}-${track[3]}`"
          >
            <v-hover>
              <v-icon @click="removeFromPlaylist(i)">
                mdi-close
              </v-icon>
            </v-hover>
            <v-hover>
              <v-icon
                slot-scope="{ hover }"
                :class="`${hover ? 'green--text' : ''}`"
                @click="playFromPlaylist(i)"
              >
                mdi-play
              </v-icon>
            </v-hover>
            <v-hover>
              <v-icon
                slot-scope="{ hover }"
                :class="`${hover ? 'red--text' : ''}`"
                @click="stopPlayer()"
              >
                mdi-stop
              </v-icon>
            </v-hover>
            {{ track[0] }} - {{ track[2] }}
          </v-list-item>
        </transition-group>
      </draggable>
    </v-list-item-group>
  </v-list>
</template>

<script>
/* eslint no-console: 0 */
import axios from "axios";
import draggable from "vuedraggable";

export default {
  name: "Playlist",

  components: {
    draggable
  },

  data: () => {
    return {
      drag: false
    };
  },
  created() {
    // axios.get("http://192.168.1.20:5000/get-playlist").then(response => {
    //   this.$store.commit("resetPlaylist", response.data);
    // });
    this.$store.dispatch("populatePlaylist");
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "tracks",
        disabled: false
      };
    },
    playlist: {
      get() {
        return this.$store.state.playlist;
      },
      set(newlist) {
        this.$store.commit("resetPlaylist", newlist);
      }
    }
  },
  methods: {
    endDrag() {
      this.drag = false;
      axios
        .post("http://192.168.1.20:5000/re-order-list", this.playlist, {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          console.log("response");
          console.log(response.data);
          this.$store.commit("resetPlaylist", response.data);
          this.$forceUpdate();
        });
    },
    modifyDragItem(dataTransfer) {
      // This prevents a 'ghost' item (different from that referenced by 'ghostClass')
      dataTransfer.setDragImage(document.createElement("div"), 0, 0);
    },
    playFromPlaylist(index) {
      axios.get(`http://192.168.1.20:5000/play-from-list/${index}`).then(() => {
        console.log(["Playing"]);
      });
    },
    removeFromPlaylist(index) {
      // this.$store.commit("removeSingleFromPlaylist", index);
      this.$store.dispatch("removeFromPlaylist", index);
      // this.$store.dispatch("populatePlaylist");
    },
    startDrag() {
      this.drag = true;
    },
    stopPlayer() {
      axios.get("http://192.168.1.20:5000/stop").then(() => {
        console.log("Stopped");
      });
    }
  }
};
</script>
