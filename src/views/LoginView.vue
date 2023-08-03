<template>
    <v-card class="mx-auto my-10 px-4" elevation="0" max-width="344" title="Sign In">

        <v-card-text>
            <v-form @submit.prevent="signIn">

                <v-row>
                    <v-col cols="12">
                        <v-text-field color="primary" type="text" label="Username" variant="outlined" v-model="formData.username"/>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field color="primary" type="password" label="Password" variant="outlined" v-model="formData.password"/>
                    </v-col>

                    <v-col cols="12">
                        <v-btn type="submit" class="mb-2" color="success">Sign In</v-btn>
                    </v-col>
                </v-row>

            </v-form>
        </v-card-text>

    </v-card>
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex'

    const formData = ref({
        username: '',
        password: ''
    })

    const router = useRouter()
    const store = useStore()

    const signIn = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData.value)
            console.log(response.data.token);
            const token = response.data.token;
            const userId = response.data.id;
            localStorage.setItem('auth-token', token)
            localStorage.setItem('userId', userId);
            store.commit('setIsloggedIn')
            router.push('/dashboard')
        } catch (error) {
            console.log(error);
        }
    }
</script>

<style></style>