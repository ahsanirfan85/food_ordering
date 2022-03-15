const generateOrderNumber = () => {
  return Math.random().toString(20).substr(2, 8);
};
const estimatedPrepTime = () => {
  return Math.floor(Math.random() * 50) + 10;
};

$(document).ready(function () {
  const orderNumber = generateOrderNumber();
  $("#orderNumber").text(orderNumber);
  // const estimatedTime = estimatedPrepTime();
  // $("#estimatedTime").text(`${estimatedTime} Minutes`);
});

$(() => {
  // Set the date we're counting down to
  var countDownDate = new Date("March 15, 2022 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for hours, minutes and seconds
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="countdown-timer"
    document.getElementById("countdown-timer").innerHTML =
      hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown-timer").innerHTML = "EXPIRED";
    }
  }, 1000);
});
