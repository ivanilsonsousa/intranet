function getDate(date) {
  let data = new Date(date)
  let dia = data.getDate()
  if (dia < 10)
    dia = "0" + dia

  let mes = data.getMonth() + 1
  if (mes < 10)
    mes = "0" + mes

  let ano = data.getFullYear()
  return (dia + "/" + mes + "/" + ano)
}

function cutLegend(legend) {
  if (legend.length < 25) return legend;

  return `${legend.substr(0, 20)}...`;
}

function verifyCapsLock(event) { return event.getModifierState("CapsLock") ? true : false }

module.exports = { getDate, verifyCapsLock, cutLegend }