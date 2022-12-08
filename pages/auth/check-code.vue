<template>
  <v-container>
    <div v-if="!errors && state_controller">
      <transition name="success" appear>
        <div>
          <ReusableSuccess />
          <div class="my-3">
            <v-alert border="top" color="indigo" dark>
              {{ $t('we have sent the code to your mail. check this out') }}
            </v-alert>
          </div>
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
            :title="$t(`check code`)"
            :msg="$t(`we have sent the code to your mail. check this out`)"
          />
          <h4 class="text-center">{{ email }}</h4>
          <!-- :submitForm="CheckCodeHandler" -->
          <!-- <GeneralCheckCode
            :buttonText="$t('submit')"
            :email="email"
            popupText="test message"
          /> -->
          <div class="text-center">
            <nuxt-link
              to="/auth/login"
              class="text-decoration-none "
            >
              {{
                $t(
                  "login page?"
                )
              }}
            </nuxt-link>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  middleware: 'check-code',
  computed: {
    state_controller() {
      return this.$store.state.authentication.ResetPassword.ResetCode
    },
    errors() {
      return this.$store.state.Errors
    },
    email() {
      return this.$cookiz.get('code-email')
    },
  },
  methods: {
    // async CheckCodeHandler(userInfo) {
    //   const data = {
    //     code: userInfo,
    //     email: this.email,
    //   }
    //   console.log(data)
    //   this.loading = true
    //   await this.$store
    //     .dispatch('authentication/ResetPassword/postResetCode', data)
    //     .finally(() => {
    //       this.loading = false
    //     })
    // },
  },
}
</script>

<style lang="scss" scoped></style>
