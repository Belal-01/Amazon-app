import { formatCurrancy } from "../../../scripts/Utils/money.js";

describe('test suit : format currancy',()=>{
  it ('convert cents into dollars',()=>{
    expect(formatCurrancy(2095)).toEqual('20.95');
  });
  it ('works with 0',()=>{
    expect(formatCurrancy(0)).toEqual('0.00');
  })
  it ('round to the nearest number',()=>{
    expect (formatCurrancy(2000.5)).toEqual('20.01');
  });
  it ('round to the nearest down cent',()=>{
    expect(formatCurrancy(2000.4)).toEqual('20.00');
  })
  it ('work with negative number',()=>{
    expect(formatCurrancy(-2015)).toEqual('-20.15');
  })

})