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
      <div>
        <h6>{{ $t("First Name") }}</h6>
        <v-text-field
          v-model="userInfo.first_name"
          :rules="[required('first_name')]"
          :append-icon="'mdi-user'"
          outlined
          dense
          color="green"
        />
      </div>
      <div>
        <h6>{{ $t("Last Name") }}</h6>
        <v-text-field
          v-model="userInfo.last_name"
          :rules="[required('last_name')]"
          outlined
          dense
          color="green"
        />
      </div>
      <h6>{{ $t("Email") }}</h6>
      <v-text-field
        v-model="userInfo.email"
        :append-icon="'mdi-email'"
        :rules="[required('email'), emailFormat()]"
        outlined
        dense
        color="green"
      />

      <h6>{{ $t("Password (6 Or More Characters)") }}</h6>
      <v-text-field
        v-model="userInfo.password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        counter="true"
        :rules="[required('password'), minLength('password', 6)]"
        outlined
        dense
        color="green"
      />
      <h6>{{ $t("confirm Password") }}</h6>
      <v-text-field
        v-model="userInfo.password_confirmation"
        v-if="confirmPass"
        :type="showConfirmPassword ? 'text' : 'password'"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showConfirmPassword = !showConfirmPassword"
        counter="true"
        :rules="[required('password'), minLength('password', 6)]"
        outlined
        dense
        color="green"
      />

      <v-text-field
        v-model="userInfo.phone"
        label="Phone Number"
        type="number"
        :rules="[required('phone')]"
        outlined
        dense
        color="green"
      />

      <v-card class="mb-7 mt-4 pa-5" flat>
        <v-col cols="12">
          <v-file-input
            required
            :label="$t('Choose image')"
            dense
            prepend-icon="mdi-camera"
            @change="handleImageUpload($event)"
          ></v-file-input>
        </v-col>
      </v-card>

      <v-btn
        class="mr-4"
        @click="registerHandler"
        :loading="loading"
        :disabled="!valid"
      >
        {{ $t("register") }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import validations from "@/utils/validations";
import Notification from "~/components/Notification";
import { postMethods } from "~/API/helpers";
export default {
  components: {
    Notification,
  },
  data() {
    return {
      valid: false,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      success: false,
      error: null,
      confirmPass: true,
      userInfo: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null,
        phone: null,
        image: null,
      },
      city_data: null,
      ...validations,
    };
  },
  methods: {
    async registerHandler() {
      this.loading = true;

      const fd = new FormData();
      fd.append("first_name", this.userInfo.first_name);
      fd.append("last_name", this.userInfo.last_name);
      fd.append("email", this.userInfo.email);
      fd.append("password", this.userInfo.password);
      fd.append("password_confirmation", this.userInfo.password_confirmation);
      fd.append("phone", this.userInfo.phone);
      fd.append("image", this.userInfo.image);

      try {
        let response = await postMethods("register", fd);
        if (response.status == 200) {
          console.log("success", response);
          this.$router.push("/auth/login");
          this.success = true;
        }
      } catch (err) {
        this.error = err.message;
        console.log("error", err);
      }
      this.loading = false;
    },
    handleImageUpload(event) {
      this.userInfo.image = event;
    },
  },
};
</script>
