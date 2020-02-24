export const state = () => ({
    data: [],
    productdetails: {},
    products_data: [],
    tags: null,
    tags_results: null,
    favo_data: [],
    tag_data: null,
})

export const getters = {
    data: state => state.data,
    productdetails: state => state.productdetails,
    products_data: state => state.products_data,
    tags: state => state.tags,
    tags_results: state => state.tags_results,
    favo_data: state => state.favo_data,
    tag_data: state => state.tag_data,
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
    setTags(state, tags) {
        state.tags = tags;
        console.log(tags)
    },
    setTags_results(state, tags_results) {
        state.tags_results = tags_results;
        console.log(tags_results)
    },
    setFavo_data(state, favo_data) {
        state.favo_data = favo_data;
        console.log(favo_data)
    },
    setTag_data(state, tag_data) {
        state.tag_data = tag_data;
    },
}

export const actions = {
    async get_newproduct({
        commit
    }) {
        console.log('正都は優しさが溢れてすごい人！！');
        const new_productdata = await this.$axios.$get(`/api-product/product/get_newdata`)
        for (var i = 0; i < new_productdata.length; i++) {
            new_productdata[i].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${new_productdata[i].shop_id}%2Fproducts%2F${new_productdata[i].product_img}?alt=media`;
        }
        console.log(new_productdata)
        commit('setData', new_productdata)
    },
    async select_product({
        commit
    }, {
        payload
    }) {
        console.log('お前は最強だ正都様');
        console.log(payload.product);
        var productname = await this.$axios.$get(`/api-product/product/get_product?pro_data=${payload.product}`);
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
    async data_del({
        commit
    }) {
        const del = []
        commit("setData", del)
    },
    async search_tags({
        commit
    }, {
        payload
    }) {
        console.log('タグ検索ストアまで届いた');
        console.log(payload)
        var tags = await this.$axios.$get(`/api-product/product/get_tags?tags=${payload.tags}`);
        console.log('APIから戻ってきた');
        for (var i = 0; i < tags.length; i++) {
            tags[i].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${tags[i].shop_id}%2Fproducts%2F${tags[i].product_img}?alt=media`;
        }
        console.log(tags);
        commit("setData", tags)
    },
    async getproductdetails({
        commit
    }, {
        p_data
    }) {
        console.log('頑張れ正都！！');
        console.log(p_data.product_id);
        const product_details = await this.$axios.$get(`/api-product/product/get_details?id_data=${p_data.product_id}`);
        product_details[0].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${product_details[0].shop_id}%2Fproducts%2F${product_details[0].product_img}?alt=media`;
        console.log('おかえり');
        console.log(product_details)
        commit('setProductdetails', product_details[0])
    },
    async get_tagdata({
        commit
    }, {
        p_data
    }) {
        console.log('ロード時のタグデータ取得');
        const product_id = p_data.product_id
        const get_tag = await this.$axios.$get(`/api-product/product/get_tag?product_id=${product_id}`);
        console.log('おかえり');
        console.log(get_tag)
        commit('setTag_data', get_tag)
    },
    // async get_newproduct({commit}){
    //     console.log('正都は優しさが溢れてすごい人！！');
    //     const new_productdata = await this.$axios.$get(`http://133.18.194.128:5000/product/get_newdata`);
    //     for(var i = 0; i<new_productdata.length ; i++){
    //         new_productdata[i].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${new_productdata[i].shop_id}%2Fproducts%2F${new_productdata[i].product_img}?alt=media`;
    //         // const reviews = await this.$axios.$get(`http://133.18.194.128:5000/review/get_evaluation?product_id=${new_productdata[i].product_id}`);
    //         // new_data.review.push(reviews[0])
    //     }
    //     // console.log(new_data.review)
    //     console.log(new_productdata)
    //     // commit('setData',new_data)
    // },
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
            var product_data = await this.$axios.$get(`/api-product/product/random_shop_products?shop_id=${shop_id}`);
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
    async product_favo({
        commit
    }, {
        favo_data
    }) {
        console.log('お気に入り登録');
        console.log(favo_data);
        const user_id = favo_data.user_id
        const product_id = favo_data.product_id
        const product_favo_data = await this.$axios.$get(`/api-product/product/product_favo?user_id=${user_id}&product_id=${product_id}`);
        console.log('おかえり');
        console.log(product_favo_data)
    },
    async get_favo_data({
        commit
    }, {
        user_data
    }) {
        console.log('お気に入り登録');
        console.log(user_data);
        const user_id = user_data.user_id
        const product_favo = await this.$axios.$get(`/api-product/product/favo_data?user_id=${user_id}`);
        console.log('おかえり');
        console.log(product_favo)
        var product_favos = [];
        for (var i = 0; i < product_favo.length; i++) {
            product_favos.push(product_favo[i].product_id);
        }
        commit('setFavo_data', product_favo)
        return product_favos;
    },
    async del_product_favo({
        commit
    }, {
        del_data
    }) {
        console.log('お気に入り登録解除');
        console.log(del_data);
        const user_id = del_data.user_id
        const product_id = del_data.product_id
        const del_product_favo = await this.$axios.$get(`/api-product/product/del_favo_data?user_id=${user_id}&product_id=${product_id}`);
        console.log('おかえり');
        console.log(del_product_favo)
    },
}