<template>
  <v-container>
    <div v-if="!errors && state_controller">
      <transition name="success" appear>
        <div>
          <ReusableSuccess />
          <v-alert border="top" color="indigo" dark>
            <nuxt-link
              to="/auth/login"
              class="text-decoration-none white--text"
            >
              {{
                $t(
                  "Congratulations, now we're done! tap to go to the login page?"
                )
              }}
            </nuxt-link>
          </v-alert>
        </div>
      </transition>
    </div>
    <div v-if="errors">
      <transition name="error" appear v-if="errors">
        <ReusableErrors :errors="errors" />
      </transition>
    </div>
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" md="6">
        <v-col cols="12">
          <ReusableFormsHeader
            :title="$t(`Change Password`)"
            :msg="
              $t(
                `there we finally go, now all you need is just typing the new password you want.`
              )
            "
          />
          <ReusableResetAndChangePasswordForm
            :submitForm="UpdatePasswordHandler"
            :buttonText="$t('submit')"
            :oldPass="false"
            :newPass="true"
            :confirmPass="true"
            :email="false"
            :loading="loading"
          />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  middleware: 'check-code',
  created() {
    console.log(this.state_controller)
  },
  computed: {
    state_controller() {
      return this.$store.state.authentication.ResetPassword.UpdatePassword
    },
    errors() {
      return this.$store.state.Errors
    },
  },
  methods: {
    async UpdatePasswordHandler(userInfo) {
      let user = userInfo
      const data = Object.assign(user, { reset_code: this.$cookiz.get('code') })

      this.loading = true

      await this.$store
        .dispatch('authentication/ResetPassword/postUpdatePassword', data)
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
