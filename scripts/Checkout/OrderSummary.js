
import {cart,removeFromCart,calculateTheQuantity,updatQuantity,updatDeliveryOption} from "../../data/cart.js"
import { products,getProduct } from "../../data/products.js";

import { deliveryOptions ,getDeliveryOption,calculateDeliveryDate} from "../../data/deliveryObtions.js";
import { formatCurrancy } from "../Utils/money.js";
import { renderpaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./CheckoutHeader.js";


function renderCheckOutItems(){
let cartSummaryHtml;

cart.forEach((cartItem)=>{ 
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);

 
  const deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = getDeliveryOption(deliveryOptionId);
 
 
  const deliveryDate =calculateDeliveryDate(deliveryOption);
  const dateString = deliveryDate.format('dddd ,MMMM D');
  cartSummaryHtml+= `
   <div class="cart-item-container js-cart-item-container
   js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: ${dateString}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name js-product-name-${matchingProduct.id}">
        ${matchingProduct.name}
      </div>
      <div class="product-price js-product-price-${matchingProduct.id}">
        ${matchingProduct.getPrice()}
      </div>
      <div class="product-quantity js-quantity-${matchingProduct.id}">
        <span>
          Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
          Update
        </span>
        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
        <span class= " save-quantity-link link-primary" data-product-id="${matchingProduct.id}">save</span>
        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
    ${deliveryOptionHtml(matchingProduct,cartItem)}  
    </div>
  </div>
</div>`
});

document.querySelector('.js-order-summary').innerHTML=cartSummaryHtml;
}


function deliveryOptionHtml(matchingProduct,cartItem){
  let Html = '';
  deliveryOptions.forEach((deliveryOption)=>{  
    const deliveryDate =calculateDeliveryDate(deliveryOption);
    const deliveryPrice =( deliveryOption.priceCents===0?'FREE' : `$${formatCurrancy(deliveryOption.priceCents)} -`);
    const ischecked = cartItem.deliveryOptionId===deliveryOption.id;
    const dateString = deliveryDate.format('dddd ,MMMM D');
    Html +=
    `
  <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" 
  data-product-id="${matchingProduct.id}" data-delivery-Option-id="${deliveryOption.id}">
  <input type="radio" 
  ${ischecked ? 'checked': '' }
    class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id} "
    name="delivery-option-${matchingProduct.id}">
  <div>
    <div class="delivery-option-date">
      ${dateString}
    </div>
    <div class="delivery-option-price">
      ${deliveryPrice} Shipping
    </div>
  </div>
</div>`;
  })

return Html;

}






 export function renderOrderSummary(){

renderCheckOutItems();



document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    removeFromCart(productId);
    renderCheckoutHeader();
    renderOrderSummary();
    
  // const container = document.querySelector(
  //     `.js-cart-item-container-${productId}`);
  //     container.remove();
      renderpaymentSummary();
     
  })
});


document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    //console.log(productId);
     
   document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
   

  })
});

document.querySelectorAll('.save-quantity-link').forEach((button)=>{
  button.addEventListener('click',()=>{
 
    const productId=button.dataset.productId;
    let newquantity= Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    //console.log(newquantity);

    updatQuantity(productId,newquantity);

   renderOrderSummary(); 
   renderCheckoutHeader();
   
   
   
    
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
  
  })
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{

    const {productId,deliveryOptionId} = element.dataset;
    updatDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary();
    renderpaymentSummary();

  })
});

};




