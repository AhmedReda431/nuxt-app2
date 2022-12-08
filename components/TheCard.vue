<template>
  <div class="card">
    <div class="wrapper" v-if="product">
      <!-- <nuxt-link
          :to="localePath({ name: 'products-id', params: { id: product.id } })"
        > -->
      <nuxt-link
        :to="localePath({ name: 'categories-id', params: { id: product.id } })"
      >
        <img
          class="card-img-top"
          v-if="product.images[0].img"
          :src="product.images[0].img"
          alt="product-image"
        />
      </nuxt-link>
      <div class="card-body">
        <!-- <div class="card-stars">
            <img
              src="~/assets/images/icons/star_lg.svg"
              alt="star_lg"
              v-for="(i, index) in 4"
              :key="index"
            />
            <img
              src="~/assets/images/icons/star_lg_outline.svg"
              alt="star_lg_outline"
            />
            <span class="stars-count">(52)</span>
          </div> -->

        <h5 class="card-title">
          <nuxt-link
            :to="
              localePath({ name: 'products-id', params: { id: product.id } })
            "
            >{{ product.name }}</nuxt-link
          >
        </h5>
        <!--
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        -->
        <div class="card-body-bottom cflex mt-2">
          <div class="card-price" v-if="product.sizes && product.sizes[0]">
            <p
              v-if="
                product.sizes[0].sale_price && product.sizes[0].regular_price
              "
            >
              <span>{{ product.sizes[0].sale_price }} {{ $t("sar") }}</span>
              <span class="card-discount"
                >{{ product.sizes[0].regular_price }} {{ $t("sar") }}</span
              >
            </p>
            <p
              v-else-if="
                product.sizes[0].sale_price == null &&
                product.sizes[0].regular_price
              "
            >
              <span>{{ product.sizes[0].regular_price }} {{ $t("sar") }}</span>
            </p>
            <p
              v-else-if="
                product.sizes[0].sale_price &&
                product.sizes[0].regular_price == null
              "
            >
              <span>{{ product.sizes[0].sale_price }} {{ $t("sar") }}</span>
            </p>
            <p
              v-else-if="
                product.sizes[0].sale_price == null &&
                product.sizes[0].regular_price == null
              "
            >
              <span>{{ product.sizes[0].regular_price }} {{ $t("sar") }}</span>
            </p>
          </div>

          <nuxt-link
            :to="
              localePath({ name: 'products-id', params: { id: product.id } })
            "
            ><button
              type="button"
              class="action-link"
              @click.prevent="
                addToCart({
                  product: product,
                  qty: 1,
                  price: product.sizes[0].regular_price,
                  size: product.sizes[0].size,
                })
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke="#fff"
                  stroke-linejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg></button
          ></nuxt-link>
        </div>
      </div>
      <button
        type="button"
        class="like-card-btn"
        v-if="!product.is_favourite || !isInWishlist(product)"
        key="notInWishlist"
        @click="
          addToWishlist({
            product: product,
            qty: 1,
            price: product.sizes[0].regular_price,
            size: product.sizes[0].size,
          })
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>
      <button type="button" class="like-card-btn" v-if="isInWishlist(product)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="gold"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["product"],
  methods: {
    ...mapActions("cart", ["addToCart"]),

    ...mapActions("wishlist", ["addToWishlist"]),
  },
  computed: {
    ...mapGetters("wishlist", ["isInWishlist"]),
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
</style>
