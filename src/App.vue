<template>
<HeaderPage />
  <router-view></router-view>
<FooterPage />
 
</template>



<script>
import HeaderPage from "./components/HeaderPage.vue"
import FooterPage from "./components/FooterPage.vue"


export default {
  name: 'App',

  components: {
    HeaderPage,
    FooterPage
  }

}
</script>

<style>


@import "./assets/css/bootstrap.min.css";
@import "./assets/css/style.css";

</style>
