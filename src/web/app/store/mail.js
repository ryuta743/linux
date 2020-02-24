export const state = () =>({
    mail_data: null,
})

export const getters = {
    mail_data: state => state.mail_data
}

export const mutations = {
    setMail_data(state,{mail_data}){
        state.mail_data = mail_data;
    }
}

export const actions = {
    async　reply_mail({commit},{mail_data}){
        const to = mail_data.to
        const subject = mail_data.subject;
        const mail = mail_data.mail_text;
        console.log('ここからだ')
        console.log(mail)
        const reply_mail =  await this.$axios.$get(`/api/send_mail?to=${to}&subject=${subject}&mail=${mail}`)
        console.log(reply_mail)
    },
    async　new_user_mail({commit},{payload}){
        const to = payload.mail
        const subject = payload.name+'様の新規登録が完了しました';
        const mail = '天職へようこそ！！'+payload.name+'様の登録が完了いたしましたのでご連絡させていただきました。何かご不明な点や質問などございましたら、サイトのお問い合わせまたはコンタクトからご連絡ください。';
        console.log('ここからだ')
        console.log(mail)
        const reply_mail =  await this.$axios.$get(`/api/send_mail?to=${to}&subject=${subject}&mail=${mail}`)
        console.log(reply_mail)
    },
    async buy_mail({commit},{buydata}){
        const to = buydata[0].mail
        const subject = '購入手続きが完了しました';
        const name = buydata[0].name;
        const total = buydata[0].total
        const type=['[銀行振り込み]','[クレジットカード]','[AmazonPay]']
        const mail = total+'円の購入処理が完了しました'+'お支払い方法'+type[buydata[0].buy_type];
        console.log('ここからだ')
        console.log(mail)
        const reply_mail =  await this.$axios.$get(`/api/send_mail?to=${to}&subject=${subject}&mail=${mail}`)
        console.log(reply_mail)
    },
    async　new_user_mail({commit},{payload}){
        const to = payload.mail
        const subject = payload.name+'様の新規登録が完了しました';
        const mail = '天職へようこそ！！'+payload.name+'様の登録が完了いたしましたのでご連絡させていただきました。何かご不明な点や質問などございましたら、サイトのお問い合わせからご連絡ください。';
        console.log('ここからだ')
        console.log(mail)
        const reply_mail =  await this.$axios.$get(`/api/send_mail?to=${to}&subject=${subject}&mail=${mail}`)
        console.log(reply_mail)
    },
    async　request_mail({commit},{mail_data}){
        console.log('storeまできたべ')
        console.log(mail_data)
        const to = mail_data.work_mail
        const subject = mail_data.your_mail+'からのお問い合わせ'
        const mail = mail_data.mail_text
        const reply_mail =  await this.$axios.$get(`/api/send_mail?to=${to}&subject=${subject}&mail=${mail}`)
        console.log(reply_mail)
    },
}