<template>
    <div class="mb-5 sticky-top">
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
                        <router-link to="/" class="nav-item nav-link active">Home</router-link>
                    </div>
                    <div v-if="!isLoggedIn">
                        <router-link to="register" class="btn btn-secondary rounded-pill py-2 px-4 me-2">Register</router-link>
                        <router-link to="login" class="btn btn-secondary rounded-pill py-2 px-4">Login</router-link>
                    </div>
                    <div v-else>
                        <a @click="logout" class="btn btn-danger rounded-pill py-2 px-4">Logout</a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderPage',
    data() {
        return {
            isLoggedIn: !!localStorage.getItem('authUser')
        };
    },
    mounted() {
        window.addEventListener('storage', this.syncLoginState);
    },
    beforeUnmount() {
        window.removeEventListener('storage', this.syncLoginState);
    },

    methods: {
        logout() {
            localStorage.removeItem('authUser');
            this.isLoggedIn = false;
            window.location.href = '/'; 
        },
        syncLoginState() {
            this.isLoggedIn = !!localStorage.getItem('authUser');
        }
    }

};
</script>
