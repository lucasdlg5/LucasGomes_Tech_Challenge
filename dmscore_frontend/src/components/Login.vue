<template>
    <div>
        <div>
            <span>Pagina: Login</span>
        </div>
        <div>
        
        </div>
        <div>
            <md-button class="md-raised md-primary" v-on:click="goToHome()">Go to Home</md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    methods: {
        goToHome(){
            this.$router.push({ path: 'home'})
        }
    }
}
</script>

<style>

</style>