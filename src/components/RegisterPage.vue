<template>
    <!-- Register Start -->
    <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 class="section-title bg-white text-center text-primary px-3">Register</h6>
            </div>
            <div class="row g-4">
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s"></div>
                <div class="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                    <form @submit.prevent="registerUser">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-floating">
                                    <input v-model="formData.name" type="text" class="form-control" id="name" placeholder="Your Full Name">
                                    <label for="name">Full Name</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input v-model="formData.email" type="email" class="form-control" id="email" placeholder="Your Email">
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Password">
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary w-100 py-3 rounded-pill" :disabled="loading">
                                    <span v-if="loading">
                                        <div class="loader"></div>
                                    </span>
                                    <span v-else>Proceed</span>
                                </button>
                            </div>
                            <div class="col-12 text-center" id="loginMessage">
                                <p v-if="message">{{ message }}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Register End -->
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: ''
            },
            loading: false,
            message: ''
        };
    },
    methods: {
        async registerUser() {
            this.loading = true;
            try {
                await axios.post('https://projectbackend-7waf.onrender.com/api/users/register', this.formData);
                
                this.message = "Registration successful!";
                this.$router.push({ name: 'loginPage' });

                this.formData = {
                    name: '',
                    email: '',
                    password: ''
                };
            } catch (error) {
                this.loading = false;
                this.message = error.response?.data?.message || 'Registration failed. Please try again.';
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
    .loader {
        width: 35px;
        margin-left: 50%;
        padding: 8px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: #ffffff;
        --_m: 
            conic-gradient(#f4080800 30%,#ff9595),
            linear-gradient(#000 0 0) content-box;
        -webkit-mask: var(--_m);
                mask: var(--_m);
        -webkit-mask-composite: source-out;
                mask-composite: subtract;
        animation: l3 1s infinite linear;
    }
    @keyframes l3 { to { transform: rotate(1turn); } }
</style>
