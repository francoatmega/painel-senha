
const getWeekDay = (numberDay) => {
  if (numberDay < 0 || numberDay > 6) throw new Error('Dia inválido!')
  const daysWeek = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
  return daysWeek[numberDay]
}

const getDateDiffInDays = (finalDate, initialDate) => {
  return (new Date(finalDate) - new Date(initialDate)) / (1000 * 3600 * 24)
}

const getDaysOnRange = (initialDate, finalDate) => {
  const daysOnRange = []
  const diferenceInDays = getDateDiffInDays(finalDate, initialDate) + 1
  var dateweek = new Date(`${initialDate} 00:00:00`)
  for (let index = 0; index < diferenceInDays; index++) {
    daysOnRange.push(dateweek.getDay())
    dateweek.setDate(dateweek.getDate() + 1)
  }
  return daysOnRange
}

const jointDiference = (setA, setB) => {
  var _diference = new Set(setA)
  for (var elem of setB) {
    _diference.delete(elem)
  }
  return _diference
}

module.exports = {
  getWeekDay,
  getDateDiffInDays,
  getDaysOnRange,
  jointDiference
}
