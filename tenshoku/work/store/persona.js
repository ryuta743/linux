import firebase from '~/plugins/firebase'
import 'firebase/storage';
const firestorage = firebase.storage()

export const actions = {
    uploadImage: (context, payload) => {
        return new Promise((resolve, reject) => {
            // firestorage にファイルをアップロード
            const uploadTask = firestorage
                .ref('images/' + payload.name)
                .put(payload.file).then(snapshot => {
                    // アップロード完了処理。URLを取得し、呼び出し元へ返す。
                    snapshot.ref.getDownloadURL().then(url => {
                        resolve(url)
                    })
                })
        })
    }
}