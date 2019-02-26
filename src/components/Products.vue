<template>
    <div class="products__container">
        <div v-for="(product, key) in products" :key="key" class="products__el">
            <div class="products__el--img">
                <img :src="product.ImgMedia" :alt="product.ProductName" />
            </div>
            <div class="products__info">
                <div class="products__info--name">
                    <strong>{{product.ProductName}}</strong>
                </div>
                <div class="products__info--brand">
                    <span>{{product.ProductBrand}}</span>
                </div>
                <div class="products__info--prize">
                    <span>{{product.Prize}}</span>
                </div>
                <button class="products__info--buy" @click="buyProduct(product)">
                    <div>
                        <span>Comprar</span>
                        <span>+</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['products']),
  },

  methods: {
      /*
       * Add product to store
       */
      buyProduct(product) {
        this.$store.commit('ADD_PRODUCT_TO_MY_CART', product)
      }
  },
};
</script>


<style lang="scss">
    .products {
        &__container {
            display: flex;
            flex-wrap: wrap;
            margin-top: 4em;
        }

        &__el {
            width: 23%;
            margin-right: 2.66%;
            margin-bottom: 1em;

            &:nth-child(4n+0) {
                margin-right: 0px;
            }
            
            &:hover .products__info--buy {
                display: block;
            }
        }

        &__el--img {
            & > img {
                width: 100%;
                height: auto;
            }
        }

        &__info {
            padding: 0.75em 0.75em 1em 0;
            text-align: left;
            position: relative;

            &--name {
                margin-bottom: 0.25em;
                font-size: 1.25em;
            }

            &--brand {
                color: gray;
                margin-bottom: 1em;
                font-size: 0.85em;
            }

            &--prize {
                font-family: 'Oswald', sans-serif;

                & > span {
                    position: relative;

                    &::after {
                        content: '';
                        position: absolute;
                        width: 107%;
                        height: 3px;
                        background-color: #ffcb28;
                        left: 0px;
                        bottom: 2px;
                    }
                }
            }

            &--buy {
                display: none;
                position: absolute;
                right: 0px;
                bottom: 10%;

                div {
                    position: relative;
                    background-color: #fff;
                    border: 2px solid #ffcb28;
                    letter-spacing: 1px;
                    font-family: 'Oswald', sans-serif;
                    padding: 0.5em 0.75em;
                    border-radius: 5px;
                    text-transform: uppercase;
                    overflow: hidden;
                }

                & span:first-child {
                    margin-right: 5px;
                }

                &:hover {
                    & > div:after {
                        transform: translateX(-80%);
                    }
                }

                & > div:after {
                    content: 'COMPRAR +';
                    width: 100%;
                    background-color: #ffcb28;
                    color: #231f20;
                    border: 2px solid #ffcb28;
                    padding: 0.5em 0.75em;
                    border-radius: 5px;
                    transform: translateX(-200%);
                    position: absolute;
                    top: -2px;
                    transition: all 0.2s ease-out;
                }
            }
        }
    }
</style>
