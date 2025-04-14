export function formatAmount(value: number): string {
  // let numStr = value.toString();
  // let lastThree = numStr.slice(-3);
  // let otherNumbers = numStr.slice(0, -3);
  // if (otherNumbers != '') {
  //   lastThree = ',' + lastThree;
  // }
  // let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  // return result;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
export function formatToUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
