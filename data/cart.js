import { getDeliveryOption } from "./deliveryObtions.js";
export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart= JSON.parse(localStorage.getItem('cart'))||[{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryOptionId :'1'
  },{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId:'2'
  }];
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,quantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;

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

    saveToStorage(); 
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=> {
    if(productId!==cartItem.productId){
      newCart.push(cartItem);
    }

  });
  cart = newCart;
  saveToStorage();

}
export function calculateTheQuantity(){
  let cartQuantity=0;
  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
  });
  return cartQuantity;
}

export function updatQuantity(productId,newQuantity){
  let matchingItem ;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem = cartItem;
     console.log(cartItem.quantity) ;
    }
  });
  matchingItem.quantity=newQuantity;

  saveToStorage();
}
export function updatDeliveryOption(productId,deliveryOptionId){
  let matchingItem;

  if(getDeliveryOption(deliveryOptionId)===null)
    return null;

  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;

    }});
    if(matchingItem){
      matchingItem.deliveryOptionId= deliveryOptionId;
      saveToStorage();
    }else
      return;

   
}