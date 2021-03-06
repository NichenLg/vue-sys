import * as types from './../mutations-types'
import router from 'router'
import api from 'assets/js/api'
import qs from 'qs'

export default {
  state: {
    form: {
      username: '',
      password: ''
    },
    msg: ''
  },
  getters: {
    form: state => state.form,
    msg: state => state.msg
  },
  mutations: {
    // 登录
    [types.LOGIN] (state, res) {
      localStorage.setItem('login', res.info.token)
      router.push('/read')
    }
  },
  actions: {
    logIn: ({
      commit, state
    }, key) => {
      api.post('/login', qs.stringify(key))
      .then(function (res) {
        state.form.username = ''
        state.form.password = ''
        if (res.data.code === 200) {
          commit('LOGIN', res.data)
          state.msg = ''
        } else {
          state.msg = res.data.message
        }
      })
    }
  }
}
