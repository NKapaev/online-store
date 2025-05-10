export function watchingError(error) {
  return error ? <p className="inputError">{error}</p> : null;
}

export function orderDateGenerator(date) {
  const orderDate = date.split(" ");
  const day = orderDate.slice(2, 3);
  const month = orderDate.slice(1, 2);
  const year = orderDate.slice(3, 4);
  return {
    orderDay: day,
    orderMonth: month,
    orderYear: year,
  };
}

export function calcTotalPrice(arr) {
  let total = 0;
  arr.map((item) => {
    total += item.price * item.counter;
  });
  return total.toFixed(2);
}

export function calcTotalProductsQuantity(arr) {
  return arr.reduce((total, item) => total + item.counter, 0);
}
