export const state = () => ({
    data: [],
    productdetails: {},
    products_data: [],
})

export const getters = {
    data: state => state.data,
    productdetails: state => state.productdetails,
    products_data: state => state.products_data,
}

export const mutations = {
    setData(state, data) {
        state.data = data;
        console.log(data)
    },
    setProductdetails(state, productdetails) {
        state.productdetails = productdetails;
    },
    setProducts_data(state, products_data) {
        state.products_data.push(products_data);
        console.log(products_data)
    },
    setProducts_data_init(state, products_data) {
        state.products_data.shift(products_data);
    },
}

export const actions = {
    async select_product({
        commit
    }, {
        payload
    }) {
        console.log('お前は最強だ正都様');
        console.log(payload.product);
        var productname = await this.$axios.$get(`/api2/product/get_product?pro_data=${payload.product}`);
        console.log('APIから戻ってきた');

        for (var i = 0; i < productname.length; i++) {
            productname[i].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${productname[i].shop_id}%2Fproducts%2F${productname[i].product_img}?alt=media`;
        }
        console.log(productname);
        /* for(var i=0 ; i<productname.length ; i++ ){
            productname[i].tags = await this.$axios.$get(`http://133.18.194.128:5000/product/get_product?pro_data=${productname[i].product_id}`);//product_idでタグを持ってくるAPI
        } */
        commit("setData", productname)
    },
    async getproductdetails({
        commit
    }, {
        p_data
    }) {
        console.log('頑張れ正都！！');
        console.log(p_data.product_id);
        const product_details = await this.$axios.$get(`/api2/product/get_details?id_data=${p_data.product_id}`);
        product_details[0].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${product_details[0].shop_id}%2Fproducts%2F${product_details[0].product_img}?alt=media`;
        console.log('おかえり');
        console.log(product_details[0], [0])
        commit('setProductdetails', product_details[0])
    },
    async get_newproduct({
        commit
    }) {
        console.log('正都は優しさが溢れてすごい人！！');
        const new_productdata = await this.$axios.$get(`/api2/product/get_newdata`);
        for (var i = 0; i < new_productdata.length; i++) {
            new_productdata[i].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${new_productdata[i].shop_id}%2Fproducts%2F${new_productdata[i].product_img}?alt=media`;
        }
        console.log(new_productdata)
        commit('setData', new_productdata)
    },
    async products_list({
        commit
    }, {
        random_id
    }) {
        console.log('愛の力で商品データ取りにきたよ')
        console.log(random_id)
        for (var c = 0; c < random_id.length; c++) {
            var shop_id = random_id[c]
            console.log(shop_id)
            var product_data = await this.$axios.$get(`/api2/product/random_shop_products?shop_id=${shop_id}`);
            for (var i = 0; i < product_data.length; i++) {
                product_data[i].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${shop_id}%2Fproducts%2F${product_data[i].product_img}?alt=media`;
            }
            console.log(product_data)
            commit('setProducts_data', product_data)
        }
    },
    async products_list_init({
        commit
    }) {
        console.log('消してやるぜーーー')
        for (var z = 0; z < 4; z++) {
            commit("setProducts_data_init")
        }
    },
}