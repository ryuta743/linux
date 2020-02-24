import moment from '~/plugins/moment';

export const state = () => ({
    contact_data: null,
})

export const getters = {
    contact_data: state => state.contact_data
}

export const mutations = {
    setContact_data(state, {
        contact_data
    }) {
        state.contact_data = contact_data;
    }
}

export const actions = {
    async post_contact({
        commit
    }, {
        contact_data
    }) {
        const user_id = contact_data.user_id;
        const text = contact_data.text;
        const now = moment().format('YYYY-MM-DD')
        console.log('ここから')
        console.log(user_id)
        console.log(text)
        console.log(now)
        console.log('正都天才');
        const contact = await this.$axios.$get(`/api-contact/contact/post_contact?user_id=${user_id}&text=${text}&now=${now}`);
        console.log(contact)
    },
}