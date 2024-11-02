<template>


    <!-- Contact Start -->
    <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 class="section-title bg-white text-center text-primary px-3">Login</h6>
                </div>
            <div class="row g-4">
               
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">

                </div>
                <div class="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                    <form id="loginForm" @submit.prevent="login">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="email"  v-model="email" class="form-control" id="email" placeholder="Your Email" required>
                                    <label for="email">Email</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <input type="password" v-model="password" class="form-control" id="password" placeholder="Password" required>
                                    <label for="password">Password</label>
                                </div>
                            </div>
                       

                            <button type="submit" class="btn btn-primary w-100 py-3 rounded-3 rounded-pill" :disabled="loading">
                                <span v-if="loading">           
                                    <div class="loader"></div>
                                </span>
                                <span v-else>Proceed</span>
                            </button>

                            <div class="col-12 text-center" id="loginMessage"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact End -->



</template>


<script>


export default {
    name:'loginPage',

    

    data:() => {
        return {
            email:'',
            password:'',
            error:null,
            loading: false,
        };
    },


    methods: {
        login() {
            this.loading = true;
            fetch("https://projectbackend-7waf.onrender.com/api/users/login", {

                method: "POST",
                headers: {
                "Accept":"application/json",
                "Content-Type": "application/json",
                },

                body:JSON.stringify({
                    email:this.email,
                    password:this.password
                })
            })
            .then(res => res.json())
            .then((res) => {

                if (!res.accessToken) {
                    this.error = res.message
                    this.loading = false;
                }else{
                    localStorage.setItem('authUser', res.accessToken);
                    localStorage.setItem('user', JSON.stringify(res.user));
                    this.loading = false;
                    // this.$router.push({name:'heritagePage'})
                    window.location.href = '/heritageSite'; 

                }

                

                
            })

        }
        
    },


    mounted() {
        let user = localStorage.getItem('user-info');
        // console.log(user);
        if (user) {
            this.$router.push({name:'homepage'})
        }
    },
}


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
    @keyframes l3 {to{transform: rotate(1turn)}}


</style>