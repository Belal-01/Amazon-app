import { renderOrderSummary } from "../../../scripts/Checkout/OrderSummary.js";
import { loadFromStorage ,cart,updatDeliveryOption } from "../../../data/cart.js";
import { renderpaymentSummary } from "../../../scripts/Checkout/paymentSummary.js";

describe('test suit :test orderSummary',()=>{
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 ="15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(()=>{
    document.querySelector('.js-test-container').innerHTML =`
    <div class="js-checkout-header">
    </div>
    <div class="order-summary js-order-summary">
    </div>
    <div class="js-payment-summary"></div>`;
  
    spyOn(localStorage,'setItem')
   
     spyOn(localStorage,'getItem').and.callFake(()=>{
       return JSON.stringify([{
         productId:productId1,
         quantity:2,
         deliveryOptionId :'1'
       },{
         productId:productId2,
         quantity:1,
         deliveryOptionId:'2'
       }]);
     });
   loadFromStorage();
   
    renderOrderSummary();
  });
  afterEach(()=>{
 document.querySelector('.js-test-container').innerHTML =``;
    
  })
it ('test render summary',()=>{

 expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
 expect(document.querySelector(`.js-quantity-${productId1}`).innerText).toContain('Quantity: 2');
 expect(document.querySelector(`.js-quantity-${productId2}`).innerText).toContain('Quantity: 1');


});

it('removes a product',()=>{

  document.querySelector(`.js-delete-link-${productId1}`).click();

  expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

  expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

  expect(cart.length).toEqual(1);

  expect(cart[0].productId).toEqual(productId2);


});
it('test the product name',()=>{
  expect(
    document.querySelector(`.js-product-name-${productId1}`).innerText
  ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
});
it ('test the price of the product',()=>{
  expect(
    document.querySelector(`.js-product-price-${productId1}`).innerText
  ).toEqual('$10.90')
})
});
 
describe ('test suit :test delivery Options',()=>{
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 ="15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(()=>{
    document.querySelector('.js-test-container').innerHTML =`
    <div class="js-checkout-header">
    </div>
    <div class="order-summary js-order-summary">
    </div>
    <div class="js-payment-summary"></div>`;
    spyOn(localStorage,'setItem')
   
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:productId1,
        quantity:2,
        deliveryOptionId :'1'
      },{
        productId:productId2,
        quantity:1,
        deliveryOptionId:'2'
      }]);
    });
    loadFromStorage();
  });
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML =``;
  })
  it('test updating delivery option id',()=>{
  updatDeliveryOption(productId1,'2');
  expect(cart[0].deliveryOptionId).toEqual('2');
  });

  it ('test action on delivery option',()=>{ 
    renderOrderSummary();
    renderpaymentSummary();
    document.querySelector(`.js-delivery-option-${productId2}-${'3'}`).click();
    expect(cart[1].deliveryOptionId).toEqual('3');

    expect(
      document.querySelector(`.js-delivery-option-input-${productId2}-${'3'}`).checked
    ).toEqual(true);
    expect(cart.length).toEqual(2);

    expect(
      document.querySelector('.js-shipping-money').innerText
    ).toEqual('$9.99')
  });
})