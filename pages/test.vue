<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <v-row>
          <v-col
            md="4"
            sm="12"
            v-for="(product, index) in products"
            :key="index"
          >
            <v-img
              v-if="product.images[0].img"
              :src="product.images[0].img"
              alt=""
              aspect-ratio="1"
              class="grey lighten-2"
            ></v-img>
            <p>{{ product.name }}</p>
            <v-btn
              fab
              small
              depressed
              color="primary"
              @click.prevent="addToCart({ product: product })"
              ><v-icon dark> mdi-cart </v-icon></v-btn
            >

            <v-btn
              v-if="!isInWishlist(product)"
              class="mx-2"
              fab
              dark
              small
              color="pink"
              @click.prevent="addToWishlist({ product: product })"
              ><v-icon dark> mdi-heart </v-icon></v-btn
            >
            <v-btn
              v-else
              class="mx-2"
              dark
              color="pink"
              @click.prevent="removeFromWishlist({ product: product })"
              ><v-icon dark> mdi-heart-off </v-icon>
            </v-btn>
            <!-- <p>
              <nuxt-link to="/wishlist">GO To Wshlist</nuxt-link>
            </p> -->
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("cart", ["addToCart"]),
    ...mapActions("wishlist", ["addToWishlist"]),

    ...mapActions("wishlist", ["removeFromWishlist", "moveToCart"]),
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
  mounted() {
    this.getProducts();
  },
  data() {
    return {
      products: null,
    };
  },
  computed: {
    ...mapGetters("cart", ["canAddToCart"]),
    ...mapGetters("wishlist", ["isInWishlist"]),
  },
};
</script>

<style></style>
