function forEslint() {
  console.log('Cause eslint check');
}

function formatDate(date) {
  const monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + ' de ' + monthNames[monthIndex] + ', ' + year;
}

export { formatDate, forEslint };
