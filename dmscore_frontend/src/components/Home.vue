<template>
<!-- INICIO - BOTOES PARA NAVEGACAO TEMPORARIA -->
<!-- FIM - BOTOES PARA NAVEGACAO TEMPORARIA -->
    <div>

<!-- INICIO TOOLBAR PESQUISA -->
        <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
            <md-button class="md-icon-button">
                <md-icon>menu</md-icon>
            </md-button>
            </div>

            <md-autocomplete
            class="search"
            v-model="selectedScore"
            :md-options="scoresSearch"
            md-layout="box">
            <label>Buscar...</label>
            </md-autocomplete>

            <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" v-on:click="getScore()">
                <md-icon>refresh</md-icon>
            </md-button>

            <md-button class="md-icon-button">
                <md-icon>more_vert</md-icon>
            </md-button>
            </div>
        </div>
        </md-toolbar>

<!-- FIM TOOLBAR PESQUISA -->


<!-- INICIO - MODAL CADASTRO -->

        <div>
            <form novalidate class="md-layout" @submit.prevent="validateUser">
                <md-card class="md-layout-item md-size-50 md-small-size-100">
                    <md-card-header>
                    <div class="md-title">Solicitar Crédito</div>
                    </md-card-header>

                    <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('firstName')">
                            <label for="first-name">Primeiro Nome</label>
                            <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                            <span class="md-error" v-if="!$v.form.firstName.required">É necessário digitar seu primeiro nome</span>
                            <span class="md-error" v-else-if="!$v.form.firstName.minlength">Informação Inválida</span>
                        </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('lastName')">
                            <label for="last-name">Sobrenome</label>
                            <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                            <span class="md-error" v-if="!$v.form.lastName.required">É necessário digitar seu sobrenome</span>
                            <span class="md-error" v-else-if="!$v.form.lastName.minlength">Informação Inválida</span>
                        </md-field>
                        </div>
                    </div>

                    <!-- <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('gender')">
                            <label for="gender">Gênero</label>
                            <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                            <md-option></md-option>
                            <md-option value="M">Masculino</md-option>
                            <md-option value="F">Feminino</md-option>
                            <md-option value="F">Não Identificar</md-option>
                            </md-select>
                            <span class="md-error">É necessário escolher um gênero</span>
                        </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('age')">
                            <label for="age">Idade</label>
                            <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="sending" />
                            <span class="md-error" v-if="!$v.form.age.required">É necessário preencher a idade</span>
                            <span class="md-error" v-else-if="!$v.form.age.maxlength">Idade Inválida!</span>
                        </md-field>
                        </div>
                    </div> -->

                        <md-field :class="getValidationClass('renda')">
                            <label>Renda </label>
                            <span class="md-prefix">R$</span>
                            <md-input v-model="form.renda" :disabled="sending" type="number"></md-input>
                            <span class="md-error" v-if="!$v.form.renda.required">É necessário preencher a renda</span>
                            <span class="md-error" v-else-if="!$v.form.renda.minlength">Renda Inválida!</span>
                        </md-field>

                    <md-field :class="getValidationClass('email')">
                        <label for="email">Email</label>
                        <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.email.required">É necessário preencher com seu Email!</span>
                        <span class="md-error" v-else-if="!$v.form.email.email">Email inválido!</span>
                    </md-field>
                    </md-card-content>

                    <md-progress-bar md-mode="indeterminate" v-if="sending" />

                    <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Enviar solicitação</md-button>
                    </md-card-actions>
                </md-card>

                <md-snackbar :md-active.sync="userSaved">Obrigado por solicitar seu crédito! Veja a seguir na lista sua pontuação</md-snackbar>
            </form>
        </div>

<!-- FIM - MODAL CADASTRO -->



<!-- INICIO - CARDS PESQUISA -->



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

<!-- FIM - CARDS PESQUISA -->

<!-- INICIO - BOTOES PARA NAVEGACAO TEMPORARIA -->

        <div>
            <md-button class="md-raised md-primary" v-on:click="goToLogin()">Go to Login</md-button>
        </div>
<!-- FIM - BOTOES PARA NAVEGACAO TEMPORARIA -->
        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{msg}}</span>
        </md-snackbar>
    </div>
</template>

<script>
import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'


export default {
    name: 'home',
    mixins: [validationMixin],
    data() {
        return{

            scores: {}, //Recebe a lista de scores GET

            //snackbar
            showSnackbar: false,
            position: 'center',
            duration: 4000,
            isInfinity: false,

            msg: "",

            //Barra de pesquisa
            selectedScore: null,
            scoresSearch: [],

            //Formulario de cadastro
            form: {
                firstName: null,
                lastName: null,
                // gender: null,
                // age: null,
                email: null,
                renda: null,
            },
            userSaved: false,
            sending: false,
            lastUser: null,
        }
    },
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        // age: {
        //   required,
        //   maxLength: maxLength(3)
        // },
        // gender: {
        //   required
        // },
        email: {
          required,
          email
        },
        renda: {
            required,
            minLength: minLength(1)
        }
      }
    },
    mounted(){
        this.getScore();
        
    },
    methods:{

        // INICIO Manipulação front-end

        goToLogin(){
            this.$router.push({ path: '/'})
        },

        snackbarShow(msg){
            this.showSnackbar = true
            this.msg = msg;
        },

        // FIM Manipulação front-end

        // INICIO funcoes API SCORE

        getScore(){
            //Zerar a lista de pesquisa
            this.scoresSearch = [];

            console.info('\n\n getScore \n\n');
            this.snackbarShow("Buscando Score")
            axios.get(`score/`).then(res => {
                console.log(res.data);
                this.scores = res.data;

                //Popular a lista de pesquisa
                for (let index = 0; index < res.data.length; index++) {
                    this.scoresSearch.push(res.data[index].nome);
                }
            })
            .catch(error => console.error(error));
        },

        postScore(params){
            console.info('\n\n postScore \n\n');

            // var params = {
            //     "nome":"Lucas Domingos",
            //     "email":"lucasdomingos@hotmail.com",
            //     "baseRenda":"2000"
            // }

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
                // this.snackbarShow(res.data);
                this.snackbarShow("Mensagem: Solicitação removida com sucesso!");
                this.getScore();
            })
            .catch(error => console.error(error));
        },

        updateScore(idToUpdate){
            console.info('\n\n updateScore \n\n');
            axios.put(`score/${idToUpdate}`).then(res => {
                console.log(res.data);
                this.getScore();
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

        // FIM funcoes API SCORE

        // INICIO Funcoes Formulario de cadastro

        getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        // this.form.age = null
        // this.form.gender = null
        this.form.renda = null
        this.form.email = null
      },

      saveUser () {
        this.sending = true
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
        let params = {
              "nome": this.lastUser,
                "email": this.form.email,
                "baseRenda": parseFloat(this.form.renda)
          }
        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {

          this.userSaved = true
          this.sending = false
          this.clearForm()

        debugger;
          this.postScore(params);
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    
    // FIM Funcoes Formulario de cadastro

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

  .search {
    max-width: 500px;
  }

.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>