const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const app = express();
app.use(bodyParser.json({}));
app.use(cors());
app.use(morgan("tiny"));

const clientId = process.env.SLACK_ID;
const clientSecret = process.env.SLACK_SECRET;

app.get("/", (req, res) => {res.send("Its alive")});

let token = "";

app.get("/authToken", async (req, res) => {
  if (!req.query.code) {res.status(500).send("No code provided")};
  const code = req.query.code;
  const tokenReq = await axios.get("https://slack.com/api/oauth.access", {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    params: {
      "client_id": clientId,
      "client_secret": clientSecret,
      "code": code,
      "redirect_uri": "http://localhost:1211/authToken"
    }
  });
  token = tokenReq.data.access_token;
  res.redirect("http://localhost:2210");
})

app.get("/listUsers", async(req, res) => {
  const userReq = await axios.get("https://slack.com/api/users.list", {
    params: {
      "token": token
    }
  });
  res.send(userReq.data);
})


app.get("/listReactions/:user", async(req, res) => {
  const user = req.params.user;
  const userReq = await axios.get("https://slack.com/api/reactions.list", {
    params: {
      "token": token,
      "full": true,
      "user": user
    }
  });
  res.send(userReq.data);
})



app.get("/listStars", async(req, res) => {
  const userReq = await axios.get("https://slack.com/api/stars.list", {
    params: {
      "token": token
    }
  });
  res.send(userReq.data);
})

const server = app.listen(1211, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Started,", host, port);
})

module.exports = server;