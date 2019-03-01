import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    myProducts: [],
    quantity: 0,
    dragging: false,
  },

  getters: {
    getTotalAccount: state => state.myProducts.reduce((old, active) => {
      const oldValue = (typeof old === 'object') ? (old.quantity * old.Prize) : old;
      return oldValue + (active.quantity * active.Prize);
    }, 0),
  },

  mutations: {
    /*
     * Set product depending of json
     */
    SET_PRODUCTS(state, products) {
      state.products = [...products];
    },

    /*
     * Add a product in cart
     */
    ADD_PRODUCT_TO_MY_CART(state, product) {
      state.myProducts.push(product);
    },

    /*
     * Change specific product quantity, depending of index and increment per 1
     */
    INCREMENT_QUANTITY_PRODUCT(state, index) {
      Vue.set(state.myProducts[index], 'quantity', state.myProducts[index].quantity + 1);
    },

    /*
     * Change specific product quantity, depending of index and value
     */
    CHANGE_QUANTITY_PRODUCT(state, { index, quantity }) {
      Vue.set(state.myProducts[index], 'quantity', quantity);
    },

    /*
     * Increment to quantity depending of value
     */
    PUSH_QUANTITY_PRODUCTS(state, payload) {
      state.quantity += payload.quantity;
    },

    /*
     * Subtract to quantity depending of value
     */
    SUBTRACT_QUANTITY(state, payload) {
      state.quantity -= payload.quantity;
    },

    /*
     * Delete product depeding of index
     */
    DELETE_PRODUCT(state, payload) {
      state.myProducts = [
        ...state.myProducts.slice(0, payload.index),
        ...state.myProducts.slice(payload.index + 1),
      ];
    },

    /*
     * Switch value of dragging
     */
    SWITCH_DRAGGING(state) {
      state.dragging = !state.dragging;
    },
  },

  actions: {
    ADD_PRODUCT_TO_MY_CART(context, product) {
      return new Promise((resolve) => {
        const productIndex = context.state.myProducts.findIndex(myProduct => myProduct.ProductId === product.ProductId);

        if (productIndex > -1) {
          context.commit('INCREMENT_QUANTITY_PRODUCT', productIndex);
        } else {
          context.commit('ADD_PRODUCT_TO_MY_CART', { ...product, quantity: 1 });
        }

        context.commit('PUSH_QUANTITY_PRODUCTS', { quantity: 1 });

        resolve(context.state.myProducts);
      });
    },

    DELETE_PRODUCT(context, payload) {
      const { index } = payload;
      const { quantity } = context.state.myProducts[index];

      context.commit('SUBTRACT_QUANTITY', { quantity });
      context.commit('DELETE_PRODUCT', { index });
    },

    UPDATE_QUANTITY_PRODUCT(context, { index, quantity }) {
      const oldQuantity = context.state.myProducts[index].quantity;
      const subtractQuantity = (quantity - oldQuantity);

      if (subtractQuantity < 0) {
        context.commit('SUBTRACT_QUANTITY', { quantity: Math.abs(subtractQuantity) });
      } else if (subtractQuantity > 0) {
        context.commit('PUSH_QUANTITY_PRODUCTS', { quantity: subtractQuantity });
      }

      context.commit('CHANGE_QUANTITY_PRODUCT', { index, quantity });
    },
  },
});
