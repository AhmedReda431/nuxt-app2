export const state = () => ({
    RegisterUser: null,
})

export const getters = {
    register_user: (state) => {
        state.RegisterUser
    },
}

export const mutations = {
    REGISTER_USER(state, data) {
        state.RegisterUser = data
    },
}

export const actions = {
    async postRegisterUser({ commit }, data) {
        try {
            let response = await this.$axios.post('auth/register', data)
            commit('REGISTER_USER', response)
            if (response && this.$cookiz.get('subscriber_id')) {
                this.$cookiz.set('subscriber_id', '')
                this.$cookiz.remove('subscribtion_info')
                this.$cookiz.remove('subscriptionContractId')
            }
            commit('ERRORS', null, { root: true })
        } catch (error) {
            commit('ERRORS', error.response.data, { root: true })
        }
    },
}