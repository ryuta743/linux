import moment from '~/plugins/moment';

export const state = () => ({
    contactdata: [],
    contact_detail: {},
})

export const getters = {
    contactdata: state => state.contactdata,
    contact_detail: state => state.contact_detail,
}

export const mutations = {
    setContactdata(state, contactdata) {
        state.contactdata = contactdata;
        console.log(contactdata)
    },
    setContact_detail(state, contact_detail) {
        state.contact_detail = contact_detail;
        console.log(contact_detail)
    }
}

export const actions = {
    async get_contactdata({
        commit
    }) {
        console.log('僕のかち');
        const all_contactdata = await this.$axios.$get(`/api-contact/contact/admin_contact`);
        console.log(all_contactdata)
        commit('setContactdata', all_contactdata)
    },
    async get_contact_detail({
        commit
    }, {
        contact_data
    }) {
        console.log('うわああああああ')
        const contact_id = contact_data.contact_id
        const contact_detail = await this.$axios.$get(`/api-contact/contact/admin_contact_detail?contact_id=${contact_id}`);
        console.log(contact_detail[0]);
        commit('setContact_detail', contact_detail[0])
    }
}