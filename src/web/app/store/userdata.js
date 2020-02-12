import moment from '~/plugins/moment';

export const state = () =>({
    userdata: null,
})

export const getters = {
    userdata: state => state.userdata
}

export const mutations = {
    setUserdata(state,{userdata}){
        state.userdata = userdata;
    }
}

export const actions = {
    async inuserdata({commit},{payload}){
        const data = payload;
        const now = moment().format('YYYY-MM-DD')
        console.log('正都天才');
        console.log(payload);
        const kekka = await this.$axios.$get(`http://express-service/account/createuser?name=${data.name}&pass=${data.pass}&mail=${data.mail}&gender=${data.gender}&country=${data.country}&user_type=${data.user_type}&date=${now}`);
        console.log('おかえり')
        console.log(kekka)
        commit("setUserdata", {kekka})
    },
}