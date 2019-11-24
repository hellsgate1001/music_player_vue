<template>
  <div>
    <v-container style="height: 85vh">
      <v-stepper v-model="e1" style="height: 100%; overflow:auto;">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-list>
              <v-subheader>
                <span class="title">Artists</span>
              </v-subheader>
              <v-list-item-group id="artist-group">
                <v-list-item
                  v-for="artist in artists"
                  :key="artist"
                  v-on:click="getAlbums(artist)"
                >
                  {{ artist }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-list>
              <v-subheader>
                <span class="title">Albums</span>
                <span style="margin-left: 1em; cursor: pointer;" @click="e1 = 1"
                  >Back to artists</span
                >
              </v-subheader>
              <v-list-item-group>
                <v-list-item
                  v-for="album in albums"
                  :key="album"
                  v-on:click="getSongs(album)"
                >
                  {{ album }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-list>
              <v-subheader>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon style="margin-right: 1em;" v-on="on" @click="e1 = 2"
                      >mdi-arrow-left</v-icon
                    >
                  </template>
                  <span>Back to albums</span>
                </v-tooltip>
                <span class="title">Songs</span>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      style="margin-left: 1em; position: absolute; right: 1em;"
                      v-on="on"
                      >mdi-menu</v-icon
                    >
                  </template>

                  <v-list>
                    <v-list-item @click="playAlbum()">
                      <v-list-item-title>Play All</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="addAll()">
                      <v-list-item-title>Add All To Playlist</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-subheader>
              <v-list-item-group>
                <v-list-item v-for="(song, i) in songs" :key="song[3]">
                  <v-hover>
                    <v-icon
                      slot-scope="{ hover }"
                      :class="`${hover ? 'green--text' : ''}`"
                    >
                      mdi-play
                    </v-icon>
                  </v-hover>
                  <v-icon
                    style="margin-right: 0.3em;"
                    :class="{ 'd-none': !plus[i] }"
                    :data-tracknum="song[3]"
                    @click="addToPlaylist(i, $event)"
                  >
                    mdi-plus
                  </v-icon>
                  <v-icon
                    style="margin-right: 0.3em;"
                    :class="{ 'd-none': plus[i] }"
                    :data-tracknum="song[3]"
                    @click="removeFromPlaylist(i)"
                  >
                    mdi-minus
                  </v-icon>
                  {{ song[3] }}: {{ song[2] }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
/* eslint no-console: 0 */
import axios from "axios";

export default {
  name: "Browser",

  data: () => {
    return {
      artists: [],
      artist: "",
      albums: [],
      album: "",
      songs: [],
      e1: 0,
      plus: []
    };
  },
  created() {
    axios.get("http://192.168.1.20:5000/artists").then(response => {
      this.artists = response.data;
    });
  },
  methods: {
    addAll() {
      this.$store.commit("addMultipleToPlaylist", this.songs);
      for (let i in this.plus) {
        this.plus[i] = false;
      }
      this.$forceUpdate();
      axios
        .get(
          `http://192.168.1.20:5000/add-album-to-playlist/${this.artist}/${this.album}`
        )
        .then(() => {
          console.log("Added");
        });
    },
    addToPlaylist(i, event) {
      this.$store.commit("addSingleToPlaylist", this.songs[i]);
      this.plus[i] = false;
      this.$forceUpdate();
      const tracknum = event.target.getAttribute("data-tracknum");
      axios
        .get(
          `http://192.168.1.20:5000/add-to-playlist/${this.artist}/${this.album}/${tracknum}`
        )
        .then(() => {});
    },
    arrayItemsMatch(arr1, arr2) {
      let result = true;
      for (let i in arr1) {
        if (arr1[i] !== arr2[i]) {
          result = false;
        }
      }
      return result;
    },
    indexInArray(arr, item) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (
          arr[i].length == item.length &&
          this.arrayItemsMatch(arr[i], item)
        ) {
          return i;
        }
      }
      return -1;
    },
    isArrayInArray(arr, item) {
      const item_as_string = JSON.stringify(item);

      const contains = arr.some(function(ele) {
        return JSON.stringify(ele) === item_as_string;
      });
      return contains;
    },
    calculatePlus() {
      this.plus = [];
      this.songs.forEach((song, i) => {
        this.plus[i] = !this.isArrayInArray(this.$store.state.playlist, song);
      });
      console.log(this.plus);
      this.$forceUpdate();
    },
    getAlbums(artist) {
      this.artist = artist;
      axios.get(`http://192.168.1.20:5000/artist/${artist}`).then(response => {
        this.albums = response.data;
        this.e1 = 2;
      });
    },
    getSongs(album) {
      this.album = album;
      axios
        .get(`http://192.168.1.20:5000/artist/${this.artist}/${album}`)
        .then(response => {
          this.songs = response.data;
          this.e1 = 3;

          this.calculatePlus();
        });
    },
    playAlbum() {
      axios
        .get(`http://192.168.1.20:5000/play-album/${this.artist}/${this.album}`)
        .then(() => {
          console.log("Playing Album");
        });
    },
    removeFromPlaylist(i) {
      const playlistPosition = this.indexInArray(
        this.$store.state.playlist,
        this.songs[i]
      );
      const song = this.$store.state.playlist[playlistPosition];
      this.$store.commit("removeSingleFromPlaylist", playlistPosition);
      this.plus[i] = true;
      this.$forceUpdate();
      console.log(song);
      axios
        .get(
          `http://192.168.1.20:5000/remove-from-playlist/${song[0]}/${song[1]}/${song[3]}`
        )
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>
