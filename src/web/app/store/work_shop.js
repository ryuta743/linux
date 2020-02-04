export const state = () => ({
    shop_name: [],
})

export const getters = {
    shop_name: state => state.shop_name,
}

export const mutations = {
    setShop_name(state, shop_name) {
        state.shop_name = shop_name;
        console.log(shop_name)
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
        const shopdata = await this.$axios.$get(`http://express:5000/workshop/get_shop?shop_data=${payload.work_shop}`);
        console.log('APIから戻ってきた');
        console.log(shopdata);
        commit("setShop_name", shopdata)
    },
}