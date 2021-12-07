app.component('product-display', {
 props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: 
  /* html */
    `<div class="product-display">
        <div class="product-container">

          <div 
            class="product-image"
            :class="{ outOfStockImg: !inStock }"
          >
              <img :src="image" alt="">
          </div>

          <div class="product-info">
            <h1>{{ title }}</h1>
            
            <p v-if="inStock > 10 ">In stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
            <p v-else>Out of stock</p>

            <p>Shipping: {{ shipping }}</p>
            
            <ProductDetails :details="details"/>

            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id"
              @mouseover="updateVariant(index)"
              class="color-circle"
              :class="[isActive ? 'activeClass' : '']"
              :style="{ backgroundColor: variant.color }"
            >
            </div>
            <button 
              class="button"
              v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock  }"
            >Add to Cart</button>
            <button 
              v-show="cart > 0 && inStock"
              class="button-remove"
              v-on:click="removeFromCart" 
            >Remove</button>
          </div>


        </div>
      </div>`,
      data() {
        return {
          product: 'Socks',
          brand: 'Vue Mastery', 
          selectedVariant: 0,
          details: ['50% cotton', '30% wool', '20% polyester'],
          otherDetails: ['bla', 'bla', 'bla'],
          variants: [
            { id: 2234, color: '#4CB982', image: './assets/images/socks_green.jpg' , quantity: 50},
            { id: 2235, color: '#20304A',  image: './assets/images/socks_blue.jpg' , quantity: 0 }
          ],
          isActive: true
        }
      },
      methods: {
        addToCart() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeFromCart() {
          this.cart -= 1
        },
        updateVariant(index) {
          this.selectedVariant = index
          }
      },
      computed: {
        title(){
          return this.brand + ' ' + this.product
        },
        image(){
          return this.variants[this.selectedVariant].image
        },
        inStock(){
          return this.variants[this.selectedVariant].quantity
        },
        shipping(){
          if(this.premium) {
            return 'Free'
          }
          return 2.99
        }
        
      }
  }
)