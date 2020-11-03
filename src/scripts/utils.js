function getDate(date) {
  let data = new Date(date);
  let dia = data.getDate();
  if (dia < 10)
    dia = "0" + dia;

  let mes = data.getMonth() + 1;
  if (mes < 10)
    mes = "0" + mes;

  let ano = data.getFullYear();
  return (dia + "/" + mes + "/" + ano);
}

function cutLegend(legend, range = 25, showExt = false) {
  if (legend.length < range) return legend;

  return `${legend.substr(0, range - 5)}...${showExt ? legend.split('.').pop() :''}`;
}

const verifyCapsLock = (event) => event.getModifierState("CapsLock") ? true : false;

function capitalize(text) {
  return text.trim().toLowerCase().split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
}

module.exports = { getDate, verifyCapsLock, cutLegend, capitalize };