import axiosRetry from "axios-retry";
import Axios from "axios";


export const state = () => ({
  //mutationsのsetUserDataから更新を受け取る userData=
  insertStatus: ["WaitingOrder"]
})

export const getters = {
  //flaxという??????
  //state
  insertStatus: state => state.insertStatus
}

export const mutations = {
  //actionのgetUserDataから引数userDataをもらっている
  updateStatus(state, {
    insertStatus
  }) {
    console.log("updateStatus:Start")
    //stateのuserDataを更新！
    state.insertStatus = insertStatus;
  }
}

export const actions = {
  async insertData({
    commit
  }, {
    payload
  }) {
    console.log("insertData:Start");
    const alex = payload;
    console.log("alex id=" + alex.id);
    console.log("alex pass=" + alex.pass);
    const url = `/api/insertReq?id=${alex.id}&pass=${alex.pass}`;
    const urlEncode = encodeURI(url);
    const chris = await this.$axios.$get(urlEncode);
    console.log("insertData:ReStart")
    //チェック用forEach
    //chris.forEach(cody => {
    //  console.log("cody id=" + cody.id);
    //  console.log("cody pass=" + cody.pass);
    //})
    const dave = "Success!"
    commit('updateStatus', {
      dave
    })
  }
  /*
    //コンポーネントからpayloadを持ってきてる
    async getUserData({
      //commitは他のmutationを起動させることができる
      commit
    }, {
      payload
    }) {

      //変数userDataにpayloadの中身を入れる
      const userBox = payload
      //テスト用logデータ
      console.log("userBox =" + userBox.id);
      await this.$axios.get('api/apiReq', {
          params: {
            data: userBox.id
          }
        })
        .then(res => {
          userData = res.db.query;
        })
      //mutationのsetUserDataが動く。引数はuserData
      commit('setUserData', {
        userData
      })
    }
    */
}
