import moment from '~/plugins/moment';

export const state = () => ({
    checkdata: null,
    buy_data: null,
    buyhis_data: {},
})

export const getters = {
    checkdata: state => state.checkdata,
    buy_data: state => state.buy_data,
    buyhis_data: state => state.buyhis_data,
}

export const mutations = {
    setCheckdata(state, checkdata) {
        state.checkdata = checkdata;
        console.log(checkdata)
    },
    setBuy_data(state, buy_data) {
        state.buy_data = buy_data;
        console.log(buy_data)
    },
    setBuyhis_data(state, buyhis_data) {
        state.buyhis_data = buyhis_data;
        console.log(buyhis_data)
    },
}

export const actions = {
    // 商品購入確認
    buycheck({
        commit
    }, {
        buy_data
    }) {
        console.log('storeきたよ')
        console.log(buy_data)
        commit("setCheckdata", buy_data);
    },

    // 商品購入処理
    async insert_buy({
        commit
    }, {
        buydata
    }) {
        console.log('購入するためのstoreきたよ')
        console.log(buydata)

        const saleid = new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16);

        // 工房の種類を求めるfor文
        var kind = [];
        for (var c = 0; c < buydata[1].cartdata.length; c++) {
            if (kind.indexOf(buydata[1].cartdata[c].shop_id) === -1) {
                kind.indexOf(buydata[1].cartdata[c].shop_id)
                kind.push(buydata[1].cartdata[c].shop_id)
            }
        }

        // 注文一覧テーブルinsert
        for (var a = 0; a < kind.length; a++) {
            var shop_id = buydata[1].cartdata[a].shop_id
            var now = moment().format('YYYY-MM-DD')
            var user_id = buydata[2].user_data.user_data.user_id
            var user_name = buydata[0].name
            var country = buydata[0].country
            var postalcode = buydata[0].postalcode
            var address = buydata[0].address
            var total = buydata[0].total
            var buy_type = buydata[0].buy_type
            var mail = buydata[0].mail
            var tel = buydata[0].tel
            var cart_buy = await this.$axios.$get(`/api-buy/buy/cart_buy?order_id=${saleid}&shop_id=${shop_id}&now=${now}&country=${country}&postalcode=${postalcode}&address=${address}&total=${total}&user_id=${user_id}&user_name=${user_name}&buy_type=${buy_type}&mail=${mail}&tel=${tel}`);
            console.log(cart_buy)
        }

        // 注文明細テーブルinsert
        for (var i = 0; i < buydata[1].cartdata.length; i++) {
            var shop_id = buydata[1].cartdata[i].shop_id
            var now = moment().format('YYYY-MM-DD')
            var country = buydata[0].country
            var postalcode = buydata[0].postalcode
            var address = buydata[0].address
            var total = buydata[0].total
            var user_id = buydata[2].user_data.user_data.user_id
            var user_name = buydata[2].user_data.user_data.user_name
            var buy_type = buydata[0].buy_type
            var mail = buydata[0].mail
            var tel = buydata[0].tel
            var product_id = buydata[1].cartdata[i].product_id
            var product_name = buydata[1].cartdata[i].product_name
            var price = buydata[1].cartdata[i].price
            var count = buydata[1].cartdata[i].count
            var buy_detail = await this.$axios.$get(`/api-buy/buy/buy_details?order_id=${saleid}&shop_id=${shop_id}&user_id=${user_id}&user_name=${user_name}&product_id=${product_id}&product_name=${product_name}&price=${price}&count=${count}`);
            //LINEAPI処理
            console.log('buy_detai:' + buy_detail)
        }

        // 購入処理完了後の商品個数を減らすやつ
        for (var z = 0; z < buydata[1].cartdata.length; z++) {
            var p_id = buydata[1].cartdata[z].product_id
            var now_count = await this.$axios.$get(`/api-product/product/now_count?p_id=${p_id}`);
            console.log(now_count)
            var new_count = now_count[0].stock - buydata[1].cartdata[z].count
            console.log(new_count)
            var upd_count = await this.$axios.$get(`/api-product/product/upd_count?new_count=${new_count}&p_id=${p_id}`);
            console.log(upd_count)
            const line_id = await this.$axios.$get(`/api-linebot/linebot/get_lineid?shop_id=${buydata[1].cartdata[z].shop_id}`);
            console.log('lineID', line_id)
            if (line_id.length > 0) {
                if (buydata[1].cartdata[z].safety >= new_count) {
                    this.$axios.$get(`https://hidden-woodland-14194.herokuapp.com/sendm?shop_id=${buydata[1].cartdata[z].shop_id}&image=${buydata[1].cartdata[z].product_img_origin}&product_number=${buydata[1].cartdata[z].product_number}&product_name=${buydata[1].cartdata[z].product_name}&line_id=${line_id[0].line_id}`);
                }
            }
        }

        // カート内データを消す処理
        const del_cart = await this.$axios.$get(`/api-cart/cart/delete_cart?user_id=${buydata[2].user_data.user_data.user_id}`);
        console.log(del_cart)

        commit("setBuy_data", del_cart);
    },
    async get_buy_history({
        commit
    }, {
        user_id
    }) {
        console.log('購入履歴取得');
        console.log(user_id)
        const get_buy_his = await this.$axios.$get(`/api-buy/buy/get_buy_history?user_id=${user_id}`);
        console.log('おかえり');
        console.log(get_buy_his)
        commit('setBuyhis_data', get_buy_his)
    },
}