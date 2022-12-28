console.clear()
import moment from 'moment';

let date = moment();

// Set the hour to 8:00 AM
date.set('hour', 15);

// Set the minute to 30
date.set('minute', 30);

console.log(date.format('HH:mm')); // Outputs "08:30 AM"
