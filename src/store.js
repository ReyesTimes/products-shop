import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    myProducts: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = [...products];
    },

    ADD_PRODUCT_TO_MY_CART(state, product) {
      state.myProducts.push(product)
    }
  },
  actions: {

  },
});
