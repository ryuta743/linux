export const state = () => ({
    loginuserdata: null,
})

export const getters = {
    loginuserdata: state => state.loginuserdata
}

export const mutations = {
    setLoginuserdata(state, sessiondata) {
        state.loginuserdata = sessiondata;
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
        const kekka = await this.$axios.$get(`http://express:9080/account/loginuser?mail=${data.mail}&password=${data.password}`);
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
    }
}