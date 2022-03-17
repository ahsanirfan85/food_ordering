const express = require("express");
const {
  ModelBuildPage,
} = require("twilio/lib/rest/autopilot/v1/assistant/modelBuild");
const router = express.Router();
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = () => {
  router.post("/", (req, res) => {
    console.log(req.body.phone);
    console.log(req.body.orderNumber);
    client.messages
      .create({
        body: `New order received! Order #: ${req.body.orderNumber}`,
        from: "+12896701859",
        to: "+15879992749",
      })
      .then((message) => console.log(message.sid));
    client.messages
      .create({
        body: `Your order has been confirmed! Order #: ${req.body.orderNumber}`,
        from: "+12896701859",
        to: req.body.phone,
      })
      .then((message) => console.log(message.sid));
  });
  return router;
};
