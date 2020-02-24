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
              v-model="contact_text"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap justify-end>
              <v-btn color="info" @click="post_contactReq">送信</v-btn>
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
import {mapActions,mapGetters} from 'vuex';

export default {
middleware: 'auth',
  data() {
    return {
      contact_text: '',
      dialog: false
    };
  },
  methods:{
    async post_contactReq(){
      console.log(this.contact_text)
      const contact_data = {
        user_id: this.loginuserdata.user_data.user_id,
        text: this.contact_text,
      }
      console.log(contact_data)
      try{
        await this.post_contact({contact_data})
        this.dialog = true
      }catch(e){
        console.log('エラー発生')
        console.log(e)
      }
    },
    
    ...mapActions('contact',['post_contact'])
  },
  computed:{
    ...mapGetters(['loginuserdata'])
  }
};
</script>

<style>
</style>