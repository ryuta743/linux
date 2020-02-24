import moment from '~/plugins/moment';

export const state = () => ({
    userdata: null,
})

export const getters = {
    userdata: state => state.userdata
}

export const mutations = {
    setUserdata(state, {
        userdata
    }) {
        state.userdata = userdata;
    }
}

export const actions = {
    async inuserdata({
        commit
    }, {
        payload
    }) {
        const data = payload;
        const now = moment().format('YYYY-MM-DD')
        console.log('正都天才');
        console.log(payload);
        const kekka = await this.$axios.$get(`/api-account/account/createuser?name=${data.name}&pass=${data.pass}&mail=${data.mail}&gender=${data.gender}&country=${data.country}&user_type=${data.user_type}&date=${now}`);
        console.log('おかえり')
        console.log(kekka)
        commit("setUserdata", {
            kekka
        })
    },
    async upd_user_data({
        commit
    }, {
        user_data
    }) {
        console.log(user_data)
        console.log('正都天才');
        const flg = user_data.change_type
        const user_id = user_data.userid
        console.log(flg)
        console.log(user_id)
        const change_data = user_data.change_data
        console.log(change_data)
        const upd = await this.$axios.$get(`/api-account/account/upd_account?flg=${flg}&user_id=${user_id}&change_data=${change_data}`);
        console.log('おかえり')
        console.log(upd)
        commit("setUserdata", upd)
    },
    // async upd_user_data({commit},{userid}){
    //     const user_id = userid;
    //     console.log(user_id)
    //     console.log('正都天才');
    //     const upd = await this.$axios.$get(`http://133.18.194.128:5000/account/upd_account?user_id=${user_id}`);
    //     console.log('おかえり')
    //     console.log(upd)
    //     commit("setUserdata", upd)
    // },
}