<template>
  <v-container grid-list-xs>
    <v-content>
      <div id="fyu_7u5u1lu09a" class="fyu_container fyu_vertical"></div>
    </v-content>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      script: [{ src: "https://fyu.se/embed?v=2.0" }]
    };
  },
  mounted(){
      aa:FYU.add("7u5u1lu09a", "fyu_7u5u1lu09a",{'nologo':1})
  }
};
</script>

<style>
</style>