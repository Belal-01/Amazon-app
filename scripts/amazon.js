import{cart,addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrancy } from './Utils/money.js';
import { calculateTheQuantity } from '../data/cart.js';

let productsHtml = '';
products.forEach((product)=>{
    productsHtml+=`
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}"> 
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.extraInfoHtml()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" 
        data-product-id="${product.id}">
          Add to Cart
        </button>
        </div>   ` 
});

document.querySelector(".js-products-grid").innerHTML=productsHtml;

updatTheCartQuantity();

 function updatTheCartQuantity(){
 let cartQuantity=calculateTheQuantity();
 if (cartQuantity===0){
    document.querySelector('.js-cart-quantity').innerHTML='';

 }
 else
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
}

function viewTheAddedMessege(productId){
  document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-done');
      
  setTimeout(() => {
    document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-done');
  }, 2000);
}

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
    
    let productId=button.dataset.productId;
    let selectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(selectorElement.value);

    addToCart(productId,quantity);
    updatTheCartQuantity();
    viewTheAddedMessege(productId);
 
  });
});
