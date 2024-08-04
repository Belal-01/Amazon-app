import {Products,Clothing} from "../../../data/products.js";

describe('test suit: Products class',()=>{

    let product = new Products( {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    });
 
 
  

  it ('test the constructer',()=>{
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    
  });
  it ('test extraInfo function',()=>{
    expect(product.extraInfoHtml()).toEqual('');
   
  });


});

describe('test suit :Clothing class',()=>{
  let clothes = new Clothing( {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });

  it ('test size chart property',()=>{
    expect(clothes.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });

  it('test extraInfoHtml',()=>{
    expect(clothes.extraInfoHtml()).toEqual(`<a href = "${clothes.sizeChartLink}" target =" _blank">Size chart</a>`)
  })
})