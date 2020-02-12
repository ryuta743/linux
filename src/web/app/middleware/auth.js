export default function ({ store, error }) {
    if (!store.state.loginuserdata) {
      error({
        message: 'ログインしてください',
        statusCode: 403
      })
    }
  }