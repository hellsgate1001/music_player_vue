<template>
  <v-app>
    <v-card>
      <v-card-title>
        The Wilson Jukebox
      </v-card-title>
    </v-card>

    <v-container fluid=true fill-height>
      <v-row>
        <v-col cols="12" md="4" id="artists" style="overflow:auto">
          <v-list>
            <v-subheader>
              Artists
            </v-subheader>
            <v-list-item-group id="artist-group">
              <v-list-item v-for="artist in artists" :key="artist" v-on:click="getAlbums(artist)">
                {{ artist }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col cols="12" md="4" id="albums">
          <v-list>
            <v-subheader>
              Albums
            </v-subheader>
            <v-list-item-group>
              <v-list-item v-for="album in albums" :key="album" v-on:click="getSongs(album)">
                {{ album }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col cols="12" md="4" id="songs">
          <v-list>
            <v-subheader>
              Songs
            </v-subheader>
            <v-list-item-group>
              <v-list-item v-for="song in songs" :key="song[0]">
                {{ song[0] }}: {{ song[1] }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
/* eslint no-console: 0 */
import axios from 'axios';

export default {
  name: 'App',

  data: () => {
    return {
      artists: [],
      artist: '',
      albums: [],
      songs: []
    }
  },
  created() {
    axios.get('http://192.168.1.20:5000/artists')
      .then((response) => {
        console.log('Setting albums');
        this.artists = response.data;
      });
  },
  methods: {
    getAlbums(artist) {
      this.artist = artist;
      axios.get('http://192.168.1.20:5000/artist/' + artist)
        .then((response) => {
        console.log('ARTISTS 1');
        console.log(this.artists);
          this.albums = response.data;
        });
    },
    albumsCall() {
    },
    getSongs(album) {
      axios.get('http://192.168.1.20:5000/artist/' + this.artist + '/' + album)
        .then((response) => {
          this.songs = response.data;
        });
    }
  }
};
</script>
