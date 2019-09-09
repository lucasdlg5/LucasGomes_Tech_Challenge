<template>
  <div>
    <div>
      <md-card>
        <md-card-media>
          <img src="../assets/dmcard.png">
        </md-card-media>

        <md-card-header>
          <div class="md-title">Solicitação de Crédito</div>
          <div class="md-subhead">Peça e receba seu crédito em minutos!</div>
        </md-card-header>

        <md-card-actions>
          <md-button v-on:click="goToHome()">Entrar!</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      goToHome() {
        this.$router.push({
          path: 'home'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }


  .md-subhead {
    .md-icon {
      $size: 16px;

      width: $size;
      min-width: $size;
      height: $size;
      font-size: $size !important;
    }

    span {
      vertical-align: middle;
    }
  }

  .card-reservation {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .md-icon {
      margin: 8px;
    }
  }

  .md-button-group {
    display: flex;

    .md-button {
      min-width: 60px;
      border-radius: 2px;
    }
  }

  .img {
    height: 168px;
    width: 300px;
  }
</style>