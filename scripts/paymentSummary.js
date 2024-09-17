import { calculateTheQuantity, cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryObtions.js";
import { formatCurrancy } from "./Utils/money.js";

export function renderpaymentSummary(){
  let productPriceCents = 0 ;
  let shippingPriceCents = 0;
cart.forEach((cartItem) => {
 const product = getProduct(cartItem.productId);
 productPriceCents += product.priceCents * cartItem.quantity;

 const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
 shippingPriceCents += deliveryOption.priceCents;


 //console.log(productPriceCents);
});
const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
const taxCents = totalBeforeTaxCents*0.1;
const totalCents = totalBeforeTaxCents + taxCents;

const paymentSummaryHtml = `
      <div class="payment-summary-title">
      Order Summary
      </div>

      <div class="payment-summary-row">
      <div>Items (${calculateTheQuantity()}):</div>
      <div class="payment-summary-money">
      $${formatCurrancy(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-money">
      $${formatCurrancy(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurrancy(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${formatCurrancy(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${formatCurrancy(totalCents)}</div>
      </div>

     <a href="./payPal.html">
      <button class="place-order-button button-primary" id="payment-btn">
         Place your order
        </button>
      </a>`;
const paymentSummary = document.querySelector('.js-payment-summary')
   paymentSummary.innerHTML = paymentSummaryHtml;

  

 
}
 

    


//renderpaymentSummary();