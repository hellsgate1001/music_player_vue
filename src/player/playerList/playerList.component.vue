<template>
  <v-list class="height-85">
    <!-- <v-subheader>CT is {{ currentTrack }}</v-subheader> -->
    <v-list-item-group class="scroll-container">
      <draggable
        v-model="playlist"
        v-bind="dragOptions"
        :setData="modifyDragItem"
        :ghostClass="ghostClass"
        handle=".dragHandle"
        @start="startDrag($event)"
        @end="endDrag($event)"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <v-list-item v-for="(track, i) in playlist" :key="stringify(track)">
            <v-container @dblclick="playTrack(i)">
              <v-row :class="`${currentTrack === i ? 'red--text' : ''}`">
                <v-col class="playerColumn" cols="1">
                  {{ i + 1 }}
                </v-col>
                <v-col class="playerColumn" cols="11">
                  {{ track[2] }}
                </v-col>
              </v-row>
              <v-row>
                <v-col class="playerColumn caption" cols="10" offset="1">
                  {{ track[0] }} - {{ track[1] }}
                </v-col>
                <v-col class="playerColumn" cols="1">
                  <v-hover>
                    <v-icon
                      slot-scope="{ hover }"
                      class="dragHandle"
                      :class="`${hover ? 'primary--text' : ''}`"
                    >
                      mdi-drag-vertical
                    </v-icon>
                  </v-hover>
                </v-col>
                <!-- <v-col class="playerColumn" cols="1">
                  <v-list-item-action @click.stop>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-hover>
                          <v-icon
                          slot-scope="{ hover }"
                            :class="`${hover ? 'primary--text' : ''}`"
                          >
                            mdi-dots-horizontal
                          </v-icon>
                        </v-hover>
                      </template>
                      <v-list>
                        <v-list-item @click="playTrack(i)">
                          Play
                        </v-list-item>
                        <v-list-item @click="removeFromPlaylist(i)">
                          Remove from list
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-col> -->
              </v-row>
            </v-container>
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
  name: "PlayerList",

  components: {
    draggable
  },

  data: () => {
    return {
      drag: false
    };
  },

  created() {
    this.$store.commit("setSearch", false);
  },
  computed: {
    connected: {
      get() {
        return this.$store.state.connected;
      }
    },
    currentTrack: {
      get() {
        return this.$store.state.currentTrack;
      }
    },
    ctType() {
      return typeof this.currentTrack;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "tracks",
        disabled: false
      };
    },
    ghostClass() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "ghost";
        default:
          return "";
      }
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
          this.$store.commit("resetPlaylist", response.data);
          this.$forceUpdate();
          this.$socket.emit("reorder");
        });
    },
    playTrack(trackIndex) {
      this.$store.dispatch("playFromPlaylist", trackIndex);
      this.$store.dispatch("createImage", this.playlist[this.currentTrack]);
    },
    removeFromPlaylist(index) {
      this.$store.dispatch("removeFromPlaylist", index);
    },
    modifyDragItem(dataTransfer) {
      // This prevents a 'ghost' item (different from that referenced by 'ghostClass')
      dataTransfer.setDragImage(document.createElement("div"), 0, 0);
    },
    startDrag() {
      this.drag = true;
    },
    stringify(object) {
      return JSON.stringify(object);
    }
  },
  sockets: {
    list_reordered(playlist) {
      this.$store.commit("resetPlaylist", playlist);
    }
  }
};
</script>

<style scoped>
.playerColumn {
  padding-bottom: 0;
  padding-top: 0;
}
.dragHandle {
  cursor: move;
}
.ghost {
  opacity: 0;
}
</style>
