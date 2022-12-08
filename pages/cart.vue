<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <v-row v-if="cartItemsLength > 0">
          <v-col
            md="4"
            sm="12"
            v-for="(product, index) in cartList"
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
              @click.prevent="removeFromCart({ product: product })"
              ><v-icon dark> mdi-cart-off </v-icon></v-btn
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
              ><v-icon dark> mdi-heart-off </v-icon> </v-btn
            >
          </v-col>
        </v-row>
        <div class="" v-else>
          <p>no products in cart</p>
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
    ...mapActions("cart", ["removeFromCart"]),
    ...mapActions("wishlist", ["addToWishlist"]),
    ...mapActions("wishlist", ["removeFromWishlist", "moveToCart"]),
  },
  computed: {
    ...mapGetters("wishlist", ["isInWishlist"]),
    ...mapGetters("cart", ["cartList", "priceTotal", "qtyTotal"]),
    wishlistItems() {
      return this.$store.state.cart.data;
    },
    cartItems() {
      return this.$store.state.cart.data;
    },
    cartItemsLength() {
      return this.$store.state.cart.data.length;
    },
  },
};
</script>

<style></style>
