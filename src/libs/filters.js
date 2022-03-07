// for eslink, 改另一種加千分位的方法
function currency(num) {
  const n = String(num);
  const re = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
  return n.replace(re, '$1,');
}

function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}

export { currency, date };
