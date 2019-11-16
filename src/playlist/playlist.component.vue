<template>
    <v-list>
        <v-subheader>
            <span class="title">Playlist</span>
        </v-subheader>
        <v-list-item-group>
            <v-list-item v-for="(track, i) in playlist" :key="i">
                <v-hover>
                    <v-icon slot-scope="{ hover }" :class="`${ hover ? 'green--text': '' }`">
                        mdi-play
                    </v-icon>
                </v-hover>
                {{ track[0] }} - {{ track[2] }}
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
/* eslint no-console: 0 */
import axios from 'axios';

export default {
    name: 'Playlist',

    data: () => {
        return {
            playlist: []
        }
    },

    created() {
        axios.get('http://192.168.1.20:5000/get-playlist').then((response) => {
            this.playlist = response.data;
        });
    }
}
</script>
