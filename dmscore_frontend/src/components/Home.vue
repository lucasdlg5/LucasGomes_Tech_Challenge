<template>
    <div>
        <div>
            <span>Pagina: Home</span>
        </div>
        <div>
            <div>
                <md-list class="md-triple-line">
                    <md-list-item v-for="item in scores">

                        <md-avatar>
                            <img src="https://placeimg.com/40/40/people/1" alt="People">
                        </md-avatar>

                        <div class="md-list-item-text">
                            <span>ID: {{item._id}}</span>
                            <span>Nome: {{item.nome}}</span>
                            <span>Email: {{item.email}}</span>
                            <span>Renda Base: R$ {{item.baseRenda}}</span>
                            <span>Credito Aprovado: R$ {{item.approvedCreditValue}}</span>
                            <span>Score: {{item.creditScore}}</span>
                            <span>Status Aprovação: {{item.statusScore}}</span>
                        </div>

                        <md-button class="md-icon-button md-list-action" v-on:click="deleteScore(item._id)">
                            <md-icon class="md-primary" >delete</md-icon>
                        </md-button>

                    </md-list-item>
                    <md-divider class="md-inset"></md-divider>



                </md-list>
            </div>
            <div>
                <md-button class="md-raised md-green" v-on:click="postScore()">postScore</md-button>
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
        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{msg}}</span>
        </md-snackbar>
    </div>
</template>

<script>
import axios from 'axios'



export default {
    name: 'home',
    data() {
        return{

            scores: {}, //Recebe a lista de scores GET

            //snackbar
            showSnackbar: false,
            position: 'center',
            duration: 4000,
            isInfinity: false,

            msg: ""
        }
    },
    mounted(){
        this.getScore();
    },
    methods:{

        goToLogin(){
            this.$router.push({ path: '/'})
        },

        snackbarShow(msg){
            this.showSnackbar = true
            this.msg = "Mensagem: Solicitação removida com sucesso!";
            this.getScore();
        },

        getScore(){

            console.info('\n\n getScore \n\n');
            
            axios.get(`score/`).then(res => {
                console.log(res.data);
                this.scores = res.data;
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
                console.log(res.data);
                this.getScore();
            })
            .catch(error => console.error(error));
        },

        deleteScore(idToDelete){
            console.info('\n\n deleteScore \n\n');
            axios.delete(`score/${idToDelete}`).then(res => {
                console.log(res.data);
                this.snackbarShow(res.data);
            })
            .catch(error => console.error(error));
        },

        updateScore(idToUpdate){
            console.info('\n\n updateScore \n\n');
            axios.put(`score/${idToUpdate}`).then(res => {
                console.log(res.data);
            })
            .catch(error => console.error(error));
        },

        getOneScore(idToSearch){
            console.info('\n\n getOneScore \n\n');
            axios.put(`score/${idToSearch}`).then(res => {
                console.log(res.data);
            })
            .catch(error => console.error(error));
        },


    }
}
</script>

<style lang="scss" scoped>
  .md-list {
    width: auto;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>