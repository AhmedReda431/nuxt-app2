<template>
  <div class="container">
    <div class="alerts">
      <div class="alert" v-if="error">
        <v-alert border="top" color="red lighten-2" dark>
          {{ error }}
        </v-alert>
      </div>
      <div class="alert" v-if="!error && success">
        <v-alert border="top" color="red lighten-2" dark>
          success
        </v-alert>
      </div>
    </div>
    <v-form v-model="valid">
      <v-text-field
        v-model="email"
        label="E-mail"
        :append-icon="'mdi-email'"
        :rules="[required('email'), emailFormat()]"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        counter="true"
        label="password"
        :rules="[required('password'), minLength('password', 6)]"
      ></v-text-field>

      <v-btn class="mr-4" @click="login" :loading="loading" :disabled="!valid">
        {{ $t("login") }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import validations from "@/utils/validations";
import Notification from "~/components/Notification";
// import { postMethods } from "~/API/helpers";
export default {
  components: {
    Notification,
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      loading: false,
      showPassword: false,
      success: false,
      valid: false,
      ...validations,
    };
  },
  methods: {
    async login() {
      this.error = null;
      this.loading = true;

      try {
        const response = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        if (response.status == 200) {
          this.$auth.$storage.setCookie("user", response.data.user, false);
          await this.$auth.setUserToken(response.data.access_token);
          this.success = true;
        }
      } catch (err) {
        this.error = err.message;
        console.log("ERRORS", err);
      }
      this.loading = false;
    },
  },
};
</script>
