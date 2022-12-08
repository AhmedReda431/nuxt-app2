<template>
  <v-container>
    <div v-if="errors">
      <transition name="error" appear v-if="errors">
        <ReusableErrors :errors="errors" />
      </transition>
    </div>
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" md="6">
        <v-col cols="12">
          <ReusableFormsHeader
            :title="$t(`forgot password`)"
            
          />
          <h6 class="my-8 text-center">{{$t('Enter Your Email So We Can Send You A Password Reset Link')}}</h6>
          <ReusableResetAndChangePasswordForm
            :submitForm="ResetPasswordHandler"
            :buttonText="$t('Send')"
            :oldPass="false"
            :confirmPass="false"
            :newPass="false"
            :email="true"
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
  middleware: 'protect-forms',
  computed: {
    errors() {
      return this.$store.state.Errors
    },
  },
  methods: {
    async ResetPasswordHandler(userInfo) {
      const data = userInfo

      this.loading = true

      await this.$store
        .dispatch('authentication/ResetPassword/postResetPassword', data)
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
