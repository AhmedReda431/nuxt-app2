export const state = () => ({
  ChangePassword: null,
})

export const getters = {
  change_password: (state) => {
    state.ChangePassword
  },
}

export const mutations = {
  CHANGE_PASSWORD(state, data) {
    state.ChangePassword = data
  },
}

export const actions = {
  async postChangePassword({ commit }, data) {
    try {
      let response = await this.$axios.put('changePassword', data)
      if (response.status == 200) {
        commit('CHANGE_PASSWORD', response)
        commit('ERRORS', null, { root: true })
      }
    } catch (error) {
      commit('ERRORS', error.response.data, { root: true })
    }
  },
}
