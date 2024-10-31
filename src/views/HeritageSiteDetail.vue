<template>
    <div class="container my-5">
        <div class="card shadow-lg">
            <img @click="openMap([heritageSite.latitude, heritageSite.longitude])" :src="heritageSite.image" alt="Site Image" class="card-img-top heritage-img">
            
            <div class="card-body">
                <h2 class="card-title text-center text-primary mb-4">{{ heritageSite.name }}</h2>

                <div class="heritage-details">
                    <h5 class="text-secondary mb-3">Details</h5>
                    <p class="text-muted">{{ heritageSite.detail }}</p>
                </div>

                <div class="heritage-location mt-4">
                    <h5 class="text-secondary mb-3">Location</h5>
                    <p><i class="fa fa-map-marker-alt me-2 text-primary"></i> Latitude: {{ heritageSite.latitude }}, Longitude: {{ heritageSite.longitude }}</p>
                </div>
            </div>

            <div class="card-footer text-center">
                <button class="btn btn-primary" @click="goBack">Back to Sites</button>
            </div>
        </div>



        <div v-if="showModal" class="modal fade show" style="display: block;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Map Location</h5>
                        <button type="button" class="close" @click="closeMap">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="map" style="height: 400px;"></div>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';

export default {
    data() {
        return {
            showModal: false,
            map: null,
            heritageSite: {}
        };
    },
    async created() {
        const siteId = this.$route.params.id;
        await this.fetchHeritageDetail(siteId);
    },
    methods: {
        async fetchHeritageDetail(id) {
            try {
                const response = await axios.get(`https://projectbackend-7waf.onrender.com/api/heritageSite/getHeritageSite/${id}`);
                this.heritageSite = response.data;
            } catch (error) {
                console.error("Error fetching site detail:", error);
            }
        },
        goBack() {
            this.$router.push({ name: 'heritageSites' });
        },


        openMap(location) {
            this.showModal = true;
            this.$nextTick(() => {
                this.initMap(location);
            });
        },

        closeMap() {
            this.showModal = false;
            if (this.map) {
                this.map.remove();
                this.map = null;
            }
        },

        initMap(location) {
            if (this.map) {
                this.map.remove(); // Remove existing map instance
            }
            this.map = L.map('map').setView(location, 13); // Set the view to the clicked location

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(this.map);

            L.marker(location).addTo(this.map); // Add a marker to the map
        },
    }
};
</script>

<style scoped>
.container {
    max-width: 800px;
}

.card {
    border-radius: 15px;
    overflow: hidden;
}

.heritage-img {
    height: 400px;
    object-fit: cover;
}

.card-body {
    padding: 2rem;
}

.heritage-details, .heritage-location {
    border-top: 1px solid #eaeaea;
    padding-top: 1rem;
}

.card-footer {
    background-color: #f8f9fa;
    padding: 1.5rem;
}
</style>
