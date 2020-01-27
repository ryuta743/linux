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
        console.log('正都天才');
        console.log(payload);
        const kekka = await this.$axios.$get(`http://133.18.194.128:5000/account/createuser?name=${data.name}&pass=${data.pass}&mail=${data.mail}&gender=${data.gender}&countory=${data.countory}&user_type=${data.user_type}`);
        commit("setUserdata", {kekka})
    },
}