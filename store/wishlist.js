export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const MOVE_TO_CART = "MOVE_TO_CART";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const state = () => ({
  data: [],
});

export const getters = {
  wishlist: (state) => {
    return state.data;
  },
  wishlistQty: (state) => {
    return state.data.length;
  },
  isInWishlist: (state) => (product) => {
    return state.data.find((item) => item.id == product.id) ? true : false;
  },
};

export const actions = {
  addToWishlist: function ({ commit }, payload) {
    commit(ADD_TO_WISHLIST, payload);

    new Swal({
      position: "top-end",
      icon: "success",
      text: "Product added to wishlist",
      showConfirmButton: false,
      timer: 1500,
    });
    
  },
  removeFromWishlist: function ({ commit }, payload) {
    commit(REMOVE_FROM_WISHLIST, payload);

    new Swal({
      position: "top-end",
      icon: "success",
      text: "Product removed from wishlist",
      showConfirmButton: false,
      timer: 1500,
    });
  },
  moveToCart: function ({ commit }, payload) {
    commit(REMOVE_FROM_WISHLIST, payload);
    this.commit("cart/ADD_TO_CART", { product: payload.product, qty: 1 });

    new Swal({
      position: "top-end",
      icon: "success",
      text: "Product moved to cart",
      showConfirmButton: false,
      timer: 1500,
    });
  },
};

export const mutations = {
  [ADD_TO_WISHLIST](state, payload) {
    var findIndex = state.data.findIndex(
      (item) => item.id === payload.product.id
    );
    if (findIndex == -1) {
      state.data = [...state.data, payload.product];
    }
  },

  [REMOVE_FROM_WISHLIST](state, payload) {
    state.data = state.data.filter((item) => item.id !== payload.product.id);
  },
};
