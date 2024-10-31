<template>
    <div class="mb-5 sticky-top">
        <!-- Topbar Start -->
        <div class="container-fluid bg-dark px-5 d-none d-lg-block">
            <div class="row gx-0">
                <div class="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
                    <div class="d-inline-flex align-items-center" style="height: 45px;">
                        <!-- Add any content if needed -->
                    </div>
                </div>
                <div class="col-lg-4 text-center text-lg-end">
                    <div class="d-inline-flex align-items-center" style="height: 45px;">
                        <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="#"><i class="fab fa-twitter fw-normal"></i></a>
                        <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="#"><i class="fab fa-facebook-f fw-normal"></i></a>
                        <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="#"><i class="fab fa-linkedin-in fw-normal"></i></a>
                        <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href="#"><i class="fab fa-instagram fw-normal"></i></a>
                        <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle" href="#"><i class="fab fa-youtube fw-normal"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Topbar End -->
    
        <!-- Navbar & Hero Start -->
        <div class="container-fluid position-relative p-0">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                <a href="" class="navbar-brand p-0">
                    <h1 class="text-primary m-0"><i class="fa fa-map-marker-alt me-3"></i>NITP</h1>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <a href="#" class="nav-item nav-link active">Home</a>

                        <router-link to="/register" class="nav-item nav-link active">
                            Home
                        </router-link>
                        <a href="#" class="nav-item nav-link">About</a>
                        <a href="#" class="nav-item nav-link">Heritage Sites</a>
                        <a href="#" class="nav-item nav-link">Contact</a>
                    </div>
                    <!-- Conditionally render Login/Register if user is not logged in -->
                    <div v-if="!isLoggedIn">
                        <a href="#" class="btn btn-primary rounded-pill py-2 px-4 me-2">Register</a>
                        <a href="#" class="btn btn-secondary rounded-pill py-2 px-4">Login</a>
                    </div>
                    <div v-else>
                        <a @click="logout" class="btn btn-danger rounded-pill py-2 px-4">Logout</a>
                    </div>
                </div>
            </nav>
        </div>
        <!-- Navbar & Hero End -->
    </div>
    </template>
    
    <script>
    export default {
        name: 'HeaderTable',
        computed: {
            // Check if user is logged in based on the presence of a user token or info in localStorage
            isLoggedIn() {
                return !!localStorage.getItem('authUser');
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('authUser'); // Remove user token or info on logout
                this.$router.push({ name: 'loginPage' });
            }
        }
    };
    </script>
    
    <style>
    /* Additional styling if needed */
    </style>
    