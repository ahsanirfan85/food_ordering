
// Generate random order number 8 characters
const generateOrderNumber = () => {
    return Math.random().toString(20).substr(2, 8);
  };

// Generate random time between 10 to 60 minutes.
const estimatedPrepTime = () => {
    return Math.floor(Math.random() * 50) + 10;
;}

$(document).ready(function () {
        const orderNumber = generateOrderNumber();
        $('#orderNumber').text(orderNumber);
        const estimatedTime = estimatedPrepTime();
        $('#estimatedTime').text(`${estimatedTime} Minutes`);
});