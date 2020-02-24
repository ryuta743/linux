<template>
  <v-layout>
    <v-container grid-list-xs>
      <v-content>
        <v-card>
          <v-card-title primary-title>お問い合わせ</v-card-title>
          <v-divider></v-divider>
          <v-subheader>お問い合わせ返信</v-subheader>
          <p>{{contact_detail.user_mail ? contact_detail.user_mail:''}}</p>
          <p>{{contact_detail.contact_detail ? contact_detail.contact_detail:''}}</p>
          <!-- <v-text-field outlined type="mail" label='宛先' v-model="to"></v-text-field> -->
          <v-text-field outlined label='件名' v-model="subject"></v-text-field>
          <v-card-text>
            <v-textarea
              outlined
              label
              auto-grow
              v-model="mail_text"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap justify-end>
              <v-btn color="info" @click="reply_mailReq">送信</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-content>
    </v-container>
  </v-layout>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

export default {
    mounted(){
      console.log(this.$route.params.admin2)
      this.get_contact_detailReq()
    },
    data() {
        return {
            to: '',
            subject: '',
            mail_text: '',
        };
    },
    methods:{
      async get_contact_detailReq(){
        const contact_data = {
          contact_id: this.$route.params.admin2
        }
        console.log(contact_data)
        await this.get_contact_detail({contact_data})
      },
      async reply_mailReq(){
        this.to = this.contact_detail.user_mail
        try{
          const mail_data={
            to: this.to,
            subject: this.subject,
            mail_text: this.mail_text,
          }
          console.log(mail_data)
          await this.reply_mail({mail_data})
          console.log('ちんちん')
          this.to = "",
          this.subject = "",
          this.mail_text = ""
        }catch(e){
          console.log('エラー発生')
          console.log(e)
        }
      },
      ...mapActions('admin',['get_contactdata','get_contact_detail']),
      ...mapActions('mail',['reply_mail']),
    },
    computed:{
      ...mapGetters('admin',['contactdata','contact_detail']),
      ...mapGetters(['loginuserdata'])
    }
};

</script>

<style>
</style>