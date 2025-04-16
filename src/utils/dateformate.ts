// Utility function to format date using Moment.js
export const dateFormate = date => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [day, month, year].join('/');
};
export const dateForMateWithTime = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear(); // Full year
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
};
