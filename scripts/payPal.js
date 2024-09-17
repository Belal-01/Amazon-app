import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryObtions.js";
import { formatCurrancy } from "./Utils/money.js";

let productPriceCents = 0 ;
let shippingPriceCents =0 ;
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
 
 showPaymentCard()
  console.log(formatCurrancy(totalCents))
   function showPaymentCard(){
   paypal.Buttons({
     createOrder:(data,actions,err)=>{
       return actions.order.create({
         intent:"CAPTURE",
         purchase_units:[
           {
             description:"Cool looking table",
             amount:{
               currency_code:"USD",
               value:formatCurrancy(totalCents)
             }
           }
         ]
       })
     },
     onApprove: async (data,actions) => {
       const order = await actions.order.capture()
       console.log("Successful order :"+ order)
   
     },
     onError:(err)=>{
       console.log(err)
     }
     
   }).render(".paypal")
 }
