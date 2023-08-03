<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="Application bar"></v-app-bar>

        <v-navigation-drawer permanent>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/10.jpg" title="John Man"></v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item style="text-align: left;" prepend-icon="mdi-home" title="Dashboard" value="dashboard" to="/dashboard/home"></v-list-item>
                <v-list-item style="text-align: left;" prepend-icon="mdi-account-check" title="Profile" value="profile" to="/dashboard/profile"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <router-view></router-view>
        </v-main>
    </v-layout>
</template>

<script setup>
// import ProfileView from './ProfileView.vue';
//     const profile = () => {
//         console.log("Profile");
//     }
</script>


<style></style>