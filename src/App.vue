<template>
  <v-container>
    <v-toolbar color="primary" v-if="!store.state.isLoggedIn">
    <v-btn to="/">Home</v-btn>
    <v-btn to="/about">About</v-btn>
    <v-btn to="/login">Login</v-btn>
  </v-toolbar>
  {{ store.state.isLoggedIn }}
  <router-view></router-view>

</v-container>

</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore()

store.commit('setIsloggedIn')
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 14px 28px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
