const formatMoney = {};

function changeFormatMoney(money) {
  const val = (money / 1).toFixed(2).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

formatMoney.install = function (Vue) {
  Vue.filter('format-money', (money) => {
    if (money) {
      return changeFormatMoney(money);
    }

    return '';
  });
};

export default formatMoney;
