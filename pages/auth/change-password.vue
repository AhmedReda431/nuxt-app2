<template>
  <v-container>
    <div v-if="!errors && state_controller">
      <transition name="success" appear>
        <ReusableSuccess />
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
                `It's too easy now to change your password, just follow the steps down below!`
              )
            "
          />
          <ReusableResetAndChangePasswordForm
            :submitForm="ChangePasswordHandler"
            :buttonText="$t('submit')"
            :oldPass="true"
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
  middleware: 'authentiacteUser',
  computed: {
    state_controller() {
      return this.$store.state.authentication.ChangePassword.ChangePassword
    },
    errors() {
      return this.$store.state.Errors
    },
  },
  methods: {
    async ChangePasswordHandler(userInfo) {
      const data = userInfo

      this.loading = true

      await this.$store
        .dispatch('authentication/ChangePassword/postChangePassword', data)
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
