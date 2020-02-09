import moment from '~/plugins/moment';

export const state = () => ({
    cart_data: [],
    getcartdata: [],
    updata_data: null,
})

export const getters = {
    cart_data: state => state.cart_data,
    getcartdata: state => state.getcartdata,
    updata_data: state => state.updata_data,
}

export const mutations = {
    setCart_data(state, cart_data) {
        state.cart_data = cart_data;
        console.log(cart_data)
    },
    setGetcartdata(state, getcartdata) {
        state.getcartdata = getcartdata;
        console.log(getcartdata)
    },
    setUpdata_data(state, updata_data) {
        state.updata_data = updata_data;
        console.log(updata_data)
    },
}

export const actions = {
    async upd_cart({
        commit
    }, {
        data
    }) {
        console.log('ちっくしょー！！');
        const user_id = data.upd_obj.user_id
        const product_id = data.upd_obj.product_id
        const old_count = data.upd_obj.count
        const count = data.count
        const new_count = count + old_count
        console.log('変更する個数' + new_count)
        const upd_cartdata = await this.$axios.$get(`http://express/cart/cart_upd?product_id=${product_id}&user_id=${user_id}&new_count=${new_count}`);
        console.log('あと少し!!');
        console.log(upd_cartdata);
        commit("setUpdata_data", upd_cartdata);
    },

    async cart_upload({
        commit
    }, {
        payload
    }) {
        console.log('コロナウイルス到来！！');
        const user_id = payload.user_id;
        const product_id = payload.product_id;
        const count = payload.count;
        const now = moment().format('YYYY-MM-DD')
        const cartdata = await this.$axios.$get(`http://express/cart/cart_up?cart_data=${product_id}&user_data=${user_id}&count=${count}&date=${now}`);
        console.log('APIから戻ってきた!!');
        console.log(cartdata);
        commit("setCart_data", cartdata);
    },

    async get_cartdata({
        commit
    }, {
        userid
    }) {
        console.log('カート情報引き出し')
        const u_id = userid;
        console.log(u_id)
        var get_cart = await this.$axios.$get(`http://express/cart/get_cart_data?user_id=${u_id}`);
        for (var i = 0; i < get_cart.length; i++) {
            get_cart[i].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${get_cart[i].shop_id}%2Fproducts%2F${get_cart[i].product_img}?alt=media`;
        }
        console.log(get_cart)
        commit("setGetcartdata", get_cart);
    },
}