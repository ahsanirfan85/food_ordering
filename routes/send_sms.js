const express = require("express");
const {
  ModelBuildPage,
} = require("twilio/lib/rest/autopilot/v1/assistant/modelBuild");
const router = express.Router();
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid =
  /* process.env.TWILIO_ACCOUNT_SID; */ "ACc83bfb945f946767f39b1cf03631aabe";
const authToken =
  /* process.env.TWILIO_AUTH_TOKEN; */ "138b4351f25c83ff7f3fa8c8cca1fd59";
const client = require("twilio")(accountSid, authToken);

module.exports = () => {
  router.post("/", (req, res) => {
    client.messages
      .create({
        body: "New order received!",
        from: "+12896701859",
        to: "+15879992749",
      })
      .then((message) => console.log(message.sid));
    client.messages
      .create({
        body: "Your order has been confirmed!",
        from: "+12896701859",
        to: "+15879992749",
      })
      .then((message) => console.log(message.sid));
  });
  return router;
};
