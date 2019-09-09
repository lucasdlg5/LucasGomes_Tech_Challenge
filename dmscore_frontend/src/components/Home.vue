<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Alterar Informações de pedido</md-dialog-title>
            <md-card-content>
                <md-field>
                    <label>ID</label>
                    <md-input v-model="this.itemEdit._id" disabled />
                </md-field>
                <md-field>
                    <label>Nome Completo</label>
                    <md-input v-model="this.itemEdit.nome" />
                </md-field>
                <md-field>
                    <label>Email</label>
                    <md-input type="email" name="email" id="email" autocomplete="email" v-model="this.itemEdit.email" />
                </md-field>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label>Renda</label>
                            <span class="md-prefix">R$</span>
                            <md-input v-model="this.itemEdit.baseRenda" type="number"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label>Valor Aprovado</label>
                            <span class="md-prefix">R$</span>
                            <md-input v-model="this.itemEdit.approvedCreditValue" type="number" disabled></md-input>
                        </md-field>
                    </div>
                </div>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field>
                            <label>Score</label>
                            <span class="md-prefix"></span>
                            <md-input v-model="this.itemEdit.creditScore" type="text" disabled></md-input>
                        </md-field>
                    </div>
                </div>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="showDialog = false">Cancelar</md-button>
                    <md-button class="md-primary" v-on:click="updateScore()">Salvar</md-button>
                </md-dialog-actions>
            </md-card-content>
        </md-dialog>

        <!-- INICIO TOOLBAR PESQUISA -->
        <md-toolbar class="md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <md-button class="md-icon-button" v-on:click="goToLogin()">
                        <md-icon>keyboard_arrow_left</md-icon>
                    </md-button>
                </div>
                <span>Painel de Scores</span>
                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button" v-on:click="getScore()">
                        <md-icon>refresh</md-icon>
                    </md-button>
                </div>
            </div>
        </md-toolbar>
        <!-- FIM TOOLBAR PESQUISA -->
        <!-- INICIO - MODAL CADASTRO -->
        <div v-if="showRegister">
            <form novalidate class="md-layout md-alignment-top-center" style="margin-top: 35px; margin-bottom: 35px;"
                @submit.prevent="validateUser">
                <md-card class="md-layout-item md-size-50 md-small-size-100">
                    <md-card-header>
                        <div class="md-title">Solicitar Crédito</div>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="getValidationClass('firstName')">
                                    <label for="first-name">Primeiro Nome</label>
                                    <md-input name="first-name" id="first-name" autocomplete="given-name"
                                        v-model="form.firstName" :disabled="sending" />
                                    <span class="md-error" v-if="!$v.form.firstName.required">É necessário digitar seu
                                        primeiro nome</span>
                                    <span class="md-error" v-else-if="!$v.form.firstName.minlength">Informação
                                        Inválida</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="getValidationClass('lastName')">
                                    <label for="last-name">Sobrenome</label>
                                    <md-input name="last-name" id="last-name" autocomplete="family-name"
                                        v-model="form.lastName" :disabled="sending" />
                                    <span class="md-error" v-if="!$v.form.lastName.required">É necessário digitar seu
                                        sobrenome</span>
                                    <span class="md-error" v-else-if="!$v.form.lastName.minlength">Informação
                                        Inválida</span>
                                </md-field>
                            </div>
                        </div>
                        <md-field :class="getValidationClass('renda')">
                            <label>Renda </label>
                            <span class="md-prefix">R$</span>
                            <md-input v-model="form.renda" :disabled="sending" type="number"></md-input>
                            <span class="md-error" v-if="!$v.form.renda.required">É necessário preencher a renda</span>
                            <span class="md-error" v-else-if="!$v.form.renda.minlength">Renda Inválida!</span>
                        </md-field>
                        <md-field :class="getValidationClass('email')">
                            <label for="email">Email</label>
                            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"
                                :disabled="sending" />
                            <span class="md-error" v-if="!$v.form.email.required">É necessário preencher com seu
                                Email!</span>
                            <span class="md-error" v-else-if="!$v.form.email.email">Email inválido!</span>
                        </md-field>
                    </md-card-content>
                    <md-progress-bar md-mode="indeterminate" v-if="sending" />
                    <md-card-actions>
                        <md-button type="submit" class="md-primary" :disabled="sending">Enviar solicitação</md-button>
                    </md-card-actions>
                </md-card>
                <md-snackbar :md-active.sync="userSaved">Obrigado por solicitar seu crédito! Veja a seguir na lista sua
                    pontuação</md-snackbar>
            </form>
        </div>
        <!-- FIM - MODAL CADASTRO -->
        <div>
            <md-button class="md-fab md-icon-button md-list-action md-primary"
                style="margin-top: 25px;margin-bottom: 25px;" v-on:click="toggleRegister()">
                <md-icon class=" md-primary">add_circle</md-icon>
            </md-button>
        </div>
        <!-- INICIO - CARDS PESQUISA -->
        <div v-if="progressSpinner">
            <md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-if="!progressSpinner">
            <md-table v-model="scores" md-sort="creditScore" md-sort-order="asc" md-card @md-selected="onSelect">
                <md-table-toolbar>
                    <h1 class="md-title">Pedidos de Crédito</h1>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" class="md-primary">
                    <md-table-cell md-label="ID" md-numeric>{{ item._id }}</md-table-cell>
                    <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.nome }}</md-table-cell>
                    <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                    <md-table-cell md-label="Renda Base" md-sort-by="baseRenda">{{ item.baseRenda }}</md-table-cell>
                    <md-table-cell md-label="Credito Aprovado" md-sort-by="approvedCreditValue">
                        {{ item.approvedCreditValue }}</md-table-cell>
                    <md-table-cell md-label="Score" md-sort-by="creditScore">{{ item.creditScore }}</md-table-cell>
                    <md-table-cell md-label="Status Aprovação" md-sort-by="statusScore">{{ item.statusScore }}
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <!-- FIM - CARDS PESQUISA -->
        <!-- INICIO - BOTOES PARA NAVEGACAO TEMPORARIA -->
        <div>
            <md-button class="md-raised md-accent" v-on:click="deleteScore()">Deletar Registro</md-button>
            <md-button class="md-raised md-green" v-on:click="showDialogParams()">Alterar Registro</md-button>
        </div>
        <!-- FIM - BOTOES PARA NAVEGACAO TEMPORARIA -->
        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration"
            :md-active.sync="showSnackbar" md-persistent>
            <span>{{msg}}</span>
        </md-snackbar>
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        validationMixin
    } from 'vuelidate'
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
            return {

                //Recebe a lista de scores GET
                scores: {},

                //Spinner para carregamento de conteudo
                progressSpinner: true,

                // Toggle janela de novo cadastro
                showRegister: false,

                //snackbar
                showSnackbar: false,
                position: 'center',
                duration: 4000,
                isInfinity: false,

                // Mensagem do Snack
                msg: "",

                //Barra de pesquisa
                selectedScore: null,
                scoresSearch: [],

                //Formulario de cadastro
                form: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    renda: null,
                },
                userSaved: false,
                sending: false,
                lastUser: null,

                // Janela de edição de Score
                showDialog: false,

                // Em edição
                itemEdit: {},

                // Item selecionado da lista
                itemSelected: {}
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
        mounted() {
            this.getScore();

        },
        methods: {

            // INICIO Manipulação front-end

            onSelect(item) {
                this.itemSelected = item
            },

            showDialogParams() {

                if (Object.entries(this.itemSelected).length > 0) {
                    this.itemEdit = this.itemSelected;
                    this.showDialog = !this.showDialog;
                } else {
                    this.snackbarShow("Por Favor, Selecione um item da lista");
                }

            },

            goToLogin() {
                this.$router.push({
                    path: '/'
                })
            },

            snackbarShow(msg) {
                if (!this.userSaved) {
                    this.showSnackbar = true
                }
                this.msg = msg;
            },

            toggleRegister() {
                this.showRegister = !this.showRegister;
            },

            // FIM Manipulação front-end

            // INICIO funcoes API SCORE

            getScore() {
                //Adicionar spinner
                this.progressSpinner = true;


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

                this.progressSpinner = false;
            },

            postScore(params) {
                console.info('\n\n postScore \n\n');
                axios.post(`score/`, params).then(res => {
                        console.log(res.data);
                        this.getScore();
                    })
                    .catch(error => console.error(error));
            },

            deleteScore() {

                //Checa se foi selecionado um objeto verificando se há conteudo
                if (this.itemSelected != null || this.itemSelected != undefined) {
                    if (Object.entries(this.itemSelected).length > 0) {
                        console.info('\n\n deleteScore \n\n');
                        axios.delete(`score/${this.itemSelected._id}`).then(res => {
                                console.log(res.data);
                                this.snackbarShow("Mensagem: Solicitação removida com sucesso!");
                                this.getScore();
                            })
                            .catch(error => console.error(error));
                    } else {
                        this.snackbarShow("Por Favor, Selecione um item da lista");
                    }
                } else {
                    this.snackbarShow("Por Favor, Selecione um item da lista");
                }
            },

            updateScore() {
                debugger;
                this.showDialog = false
                console.info('\n\n updateScore \n\n');
                axios.put(`score/${this.itemEdit._id}`, this.itemEdit).then(res => {
                        console.log(res.data);
                        this.getScore();
                    })
                    .catch(error => console.error(error));
            },

            getOneScore(idToSearch) {
                console.info('\n\n getOneScore \n\n');
                axios.put(`score/${idToSearch}`).then(res => {
                        console.log(res.data);
                    })
                    .catch(error => console.error(error));
            },

            // FIM funcoes API SCORE

            // INICIO Funcoes Formulario de cadastro

            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },

            clearForm() {
                this.$v.$reset()
                this.form.firstName = null
                this.form.lastName = null
                this.form.renda = null
                this.form.email = null
            },

            saveUser() {

                this.sending = true
                this.lastUser = `${this.form.firstName} ${this.form.lastName}`
                let params = {
                    "nome": this.lastUser,
                    "email": this.form.email,
                    "baseRenda": parseFloat(this.form.renda)
                }

                this.userSaved = true
                window.setTimeout(() => {
                    this.sending = false
                    this.clearForm()
                    this.postScore(params);
                    this.toggleRegister()
                }, 1500)


            },
            validateUser() {
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

    .md-progress-spinner {
        margin: 24px;
    }
</style>