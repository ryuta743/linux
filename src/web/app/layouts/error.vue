<template>
  <v-app dark>
    <div id="container">
      <h1 v-if="error.statusCode === 403">
        ログインをしてください。
      </h1>
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <NuxtLink to="/">
        <v-btn color="grey" depressed>ホームに戻る</v-btn>
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}

#container{
  width: 100%;
  height: 90vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

h1 {
  width: 100%;
  text-align: center;
  font-size: 20px;
}
</style>
