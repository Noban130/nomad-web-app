import Dates from "./Dates";

function calculateAge(day, monthString, year) {
    let month = Dates.month.indexOf(monthString)

    const today = new Date();
    const birthDate = new Date(year, month, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    
    // Check if the birthday has already occurred this year
    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
        age -= 1;
    }
    
    return { age, birthDate };
}

function getDaysInMonth(monthString, year) {
    let month = Dates.month.indexOf(monthString)
    // List of days in each month (considering leap years)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    // Adjust February for leap years
    if (month === 1 && isLeapYear(year)) {
      return 29;
    }

    return daysInMonth[month];
}
  
function isLeapYear(year) {
    // Leap year is divisible by 4 but not divisible by 100, except if it's divisible by 400
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export {
    calculateAge,
    getDaysInMonth,
    isLeapYear,
}