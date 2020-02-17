export const state = () => ({
    loginuserdata: null,
    order: '',
    order_result: ''
})

export const getters = {
    loginuserdata: state => state.loginuserdata,
    order: state => state.order,
    order_result: state => state.order_result
}

export const mutations = {
    setLoginuserdata(state, sessiondata) {
        state.loginuserdata = sessiondata;
    },
    setOrder(state, order) {
        state.order = order;
    },
    setOrder_result(state, val) {
        state.order_result = val;
    }
}

export const actions = {
    nuxtServerInit({
        commit
    }, {
        req
    }) {
        console.log('nuxtServerInit')
        if (req.session && req.session.loginuserdata) {
            console.log('nuxtServerInit:' + req.session.loginuserdata);
            commit('setLoginuserdata', req.session.loginuserdata)
        }
    },
    async login({
        commit
    }, {
        payload
    }) {
        const data = payload;
        const kekka = await this.$axios.$get(`/api2/account/loginuser?mail=${data.mail}&password=${data.password}`);
        const sessiondata = await this.$axios.$post(`/api/sessionin`, {
            kekka
        })
        console.log(sessiondata);
        commit('setLoginuserdata', sessiondata)
    },

    async logout({
        commit
    }) {
        await this.$axios.$post('/api/logout')
        commit('setLoginuserdata', null)
        console.log('コミット完了')
    },
    async record({
        commit
    }) {
        const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ja-JP';
        recognition.interimResults = true;
        recognition.onresult = event => {
            console.log(event.results[0][0].transcript);
            var order = event.results[0][0].transcript;
            commit('setOrder', order)
            if (event.results[0].isFinal) {
                if (order.match('トップ') || order.match('top') || order.match('とっぷ') || order.match('最初')) {
                    alert('トップページに移動します')
                    this.$router.push('/')
                }
                if (order.match('工房') || order.match('ショップ') || order.match('自分の') || order.match('管理')) {
                    alert('工房管理ページに移動します')
                    this.$router.push('/client/myshop/myshop')
                }
                if (order.match('ショップ') || order.match('検索') || order.match('ショップ') || order.match('shop')) {
                    alert('ショプページに移動します')
                    this.$router.push('/shop')
                }
                if (order.match('モール') || order.match('ランダム') || order.match('楽しい') || order.match('面白い')) {
                    alert('ランダムモールに移動します')
                    this.$router.push('/mall')
                }
                if (order.match('問い合わせ') || order.match('コンタクト') || order.match('連絡') || order.match('メール')) {
                    alert('お問い合わせページに移動します')
                    this.$router.push('/contact')
                }
                if (order.match('ログイン') || order.match('サインイン') || order.match('認証') || order.match('アカウントイン')) {
                    commit('setOrder_result', 'ログイン')
                }
                if (order.match('ログアウト') || order.match('サインアウト') || order.match('解除') || order.match('アカウントアウト')) {
                    commit('setOrder_result', 'ログアウト')
                }

                commit('setOrder', '')
            }
        }
        recognition.start();
    },
    async order_reset({
        commit
    }) {
        commit('setOrder_result', '')
    }
}