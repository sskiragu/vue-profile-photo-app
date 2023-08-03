<template>
  <v-container class="profile">
    <v-card>
      <v-row align="center">
        <v-col cols="12" sm="6" md="4">
          <v-file-input
            v-model="file"
            label="Upload Profile Picture"
            accept="image/*"
            @change="uploadFile"
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="6" md="8" class="text-center">
          <img class="profile-picture" :src="formattedImageUrl" alt="Profile Picture" />
          <h1>{{ fullName }}</h1>
          <p>{{ jobTitle }}</p>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-card-title>About Me</v-card-title>
      <v-card-text>
        <p>{{ aboutMe }}</p>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Work Experience</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="experience in workExperience" :key="experience.id">
              <v-list-item-content>
                <v-list-item-title>{{ experience.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ experience.company }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ experience.duration }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ experience.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="profile-footer">
      <v-btn @click="updateProfile" :disabled="uploading || !file">Save Changes</v-btn>
      <div v-if="uploading">Uploading...</div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const file = ref(null);
const imageUrl = ref(null);
const uploading = ref(false);
const store = useStore();

const fileName = computed(() => file.value?.name);
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
const fileMimeType = computed(() => file.value?.type);

const uploadFile = (event) => {
  file.value = event.target.files[0];
};

const formattedImageUrl = computed(() => {
  return imageUrl.value ? imageUrl.value.replace(/\\/g, '') : null;
});

// Fetch the user's profile data when the component is mounted
onMounted(async () => {
  try {
    const accessToken = localStorage.getItem('auth-token');
    const endpoint = `http://127.0.0.1:8000/api/profile/${store.state.userId}`;
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Assign fetched data to respective data properties
    imageUrl.value = response.data.profile;
  } catch (error) {
    console.error(error);
  }
});

const updateProfile = async () => {
  if (!file.value) {
    return;
  }

  uploading.value = true;

  const formData = new FormData();
  formData.append('file', file.value);
  formData.append('fileName', fileName.value);
  formData.append('fileExtension', fileExtension.value);
  formData.append('fileMimeType', fileMimeType.value);
  formData.append('_method', 'PATCH');

  try {
    const accessToken = localStorage.getItem('auth-token');
    const endpoint = `http://127.0.0.1:8000/api/profile/${store.state.userId}`;
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    imageUrl.value = response.data.image_url;
    
  } catch (error) {
    console.error(error);
  } finally {
    uploading.value = false;
  }
};
</script>

<style>
.profile {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.profile-footer {
  margin-top: 20px;
  text-align: center;
}
</style>
