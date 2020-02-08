import moment from '~/plugins/moment';

export const state = () => ({
    checkdata: null,
    creditdata: null,
})

export const getters = {
    checkdata: state => state.checkdata,
    creditdata: state => state.creditdata,
}

export const mutations = {
    setCheckdata(state, checkdata) {
        state.checkdata = checkdata;
        console.log(checkdata)
    },
    setCreditdata(state, creditdata) {
        state.creditdata = creditdata;
        console.log(creditdata)
    },
}

export const actions = {
    buycheck({
        commit
    }, {
        buy_userdata
    }) {
        console.log('storeきたよ')
        commit("setCheckdata", buy_userdata);
    },
    buycheck2({
        commit
    }, {
        credit_data
    }) {
        console.log('storeきたよ')
        commit("setCreditdata", credit_data);
    },
}























//     async cart_upload({commit},{payload}){
//         console.log('コロナウイルス到来！！');
//         const user_id = payload.user_id;
//         const product_id = payload.product_id;
//         const count = payload.count;
//         const now = moment().format('YYYY-MM-DD')
//         const cartdata = await this.$axios.$get(`http://133.18.194.128:5000/cart/cart_up?checkdata=${product_id}&user_data=${user_id}&count=${count}&date=${now}`);
//         console.log('APIから戻ってきた!!');
//         console.log(cartdata);
//         commit("setCheckdata", cartdata);
//     },