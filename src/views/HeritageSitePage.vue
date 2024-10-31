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
                                <div class="d-flex justify-content-center mb-2">
                                    <a class="btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px;" @click="readMore(site.id)">Read More</a>
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
            heritageSites: [],
            userPayment: null,
        };
    },

    mounted() {
        // Redirect to login if not authenticated
        let userLogin = localStorage.getItem('authUser');
        // let user = localStorage.getItem('user');
        if (!userLogin) {
            this.$router.push({ name: 'loginPage' });
        } 
        // else {
        //     const userDetail = JSON.parse(atob(user.split('.')[1]));
            let userDetail = JSON.parse(localStorage.getItem('user'));

            // this.userPayment = user.user.payment; 

            console.log(userDetail.payment);
        // }

        
        this.fetchHeritageSites();
    },

    methods: {
        async fetchHeritageSites() {
            try {
                const response = await axios.get('https://projectbackend-7waf.onrender.com/api/heritageSite/getHeritageSites');
                this.heritageSites = response.data.map(site => ({
                    id: site._id,
                    name: site.name,
                    image: site.image,
                    detail: site.detail,
                    latitude: parseFloat(site.latitude),
                    longitude: parseFloat(site.longitude),
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

        async readMore(siteId) {
            
            // if (this.userPayment <= 0) {
            //     alert("You need to complete your payment to access this feature.");
            //     return;
            // }

            this.$router.push({ name: 'heritageDetailPage', params: { id: siteId } });
        },

        initMap(location) {
            if (this.map) {
                this.map.remove();
            }
            this.map = L.map('map').setView(location, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(this.map);

            L.marker(location).addTo(this.map);
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
