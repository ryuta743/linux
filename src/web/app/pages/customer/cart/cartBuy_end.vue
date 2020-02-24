<template>
  <div id="wrap">
      <div id="buy_end">
          <p class="buy_end">購入手続きが完了しました</p>
          <v-btn class="btn elevation-0" color="success" @click="$router.push(`/`)">OK</v-btn>
          <p class="zako">※購入履歴はアカウントの購入履歴からご覧いただけます</p>
      </div>
  </div>
</template>

<script>
export default {
middleware: 'auth',
}
</script>

<style scoped>
#buy_end{
    background-color: #fff;
    border-radius: 10px;
    border: #cda393 double 5px;
    margin: 70px auto;
    padding-top: 80px;
    width: 700px;
    height: 400px;
    font-size: 50px;
    color: gray;
    text-align: center;
}
.zako{
    padding-top: 60px;
    font-size: 20px;
}
.btn{
    margin-top: 30px;
    width: 100px;
}
</style>