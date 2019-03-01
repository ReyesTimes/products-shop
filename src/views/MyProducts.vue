<template>
    <main class="container myProducts__section">
        <div v-if="myProducts.length">
            <MyProductsList :products="myProducts"/>
            <TotalPrize />
        </div>
        <NotProducts v-if="!myProducts.length" />
    </main>
</template>

<script>
import NotProducts from '@/components/Cart/NotProducts.vue';
import MyProductsList from '@/components/Cart/MyProductsList.vue';
import TotalPrize from '@/components/Cart/TotalPrize.vue';

import { mapState } from 'vuex';

export default {
  components: {
    NotProducts,
    MyProductsList,
    TotalPrize,
  },

  computed: {
    ...mapState(['myProducts']),
  },
};
</script>

<style lang="scss">
    .myProducts__section {
        margin-top: 4em;
    }
</style>
