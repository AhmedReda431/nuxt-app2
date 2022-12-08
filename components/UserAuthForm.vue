<template>
  <v-form v-model="valid">
    <div v-if="hasName">
      <h6>{{ $t("First Name") }}</h6>
      <v-text-field
        v-model="userInfo.first_name"
        :append-icon="'mdi-user'"
        outlined
        dense
        color="green"
      />
    </div>
    <div v-if="hasName">
      <h6>{{ $t("Last Name") }}</h6>
      <v-text-field v-model="userInfo.last_name" outlined dense color="green" />
    </div>
    <div class="email">
      <h6>{{ $t("Email") }}</h6>
      <v-text-field
        v-model="userInfo.email"
        :append-icon="'mdi-email'"
        outlined
        dense
        color="green"
      />
    </div>

    <div class="password">
      <h6>{{ $t("Password (6 Or More Characters)") }}</h6>
      <v-text-field
        v-model="userInfo.password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        counter="true"
        outlined
        dense
        color="green"
      />
    </div>
    <div class="confirm">
      <h6 v-if="confirmPass">{{ $t("Confirm Password") }}</h6>
      <v-text-field
        v-model="userInfo.password_confirmation"
        v-if="confirmPass"
        :type="showConfirmPassword ? 'text' : 'password'"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showConfirmPassword = !showConfirmPassword"
        counter="true"
        outlined
        dense
        color="green"
      />
    </div>
    <div class="phone">
      <v-text-field
        v-if="hasName"
        v-model="userInfo.phone"
        label="Phone Number"
        type="number"
        outlined
        dense
        color="green"
      />
    </div>

    <v-row v-if="hasName">
      <v-row>
        <!-- <v-col cols="12">
          <v-card-title class="grey--text font-weight-light"
            >*{{ $t("Select Type") }}*</v-card-title
          >
        </v-col>
        <v-col class="d-flex" cols="6" sm="6">
          <select
          class="form-select px-8 form-control"
          aria-label="select input field"
          id="userInfoType"
          @change="selectType($event)"
          v-model="userInfo.type"
        >
          <option value="emptey" disabled>
            {{ $t('Choose Type') }}
          </option>
          <option value="customer">
            {{ $t('Customer') }}
          </option>
          <option value="broker">
            {{ $t('Broker') }}
          </option>
          <option value="company">
            {{ $t('Company') }}
          </option>

          <option value="emptey" selected>
              {{ $t('Choose your country name') }}
            </option>
        </select>
          <v-radio-group v-model="userInfo.type">
            <v-radio label="Customer" value="customer"></v-radio>
            <v-radio label="Broker" value="broker"></v-radio>
            <v-radio label="Company" value="company"></v-radio>
          </v-radio-group>
        </v-col> -->
      </v-row>

      <v-col class="d-flex" cols="6" sm="6" v-if="userInfo.type == 'company'">
        <v-row>
          <v-col cols="12">
            <v-card-title
              class="grey--text font-weight-light"
              v-if="userInfo.type == 'company'"
              >*{{ $t("Select Company Size") }}*</v-card-title
            >
          </v-col>
          <v-col cols="12">
            <!-- <select
              class="form-select px-8 form-control"
              aria-label="select input field"
              id="companySize"
              @change="checkCompanySize($event)"
              v-model="userInfo.company_size"
              
            >
              <option value="emptey" disabled>
                {{ $t("Choose your Company Type") }}
              </option>
              <option value="small">
                {{ $t("Small") }}
              </option>
              <option value="middle">
                {{ $t("Middle") }}
              </option>
              <option value="large">
                {{ $t("Large") }}
              </option>
              <option value="extra">
                {{ $t("Extra") }}
              </option>
              <option value="emptey" selected>
              {{ $t('Choose your country name') }}
            </option>
            </select> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <v-card-title
      class="grey--text font-weight-light"
      v-if="userInfo.type == 'company'"
      >*{{ $t("Enter Company name") }}*</v-card-title
    >
    <v-row v-if="userInfo.type == 'company'">
      <v-col class="d-flex" cols="12" sm="6" md="12">
        <v-text-field
          v-model="userInfo.name_company"
          :append-icon="'mdi-user'"
          outlined
          dense
          color="green"
        />
      </v-col>
    </v-row> -->

    <v-card v-if="hasName" class="mb-7 mt-4 pa-5" flat>
      <!-- <v-card-title class="grey--text font-weight-light"
        >*{{ $t("optional form") }}*</v-card-title
      > -->
      <!-- <div class="">
        <v-card-title class="grey--text font-weight-light"
          >*{{ $t("Bio") }}*</v-card-title
        >
        <v-row>
          <v-col class="d-flex" cols="12" sm="12" md="12">
            <v-textarea
              v-model="userInfo.bio"
              outlined
              dense
              color="green"
            ></v-textarea>
          </v-col>
        </v-row>
      </div> -->

      <v-row>
        <!-- <v-col class="d-flex" cols="12" sm="6">
          <select
            class="form-select px-8"
            aria-label="select input field"
            id="SelectCountry"
            @change="fetchCities($event)"
          >
            <option
              v-for="country in countries"
              :value="country.id"
              :key="country.id"
            >
              {{ country.name }}
            </option>
            <option value="emptey" selected>
              {{ $t("Choose your country name") }}
            </option>
          </select>
        </v-col> -->
        <!-- <v-col class="d-flex" cols="12" sm="6">
          <select
            class="form-select px-8"
            aria-label="select input field"
            @change="CityId($event)"
            id="SelectCity"
            v-if="Cities"
          >
            <option v-for="(city, i) in Cities.data" :value="city.id" :key="i">
              {{ city.name }}
            </option>
            <option selected value="empty">
              {{ $t("Choose your city name") }}
            </option>
          </select>
        </v-col> -->
      </v-row>
      <!-- <v-col cols="12">
        <v-file-input
          v-if="userInfo.type == 'company'"
          :label="$t('Choose Company image')"
          dense
          required
          prepend-icon="mdi-camera"
          @change="handleImageUpload($event)"
        ></v-file-input>
        <v-file-input
          v-else
          required
          :label="$t('Choose image')"
          dense
          prepend-icon="mdi-camera"
          @change="handleImageUpload($event)"
        ></v-file-input>
      </v-col> -->
    </v-card>

    <v-btn
      @click="submitForm(userInfo)"
      :disabled="!valid"
      text
      :loading="loading"
      color="white"
      :class="{ hasName: 'mt-5' }"
      >{{ buttonText }}</v-btn
    >
  </v-form>
</template>

<script>
// import validations from "@/utils/validations";
// import indexVue from '../../pages/index.vue'
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      showConfirmPassword: false,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      userInfo: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null,
        phone: null,
        // type: null,
        // image: null,
        // city_id: null,
        // country_id: null,
        // company_size: "",
        // selectedType: "",
        // name_company: "",
        // bio: "",
      },
      city_data: null,
      //   ...validations,
    };
  },
  props: [
    "submitForm",
    "buttonText",
    "hasName",
    "confirmPass",
    "loading",
    "register",
    // "Cities",
    // "countries",
  ],
  created() {},
  computed: {},
  watch: {
    // Cities: function () {
    //   if (this.Cities) {
    //     console.log(this.Cities)
    //     this.this.activeComponent = this.categories[0].id
    //     console.log(this.activeComponent)
    //     this.$emit('callback', this.categories[0].id)
    //   }
    // },
  },
  methods: {
    // fetchCities(event) {
    //   this.$store.dispatch("getCities", event.target.value);
    //   this.userInfo.country_id = event.target.value;

    //   this.city_data = this.Cities;
    // },
    CityId(event) {
      this.userInfo.city_id = event.target.value;
    },
    handleImageUpload(event) {
      this.userInfo.image = event;
      // console.log(event);
    },
    checkCompanyType(event) {
      this.userInfo.companyType = event.target.value;
      console.log(event.target.value);
    },
    selectType(event) {
      this.userInfo.type = event.target.value;
      console.log(event.target.value);
    },
    checkCompanySize(event) {
      this.userInfo.company_size = event.target.value;
      console.log(event.target.value);
    },
    showAll() {
      alert(this.userInfo);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  &:hover {
    background-color: transparent;
  }
}

select {
  border: 1px solid #d1d1d1;
  padding: 8px 20px;

  option {
    text-align: center;
  }
  &:focus {
    outline: none;
  }
}
.v-btn,
.v-btn:not(.v-btn--round).v-size--default {
  background: $main-color;

  margin: auto;
  padding: 13px 45px !important;
  display: block;
  line-height: 1;
  height: auto !important;
}
</style>
