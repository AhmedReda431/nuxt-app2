// Cart
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_CART = "UPDATE_CART";

import Swal from "sweetalert2/dist/sweetalert2.js";

// import "sweetalert2/src/sweetalert2.scss";

export const state = () => ({
  data: [],
});

export const getters = {
  cartList: (state) => {
    return state.data;
  },
  priceTotal: (state) => {
    return state.data.reduce((acc, cur) => {
      return acc + cur.sum;
    }, 0);
  },
  qtyTotal: (state) => {
    return state.data.reduce((acc, cur) => {
      return acc + parseInt(cur.qty, 10);
    }, 0);
  },
  isInCart: (state) => (product) => {
    return state.data.find((item) => item.id == product.id) ? true : false;
  },
  canAddToCart: (state) => (product, qty = 1) => {
    var find = state.data.find((item) => item.id == product.id);
    if (find) {
      if (product.stock == 0 || product.stock < find.qty + qty) return false;
      else return true;
    } else {
      if (product.stock == 0 || product.stock < qty) return false;
      else return true;
    }
  },
};

export const actions = {
  addToCart: function({ commit, getters }, payload) {
    if (!getters.canAddToCart(payload.product, payload.qty)) {
      new Swal({
        position: "top-end",
        icon: "error",
        text: "Sorry, you can't add that amount to the cart.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    commit(ADD_TO_CART, payload);
    new Swal({
      position: "top-end",
      icon: "success",
      text: "Product added to cart",
      showConfirmButton: false,
      timer: 1500,
    });
  },
  removeFromCart: function({ commit }, payload) {
    commit(REMOVE_FROM_CART, payload);
    new Swal({
      position: "top-end",
      icon: "success",
      text: "Product removed from cart",
      showConfirmButton: false,
      timer: 1500,
    });
  },
  updateCart: function({ commit }, payload) {
    commit(UPDATE_CART, payload);
    new Swal({
      position: "top-end",
      icon: "success",
      text: "Cart successfully updated",
      showConfirmButton: false,
      timer: 1500,
    });
  },
};

export const mutations = {
  [ADD_TO_CART](state, payload) {
    var findIndex = state.data.findIndex(
      (item) => item.id == payload.product.id
    );
    let qty = payload.qty ? payload.qty : 1;
    if (findIndex !== -1 && payload.product.length > 0) {
      findIndex = state.data.findIndex(
        (item) => item.name == payload.product.name
      );
    }

    if (findIndex !== -1) {
      state.data = state.data.reduce((acc, product, index) => {
        if (findIndex == index) {
          acc.push({
            ...product,
            qty: product.qty + qty,
            sum:
              (payload.product.sale_price
                ? payload.product.sale_price
                : payload.product.price) *
              (product.qty + qty),
          });
        } else {
          acc.push(product);
        }

        return acc;
      }, []);
    } else {
      state.data = [
        ...state.data,
        {
          ...payload.product,
          qty: qty,
          price: payload.product.sale_price
            ? payload.product.sale_price
            : payload.product.price,
          sum:
            qty *
            (payload.product.sale_price
              ? payload.product.sale_price
              : payload.product.price),
        },
      ];
    }
  },

  [REMOVE_FROM_CART](state, payload) {
    state.data = state.data.filter((item) => {
      if (item.id !== payload.product.id) return true;
      if (item.name !== payload.product.name) return true;
      return false;
    });
  },

  [UPDATE_CART](state, payload) {
    state.data = payload.cartItems.reduce((acc, cur) => {
      return [
        ...acc,
        {
          ...cur,
          sum: (cur.sale_price ? cur.sale_price : cur.price) * cur.qty,
        },
      ];
    }, []);
  },

  [CLEAR_CART](state) {
    state.data = [];
  },
};
