<template>
  <v-container grid-list-xs>
    <v-content style="height: 100vh;">
      <v-card>
        <v-card-text>
          <v-icon size="20px" color="success">mdi-check-circle</v-icon>購入手続きが完了しました
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-end>
            <v-btn color="success" @click="$router.push('/')">OK</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>