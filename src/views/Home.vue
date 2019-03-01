<template>
  <main class="container">
    <Products />
  </main>
</template>

<script>
import Products from '@/components/home/Products.vue';

import { mapState } from 'vuex';

export default {
  data() {
    return {
      products: [],
    };
  },

  computed: {
    ...mapState(['dragging']),
  },

  components: {
    Products,
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    /*
     * Get products and set in store
     */
    getProducts() {
      import('@/json/product.json')
        .then(({ default: products }) => {
          this.$store.commit('SET_PRODUCTS', products);
        });
    },
  },
};
</script>
