export const state = () => ({});

export const getters = {
    setUser: (state) => {
        return state.auth.user;
    },
};

export const mutations = {
    LOGIN(state, data) {
        state.auth.user = data;
    },
};

export const actions = {
    async LoginHandler({ commit }, data) {
        try {
            const response = await this.$auth.loginWith("local", { data: data });

            this.$auth.$storage.setCookie("user", response.data.user, false);
            await this.$auth.setUserToken(response.data.access_token);

            if (response.status == 200) {
                commit("LOGIN", response.data.user);
                commit("ERRORS", null, { root: true });
            }
        } catch (error) {
            console.log("ERRORS", error);
            commit("ERRORS", error.response.data, { root: true });
        }
    },
    Logout({ state, commit }) {
        localStorage.removeItem("auth._token.local");
        localStorage.removeItem("auth._token_expiration.local");
        this.$cookiz.remove("auth._token.local");
        this.$cookiz.remove("auth.user");
        this.$cookiz.remove("auth._token_expiration.local");
        this.$router.push("/");
        location.reload();
    },
};