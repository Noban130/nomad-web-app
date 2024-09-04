import React, { useState } from "react";
import "./Calendrie.css";
import { useContextApi } from "../api/ContextApi";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendrie = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const [month, setMonth] = useState(currDate.getMonth());
  const [year, setYear] = useState(currDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState("");
  let state = useContextApi();
  let [darkMode, setDarkMode] = state.DarkMode;
  const [showMonthList, setShowMonthList] = useState(false);

  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  // Returns
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };

  const generateCalendarDays = () => {
    const daysOfMonth = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay + daysOfMonth[month]; i++) {
      days.push(i >= firstDay ? i - firstDay + 1 : null);
    }

    return days;
  };

  const days = generateCalendarDays();

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);
  const handleMonthClick = (index) => {
    setMonth(index);
    setShowMonthList(false);
  };
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  return (
    <div className={`calendar `}>
      <div className="calendar-header">
        <span
          className={`month-picker ${darkMode ? "dark-monthpicker" : ""}`}
          onClick={() => setShowMonthList(true)}
        >
          {monthNames[month]}
        </span>
        <div className={`year-picker ${darkMode ? "dark-year-picker" : ""}`}>
          <span className="year-change" onClick={handlePrevYear}>
            <pre>&lt;</pre>
          </span>
          <span id="year">{year}</span>
          <span className="year-change" onClick={handleNextYear}>
            <pre>&gt;</pre>
          </span>
        </div>
      </div>
      <div
        className={`calendar-week-day ${
          darkMode ? "dark-calendar-week-day" : ""
        }`}
      >
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className={`calendar-days ${darkMode ? "dark-calendar-days" : ""}`}>
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)} // Add onClick event to handle day click
            className={`calendar-day ${
              day === selectedDay ? "curr-date" : ""
            } ${darkMode ? "dark-calendar-day" : ""}`}
          >
            {day && (
              <>
                {day}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={`month-list ${showMonthList ? "show" : ""}`}>
        {monthNames.map((name, index) => (
          <div key={index} onClick={() => handleMonthClick(index)}>
            <div>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendrie;