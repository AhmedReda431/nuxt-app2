<template>
  <div class="card">
    <hooper
      :settings="sliderSettings"
      :progress="true"
      :autoPlay="true"
      ref="carousel"
      :rtl="availableLocales"
    >
      <slide v-for="(product, index) in products" :key="index">
        <the-card :product="product" />
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination,
} from "hooper";
import "hooper/dist/hooper.css";
import axios from "axios";
export default {
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      axios
        .get(
          // "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
          "https://klm.cdy.mybluehost.me/bouquet/api/home"
        )
        .then((res) => {
          console.log(res);
          this.products = res.data.body.top_rated_products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
  },
  data() {
    return {
      products: null,
      sliderSettings: {
        itemsToShow: 4,
        wheelControl: true,
        centerMode: true,
        infiniteScroll: true,
        autoPlay: true,
        playSpeed: 3000,
        transition: 750,
        breakpoints: {
          300: {
            itemsToShow: 1,
          },
          1000: {
            itemsToShow: 4,
          },
        },
      },
    };
  },
  computed: {
    availableLocales() {
      let local = this.$i18n.locales.filter(
        (i) => i.code !== this.$i18n.locale
      );
      if (local[0].code == "en") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
