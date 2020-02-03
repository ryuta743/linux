import moment from '~/plugins/moment';

export const state = () =>({
    cart_data: null,
})

export const getters = {
    cart_data: state => state.cart_data,
}

export const mutations = {
    setCart_data(state,cart_data){
        state.cart_data = cart_data;
        console.log(cart_data)
    },
}

export const actions = {
    async cart_upload({commit},{payload}){
        console.log('コロナウイルス到来！！');
        const user_id = payload.user_id;
        const product_id = payload.product_id;
        const count = payload.count;
        const now = moment().format('YYYY-MM-DD')
        const cartdata = await this.$axios.$get(`http://api:5000/cart/cart_up?cart_data=${product_id}&user_data=${user_id}&count=${count}&date=${now}`);
        console.log('APIから戻ってきた!!');
        console.log(cartdata);
        commit("setCart_data", cartdata);
    },
}