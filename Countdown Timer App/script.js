function countDown() {
  let date = Date.parse("1 Jan 2022");
  let now = Date.now();

  // get countdown value
  // seconds
  let timeInSeconds =
    new Date(date - now).getSeconds() < 10
      ? `0${new Date(date - now).getSeconds()}`
      : new Date(date - now).getSeconds();
  // minutes
  let timeInMinutes =
    new Date(date - now).getMinutes() < 10
      ? `0${new Date(date - now).getMinutes()}`
      : new Date(date - now).getMinutes();
  // hours
  let timeInHours =
    new Date(date - now).getHours() < 10
      ? `0${new Date(date - now).getHours()}`
      : new Date(date - now).getHours();
  // days
  let timeInDays =
    new Date(date - now).getDay() < 10
      ? `0${new Date(date - now).getDay()}`
      : new Date(date - now).getDay();
  // months
  let timeInMonths =
    new Date(date - now).getMonth() < 10
      ? `0${new Date(date - now).getMonth()}`
      : new Date(date - now).getMonth();

  //   get html dom
  //   seconds dom
  let seconds = document.getElementById("seconds");
  //   minutes dom
  let minutes = document.getElementById("minutes");
  //   hours dom
  let hours = document.getElementById("hours");
  //   days dom
  let days = document.getElementById("days");
  //   months dom
  let months = document.getElementById("months");

  //   set countdown value into html dom
  // seconds container
  seconds.innerHTML = timeInSeconds;
  //   minutes container
  minutes.innerHTML = timeInMinutes;
  //   hours container
  hours.innerHTML = timeInHours;
  //   days container
  days.innerHTML = timeInDays;
  //   months container
  months.innerHTML = timeInMonths;
}

countDown();

setInterval(countDown, 1000);
