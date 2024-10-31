<!-- <template>
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
                                <p>{{ site.detail }}</p>
                                <div class="d-flex justify-content-center mb-2">
                                    <a class="btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px;">Read More</a>
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
</style> -->
<template>
    <div>
        <!-- Package Start -->
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
                                    @click="handlePaymentCheck(site)" 
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
                                <!-- Show details only if the user has paid -->
                                <p v-if="hasPaid">{{ site.detail }}</p>
                                <div class="d-flex justify-content-center mb-2">
                                    <a @click="handlePaymentCheck(site)" class="btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px;">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Package End -->

        <!-- Modal -->
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
import PaystackPop from '@paystack/inline-js';

export default {
    data() {
        return {
            showModal: false,
            map: null,
            heritageSites: [],
            hasPaid: localStorage.getItem('hasPaid') === 'true', // Check payment status on load
        };
    },

    mounted() {
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
                    latitude: parseFloat(site.latitude),
                    longitude: parseFloat(site.longitude),
                    price: site.price || 1000,
                }));
            } catch (error) {
                console.error('Error fetching heritage sites:', error);
            }
        },

        handlePaymentCheck(site) {
            // Check if user has paid and site data exists in localStorage
            if (!this.hasPaid) {
                this.makePayment(site);
            } else {
                this.showSiteDetails(site);
            }
        },

        makePayment(site) {
            // Initialize Paystack payment
            let handler = PaystackPop.setup({
                key: 'pk_test_05c9f7e75b78f0a875f130efe6e3044cb51aea58',
                email: 'user@example.com', 
                amount: site.price * 100,
                currency: 'NGN',
                callback: (response) => {
                    if (response.status === 'success') {
                        localStorage.setItem('hasPaid', 'true');
                        this.hasPaid = true;

                        // Store site information in localStorage
                        localStorage.setItem('selectedSite', JSON.stringify({
                            name: site.name,
                            image: site.image,
                            detail: site.detail,
                            latitude: site.latitude,
                            longitude: site.longitude,
                        }));
                        this.showSiteDetails(site);
                    } else {
                        alert('Payment failed. Please try again.');
                    }
                },
                onClose: () => {
                    alert('Payment was not completed.');
                },
            });
            handler.openIframe();
        },

        showSiteDetails(site) {
            // Retrieve the site data from localStorage if needed
            const storedSite = JSON.parse(localStorage.getItem('selectedSite'));

            if (storedSite) {
                this.openMap([storedSite.latitude, storedSite.longitude]);
            } else {
                this.openMap([site.latitude, site.longitude]);
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

