function getDate(date) {
  let data = new Date(date)
  let dia  = data.getDate()
  if (dia < 10)
      dia  = "0" + dia

  let mes  = data.getMonth() + 1
  if (mes < 10) 
      mes  = "0" + mes

  let ano  = data.getFullYear()
  return ( dia + "/" + mes + "/" + ano)
}

export default getDate