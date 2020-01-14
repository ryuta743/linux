<template>
  <v-layout>
    <v-container grid-list-xs>
      <v-content>
        <v-card>
          <v-card-title primary-title>お問い合わせ</v-card-title>
          <v-divider></v-divider>
          <v-subheader>お問い合わせ内容</v-subheader>
          <v-card-text>
            <v-textarea
              outlined
              label
              auto-grow
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap justify-end>
              <v-btn color="info" @click="dialog = true">送信</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-content>
      <v-dialog
        v-model="dialog"
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-text style="padding: 10px;">
            <v-layout row wrap justify-center align-center>
              <h3>
                <v-icon>mdi-check</v-icon>
              </h3>
              <h3>送信しました</h3>
            </v-layout>
            <v-layout row wrap justify-center>
              <v-btn color="success" @click="$router.push('/')">OK</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style>
</style>