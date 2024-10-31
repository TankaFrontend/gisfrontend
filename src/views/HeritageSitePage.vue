<template>
    <div>
        
        <div class="container-xxl py-5">
            <div class="container">
                <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 class="section-title bg-white text-center text-primary px-3">Our Heritage Sites Below</h6>
                </div>

                <div class="row g-4 justify-content-center">
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" v-for="(site, index) in heritageSites" :key="index">
                        <div class="package-item">
                            <div class="overflow-hidden">
                                <img 
                                    @click="openMap([site.latitude, site.longitude])" 
                                    style="object-fit: cover; height: 250px; width: 100%; cursor: pointer;" 
                                    :src="site.image" 
                                    alt="">
                            </div>
                            <div class="d-flex border-bottom">
                                <small class="flex-fill text-center border-end py-2">
                                    <i class="fa fa-map-marker-alt text-primary me-2"></i>{{ site.name }}
                                </small>
                            </div>
                            <div class="text-center p-4">
                                <div class="mb-3">
                                    <small class="fa fa-star text-primary"></small>
                                    <small class="fa fa-star text-primary"></small>
                                    <small class="fa fa-star text-primary"></small>
                                    <small class="fa fa-star text-primary"></small>
                                    <small class="fa fa-star text-primary"></small>
                                </div>
                                <!-- <p>{{ site.detail }}</p> -->
                                <div class="d-flex justify-content-center mb-2">
                                    <a class="btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px;" @click="readMore">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            heritageSites: [], // Initialize empty, populate from API
        };
    },

    mounted() {
        // Redirect to login if not authenticated
        let userLogin = localStorage.getItem('authUser');
        if (!userLogin) {
            this.$router.push({ name: 'loginPage' });
        }

        // Fetch heritage sites from the external API
        this.fetchHeritageSites();
    },

    methods: {
        async fetchHeritageSites() {
            try {
                const response = await axios.get('https://projectbackend-7waf.onrender.com/api/heritageSite/getHeritageSites');
                this.heritageSites = response.data.map(site => ({
                    name: site.name,
                    image: site.image,
                    detail: site.detail,
                    latitude: parseFloat(site.latitude), // Convert to float
                    longitude: parseFloat(site.longitude), // Convert to float
                }));
            } catch (error) {
                console.error('Error fetching heritage sites:', error);
            }
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

        readMore(){
            this.$router.push({ name: 'heritageDetailPage' });
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
    },
};
</script>

<style scoped>
.modal {
    display: none;
}
.modal.show {
    display: block;
}
</style>



