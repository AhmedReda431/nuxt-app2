<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <v-row v-if="wishlistItemsLength > 0">
          <v-col
            md="4"
            sm="12"
            v-for="(product, index) in wishlistItems"
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
              depressed
              color="primary"
              @click.prevent="moveToCart({ product: product })"
              ><v-icon dark> mdi-cart </v-icon></v-btn
            >
            <v-btn
            v-if="isInWishlist(product)"
              class="mx-2"
              dark
              color="pink"
              @click.prevent="removeFromWishlist({ product: product })"
              ><v-icon dark> mdi-heart-off </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div class="" v-else>
          <p>no products in wishlist</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "userDash",
  data() {
    return {
      favourites: null,
    };
  },
  methods: {
    ...mapActions("wishlist", ["removeFromWishlist", "moveToCart"]),
  },
  computed: {
    ...mapGetters("wishlist", ["isInWishlist"]),
    wishlistItems() {
      return this.$store.state.wishlist.data;
    },
    wishlistItemsLength() {
      return this.$store.state.wishlist.data.length;
    },
  },
};
</script>

<style></style>
