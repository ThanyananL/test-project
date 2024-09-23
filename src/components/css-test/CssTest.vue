<template>
    <div class="image-container">
        <div class="image-wrapper" v-for="image in images" :key="image.id">
            <img :src="image.download_url" :alt="image.author" />
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            images: []
        };
    },
    mounted() {
        this.fetchImages();
    },
    methods: {
        async fetchImages() {
            try {
                const response = await axios.get("https://picsum.photos/v2/list?page=1&limit=30");
                this.images = response.data;
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        }
    }
};
</script>

<style scoped>
.image-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
    padding: 4% 0;
}

.image-wrapper {
    height: 150px;
    flex: none;
    display: block;
}

.image-wrapper img {
    height: 100%;
    width: auto;
    object-fit: cover;
}
</style>