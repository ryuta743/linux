import moment from '~/plugins/moment';

export const state = () => ({
    workshop_data: {},
    orderlist: [],
    details: [],
    products: [],
    sales: [],
    saleitem: []
})

export const getters = {
    workshop_data: state => state.workshop_data,
    loading: state => state.loading,
    orderlist: state => state.orderlist,
    details: state => state.details,
    products: state => state.products,
    sales: state => state.sales,
    saleitem: state => state.saleitem
}

export const mutations = {
    setWorkshop(state, val) {
        state.workshop_data = val;
    },
    setOrderlist(state, val) {
        state.orderlist = val
    },
    setOrderdetail(state, val) {
        state.details = val
    },
    setProduct(state, val) {
        state.products = val
    },
    setStock(state, val) {
        state.products.stock = val;
    },
    setSales(state, val) {
        state.sales = val;
    },
    setSaleitem(state, val) {
        state.saleitem = val;
    }
}

export const actions = {
    async getShopdata({
        commit
    }, {
        wsid
    }) {
        try {
            const ws_inf = await this.$axios.$get(`http://express:9080/workshopManage/getShopdata?shop_id=${wsid}`);
            commit('setWorkshop', ws_inf[0])
        } catch (error) {
            if (error.response.status == 403) {
                throw new Error("You don't have workshop")
            }
        }
    },
    async getOrderlist({
        commit
    }, {
        wsid
    }) {
        try {
            const ws_inf = await this.$axios.$get(`http://express:9080/workshopManage/getOrderlist?shop_id=${wsid}`);
            commit('setOrderlist', ws_inf)
        } catch (error) {
            if (error.response.status === 403) {
                throw new Error("You don't have workshop")
            }
        }
    },
    async getOrderdetail({
        commit
    }, {
        wsid,
        order_number
    }) {
        console.log('受け取ったデータ:' + wsid)
        try {
            console.log('aa')
            const ws_inf = await this.$axios.$get(`http://express:9080/workshopManage/getOrderdetail?shop_id=${wsid}&order_number=${order_number}`);
            if (ws_inf.length > 0) {
                for (var i = 0; ws_inf.length > i; i++) {
                    if (ws_inf[i].proccess == 1) ws_inf[i].proccess = true;
                };
            }
            commit('setOrderdetail', ws_inf)
            console.log(ws_inf)
        } catch (error) {
            if (error.response.status === 403) {
                throw new Error("You don't have workshop")
            }
        }
    },
    async getProduct({
        commit
    }, {
        wsid
    }) {
        console.log('受け取ったデータ:' + wsid)
        try {
            var products = await this.$axios.$get(`http://express:9080/workshopManage/getProducts?shop_id=${wsid}`);
            for (var i = 0; i < products.length; i++) {
                products[i].product_img = `https://firebasestorage.googleapis.com/v0/b/tenshoku-9b0c8.appspot.com/o/images%2F${products[i].shop_id}%2Fproducts%2F${products[i].product_img}?alt=media`;
            }
            commit('setProduct', products)
            console.log(products)
        } catch (error) {
            if (error.response.status === 403) {
                throw new Error("You don't have workshop")
            }
        }
    },
    async getSale({
        commit
    }, {
        wsid
    }) {
        console.log('受け取ったデータ:' + wsid)
        try {
            const sales = await this.$axios.$get(`http://express:9080/workshopManage/getSale?shop_id=${wsid}`);
            commit('setSales', sales)
            console.log(sales)
        } catch (error) {
            if (error.response.status === 403) {
                throw new Error("You don't have workshop")
            }
        }
    },
    async getSaleitem({
        commit
    }, {
        saleid
    }) {
        try {
            console.log(saleid)
            var saleitem = await this.$axios.$get(`http://express:9080/workshopManage/getSaleitem?sale_id=${saleid}`)
        } catch (error) {
            throw new Error("Error!")
        }
        commit('setSaleitem', saleitem)
        return true
    },
    async addSale({
        commit
    }, {
        payload
    }) {
        var strong = 1000;
        const saleid = new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16);
        const wsid = payload.wsid;
        const rate = payload.rate;
        const salename = payload.salename;
        const items = payload.items;
        const products = payload.products;
        try {
            for (var i = 0; i < items.length; i++) {
                this.$axios.$get(`http://express:9080/workshopManage/addSale?sale_id=${saleid}&product_id=${products[items[i]].product_id}&shop_id=${wsid}&sale_name=${salename}&rate=${rate}`);
            }
            return 'success'
        } catch (error) {
            throw new Error("Error!")
        }
    },
    async addProduct({
        commit
    }, {
        payload
    }) {
        try {
            const now = moment().format('YYYY-MM-DD');
            this.$axios.$get(`http://express:9080/workshopManage/addProduct?shop_id=${payload.wsid}&product_name=${payload.product_name}&product_name_en=${payload.product_name_en}&product_number=${payload.product_number}&price=${payload.price}&record_date=${now}&product_detail=${payload.description}&product_img=${payload.img}&stock=${payload.stock}&safety=${payload.safety}&size=${payload.size}&mate=${payload.mate}&weight=${payload.weight}`)
        } catch (error) {
            throw new Error("Error")
        }
    }
}