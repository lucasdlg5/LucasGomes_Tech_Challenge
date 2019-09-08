<template>
    <div>
        <div>
            <span>Pagina: Home</span>
        </div>
        <div>
            <div>
                <md-button class="md-raised md-primary" v-on:click="getScore()">getScore</md-button>
            </div>
            <div>
                <md-button class="md-raised md-green" v-on:click="postScore()">postScore</md-button>
            </div>
            <div>
                <md-button class="md-raised md-red" v-on:click="deleteScore(idToDelete)">deleteScore</md-button>
            </div>
            <div>
                <md-button class="md-raised md-primary" v-on:click="updateScore(idToUpdate)">updateScore</md-button>
            </div>
            <div>
                <md-button class="md-raised md-lightgreen" v-on:click="getOneScore(idToSearch)">getOneScore</md-button>
            </div>
        </div>
        <div>
            <md-button class="md-raised md-primary" v-on:click="goToLogin()">Go to Login</md-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'



export default {
    name: 'home',
    data() {
        return {

        }
    },
    mounted(){

    },
    methods:{

        goToLogin(){
            this.$router.push({ path: '/'})
        },

        getScore(){

            console.info('\n\n getScore \n\n');
            
            axios.get(`score/`).then(res => {
                console.log(res);
            })
            .catch(error => console.error(error));
        },

        postScore(){

            console.info('\n\n postScore \n\n');

            var params = {
                "nome":"Lucas Domingos",
                "email":"lucasdomingos@hotmail.com",
                "baseRenda":"2000"
            }

            axios.post(`score/`, params).then(res => {
                console.log(res);
            })
            .catch(error => console.error(error));
        },

        deleteScore(idToDelete){
            console.info('\n\n deleteScore \n\n');
            axios.delete(`score/${idToDelete}`).then(res => {
                console.log(res);
            })
            .catch(error => console.error(error));
        },

        updateScore(idToUpdate){
            console.info('\n\n updateScore \n\n');
            axios.put(`score/${idToUpdate}`).then(res => {
                console.log(res);
            })
            .catch(error => console.error(error));
        },

        getOneScore(idToSearch){
            console.info('\n\n getOneScore \n\n');
            axios.put(`score/${idToSearch}`).then(res => {
                console.log(res);
            })
            .catch(error => console.error(error));
        },


    }
}
</script>

<style>

</style>