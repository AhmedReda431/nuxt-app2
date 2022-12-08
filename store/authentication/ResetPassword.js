export const state = () => ({
  ResetPassword: null,
  ResetCode: null,
  UpdatePassword: null,
})

export const getters = {}

export const mutations = {
  RESET_PASSWORD(state, data) {
    state.ResetPassword = data
  },
  RESET_CODE(state, data) {
    state.ResetCode = data
  },
  UPDATE_PASSWORD(state, data) {
    state.UpdatePassword = data
  },
}

export const actions = {
  async postResetPassword({ commit }, data) {
    try {
      let response = await this.$axios.post('auth/forgot', data)
      if (response.status == 200) {
        commit('RESET_PASSWORD', response)
        commit('ERRORS', null, { root: true })
        this.$cookiz.set('code-email', data.email)
        this.$router.push('/auth/check-code')
      }
    } catch (error) {
      commit('ERRORS', error.response.data, { root: true })
    }
  },
  async postResetCode({ commit }, data) {
    try {
      let response = await this.$axios.post('auth/checkcode', data)
      if (response.status == 200) {
        commit('RESET_PASSWORD', response)
        commit('ERRORS', null, { root: true })
        this.$cookiz.set('code', data.code)
        this.$router.push('/auth/update-password')
      }
    } catch (error) {
      commit('ERRORS', error.response.data, { root: true })
    }
  },
  async postUpdatePassword({ commit }, data) {
    try {
      let response = await this.$axios.post('auth/reset', data)
      if (response.status == 200) {
        commit('UPDATE_PASSWORD', response)
        commit('ERRORS', null, { root: true })
        this.$cookiz.remove('code-email')
        this.$cookiz.remove('code')
      }
    } catch (error) {
      commit('ERRORS', error.response.data, { root: true })
    }
  },
}
