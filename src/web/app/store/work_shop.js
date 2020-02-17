export const state = () => ({
    shop_name: [],
    mall: [],
    shop_countdata: null,
    workshop_data: {},
})

export const getters = {
    shop_name: state => state.shop_name,
    mall: state => state.mall,
    shop_countdata: state => state.shop_countdata,
    workshop_data: state => state.workshop_data,
}

export const mutations = {
    setShop_name(state, shop_name) {
        state.shop_name = shop_name;
        console.log(shop_name)
    },
    setMall(state, mall) {
        state.mall.push(mall);
    },
    setMall_init(state, mall) {
        state.mall.shift(mall);
    },
    setShop_countdata(state, shop_countdata) {
        state.shop_countdata = shop_countdata;
        console.log(shop_countdata)
    },
    setWorkshop_data(state, workshop_data) {
        state.workshop_data = workshop_data
        console.log(workshop_data)
    },
}

export const actions = {
    async search_workshop({
        commit
    }, {
        payload
    }) {
        console.log('正都君素敵！！');
        console.log('天も頑張れ！！')
        console.log(payload.work_shop);
        const shopdata = await this.$axios.$get(`/api2/workshop/get_shop?shop_data=${payload.work_shop}`);
        console.log('APIから戻ってきた');
        console.log(shopdata);
        commit("setShop_name", shopdata)
    },
    async mall_init({
        commit
    }) {
        console.log('配列を初期化しにきたべ')
        for (var c = 0; c < 4; c++) {
            commit("setMall_init")
        }
    },
    async random_mall({
        commit
    }, {
        random_id
    }) {
        console.log('いんぽです')
        console.log(random_id)
        for (var i = 0; i < random_id.length; i++) {
            var shop_id = random_id[i]
            var randomshop_data = await this.$axios.$get(`/api2/workshop/random_shop?shop_id=${shop_id}`);
            console.log(randomshop_data)
            commit("setMall", randomshop_data)
        }
    },
    async shop_count({
        commit
    }) {
        console.log('正都はイケメンです')
        let count_shop = await this.$axios.$get(`/api2/workshop/count_shop`);
        let count = count_shop[0]
        console.log(count);
        commit("setShop_countdata", count)
    },
    // 工房詳細データ引き出し
    async get_workshop({
        commit
    }, {
        shop_data
    }) {
        console.log('頑張れ！！マサトmasato')
        const shop_id = shop_data.shop_id
        console.log(shop_id)
        const workshopdata = await this.$axios.$get(`/api2/workshop/get_workshop_data?shop_id=${shop_id}`);
        console.log(workshopdata)
        commit("setWorkshop_data", workshopdata[0])
    }
}