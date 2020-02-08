import firebase from '~/plugins/firebase';
import 'firebase/database';
import moment from '~/plugins/moment';

const database = firebase.database();

export const state = () => ({
    chatlogs: null,
})

export const getters = {
    chatlogs: state => state.chatlogs,
}

export const mutations = {
    setChatlogs(state, logs) {
        state.chatlogs = logs;
    }
}

export const actions = {
    async openChat({
        commit
    }, {
        payload
    }) {
        const wsid = payload.wsid;
        const fb = await database.ref('chatroom/' + wsid);
        await fb.on('value', (snapshot) => {
            commit('setChatlogs', snapshot.val());
        });
        return true;
    },
    async sendChat({
        commit
    }, {
        payload
    }) {
        const wsid = payload.wsid;
        const userid = payload.userid;
        const username = payload.username;
        const message = payload.message;
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const fb = await database.ref('chatroom/' + wsid);
        fb.push({
            userid: userid,
            username: username,
            message: message,
            timestamp: now
        })
    }
}