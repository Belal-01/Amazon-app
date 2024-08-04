import { getDeliveryOption } from "./deliveryObtions.js";


class Cart{
   cartItem ;
   #localStorageKey ;

   constructor(localStorageKey){
    this.#localStorageKey =localStorageKey;
    this.loadFromStorage();
   }


   loadFromStorage(){
    this.cartItem= JSON.parse(localStorage.getItem(this.#localStorageKey))||[{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
      deliveryOptionId :'1'
    },{
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
      deliveryOptionId:'2'
    }];
   };
  
   saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem));
  };
  
   addToCart(productId,quantity){
    let matchingItem;
    this.cartItem.forEach((cartElemnt)=>{
      if(productId===cartElemnt.productId){
        matchingItem=cartElemnt;
  
      }});
      if(matchingItem){
        matchingItem.quantity+=quantity;
      }else{
        cart.push({ 
          productId,
          quantity,
          deliveryOptionId:'1'
        });
      }
  
    this.saveToStorage(); 
  };
  
   removeFromCart(productId){
    const newCart = [];
  
    this.cartItem.forEach((cartElement)=> {
      if(productId!==cartElement.productId){
        newCart.push(cartElement);
      }
  
    });
    this.cartItem = newCart;
    saveToStorage();
  
  };
   calculateTheQuantity(){
    let cartQuantity=0;
    this.cartItem.forEach((cartElement)=>{
      cartQuantity+=cartElement.quantity;
    });
    return cartQuantity;
  };
  
   updatQuantity(productId,newQuantity){
    let matchingItem ;
    this.cartItem.forEach((cartElement)=>{
      if(productId===cartElement.productId){
        matchingItem = cartElement;
       console.log(cartElement.quantity) ;
      }
    });
    matchingItem.quantity=newQuantity;
  
    this.saveToStorage();
  };
   updatDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
  
    if(getDeliveryOption(deliveryOptionId)===null)
      return null;
  
    this.cartItem.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem=cartItem;
  
      }});
      if(matchingItem){
        matchingItem.deliveryOptionId= deliveryOptionId;
        this.saveToStorage();
      }else
        return;
  
     
  }

}



let cart = new Cart('cart-oop');
let bussniseCart = new Cart('cart-bussnise');



console.log(cart);
console.log(bussniseCart);

