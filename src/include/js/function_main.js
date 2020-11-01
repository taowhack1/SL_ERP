export const sortData = (arrObject) => {
  let copyData = arrObject;
  let temp = [];
  copyData.map((obj, key) => {
    return temp.push({
      ...obj,
      id: key,
      commit: 1,
    });
  });
  return temp;
};

export const sortDataWithoutCommit = (arrObject) => {
  let copyData = arrObject;
  let temp = [];
  copyData.map((obj, key) => {
    return temp.push({
      ...obj,
      id: key,
    });
  });
  return temp;
};

export const getNameById = (id, masterData, masterField, field) => {
  // console.log(id, masterData, masterField, field);
  const data = id && masterData.filter((data) => data[`${masterField}`] === id);
  const data2 = data && { ...data[0] };
  return data2 && data2[`${field}`] ? data2[`${field}`] : "";
};

export const calSubtotal = (qty, price, discount = 0) => {
  let copyQty = qty && qty ? qty : 0;
  let copyPrice = price && price ? price : 0;
  let total = copyQty * copyPrice;
  return total - discount;
};

export const sumArrObj = (arrObj = [], field, vat = 0.07) => {
  let numbers = [];
  arrObj &&
    arrObj.map((line) => {
      numbers.push(line[field]);
    });
  let total = numbers.length
    ? numbers.reduce((prev, current) => prev + current)
    : 0;
  let vat_amount = total * vat;
  let include_vat = total + vat_amount;
  let summary = {
    exclude_vat: total,
    vat: vat_amount,
    include_vat: include_vat,
  };
  return total ? summary : 0;
};

export const sumArrOdjWithField = (arrObj = [], field) => {
  let numbers = [];
  arrObj &&
    arrObj.map((line) => {
      numbers.push(line[field]);
    });
  let total = numbers.length
    ? numbers.reduce((prev, current) => prev + current)
    : 0;
  return total;
};

export const calDiscount = (discount = 0, total_qty = 0, qty = 0) => {
  return (discount / total_qty) * qty;
};
