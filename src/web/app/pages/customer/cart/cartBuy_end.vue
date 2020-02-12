<template>
  <div id="wrap">
      <div id="buy_end">
          <p>購入手続きが完了しました</p>
          <v-btn color="primary" @click="$router.push(`/`)">OK</v-btn>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#buy_end p{
    font-size: 100pt;
    color: gray;
}
</style>