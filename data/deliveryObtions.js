import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
 export const deliveryOptions = [{
  id : '1',
  deliveryDays:7,
  priceCents:0
},
{
  id : '2',
  deliveryDays:3,
  priceCents:499
},
{
  id : '3',
  deliveryDays:1,
  priceCents:999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if (deliveryOptionId===option.id){
      deliveryOption = option;
    }
  })
    if(deliveryOption){
      return deliveryOption;
    }
    else
      return null;
  
}
export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  let deliveryDate = today.add(deliveryOption.deliveryDays,'days');
  
   let checkDate = today.add(deliveryOption.deliveryDays,'days')

  if(deliveryDate.format('dddd')==="Saturday"){
    checkDate = today.add(deliveryOption.deliveryDays+2,'days');
    console.log(checkDate.format('dddd'));
  }
  else if (deliveryDate.format('dddd')==="Monday"){
    checkDate = today.add(deliveryOption.deliveryDays+1,'days');
  }



  return checkDate;
}