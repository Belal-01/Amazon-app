import { addToCart,cart,loadFromStorage,removeFromCart,updatDeliveryOption } from "../../../data/cart.js";


describe("test suit :add to cart",()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem')
  })
  it ('add an existing product to the cart',()=>{
    

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
      }]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
    }]));

  });
  
  it ( 'add a new product to the cart',()=>{

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
   
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:1,
      deliveryOptionId:'1'
    }]));
  });
});

describe('test suit:remove from the cart', ()=>{
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 ="15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    spyOn (localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:productId1,
        quantity:1,
        deliveryOptionId:'1'
    }]);
    });
    loadFromStorage();
  })
  it('remove an existing product',()=>{
   
    removeFromCart(productId1);
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));
  });

  it('remove not existing product',()=>{
    removeFromCart(productId2);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:1,
      deliveryOptionId:'1'
    }]));
  })
});

describe('test suit :update delivery option',()=>{
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
      }]);
    });
    loadFromStorage();
  });
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML =``;
  })

  it('update delivery option for not existing product',()=>{
    updatDeliveryOption(productId2,'2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })
  it('update delivery option for not existing deliveryID',()=>{
    updatDeliveryOption(productId1,'4');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })
});



