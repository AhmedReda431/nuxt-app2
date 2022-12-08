import { getMethods } from "@/API/helpers";
// import axios from 'axios'
// import { baseUrl } from '@/API/axios'
export const state = () => ({
    Errors: null,
    Success: null,
    RouteError: false,
    LanguageSwicher: null,
    //   Cities: null,
    //   Coutries: null,
    //   SiteInfo: null,
    //   Comments: [],
});

export const getters = {};

export const mutations = {
    ERRORS(state, data) {
        state.Errors = data;
        if (state.Erros == "UnAuthorized" || state.Erros == "unAuthorized") {
            location.push("/auth/login");
        }
    },
    SUCCESS(state, data) {
        state.Success = data;
    },
    ROUTE_ERROR(state) {
        state.RouteError = true;
        // console.log('hello')
    },
    //   GET_CITES(state, data) {
    //     state.Cities = data;
    //   },
    //   GET_COUNTRIES(state, data) {
    //     state.Coutries = data;
    //   },
    LANGUAGE_SWITCHER(state, data) {
        state.LanguageSwicher = data;
    },
    SITE_INFO(state, data) {
        state.SiteInfo = data;
    },
    //   GET_COMMENTS(state, data) {
    //     state.Comments = data;
    //   },
};
export const actions = {
    languageSwicher({ commit }) {
        commit("LANGUAGE_SWITCHER");
    },
    // async getCities({ commit }, country_id) {
    //     let response = await getMethods("cities", {
    //         offset: 1,
    //         limit: 20,
    //         columns: ["active", "country_id"],
    //         operand: ["=", "="],
    //         column_values: [1, country_id],
    //     });
    //     commit("GET_CITES", response.data.data);
    // },
    async getCountries({ commit }) {
        let response = await this.$axios.$get("country");
        commit("GET_COUNTRIES", response.data.data);
    },
    async getSiteInfo({ commit }) {
        try {
            let response = await this.$axios.$get("info");
            commit("SITE_INFO", response.data.data);
            this.$cookiz.set("site_info", response.data.data);
            // console.log("store siteinfo" , response.data.data);
        } catch (error) {
            console.log(error);
        }
    },
    //   async getComments({ commit }, pageName, id) {
    //     try {
    //       let response = await this.$axios.$get(`${pageName}/${id}`);
    //       commit("GET_COMMENTS", response.data.data.data);
    //       console.log("GET_COMMENTS", response.data.data.data);
    //     } catch (error) {
    //       console.log("GET_COMMENTS", error);
    //     }
    //   },
};