<template>
  <div class="container">
    <Products />
  </div>
</template>

<script>
import Products from '@/components/Products.vue';

export default {
  data() {
    return {
      products: [],
    };
  },

  components: {
    Products,
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      import('@/json/product.json')
        .then(({ default: products }) => {
          this.$store.commit('SET_PRODUCTS', products);
        });
    },
  },
};
</script>
