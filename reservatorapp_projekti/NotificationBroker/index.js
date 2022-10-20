const httpPort = 9090;
const socketIOport = 9004;

const express = require("express");
const app = express();
const http = require("http");
//const http = require('http').Server(app);

const server = http.createServer(app);

// These line below work perfectly!
const socketServer = require("socket.io")(socketIOport);
socketServer.on("connection", (socket) => {
  console.log("Client connected");
  socketServer.emit("connected_to_notification_broker", {
    calendarUserId: "foobar",
  });

  socket.on("client_connected", (raw_data) => {
    console.log(raw_data);
  });
});

app.get("/", async function (req, res) {
  console.log("Notification received", res);

  res.send("Notification endpoint");
});

app.post("/notify/:calendarUserId", async function (req, res) {
  // If there is a validationToken parameter
  // in the query string, this is the endpoint validation
  // request sent by Microsoft Graph. Return the token
  // as plain text with a 200 response
  // https://docs.microsoft.com/graph/webhooks#notification-endpoint-validation
  if (req.query && req.query.validationToken) {
    if (req.params.calendarUserId) {
      console.log("New subscription created for", req.params.calendarUserId);
    }
    res.set("Content-Type", "text/plain");
    res.send(req.query.validationToken);
    return;
  }

  if (req.params.calendarUserId) {
    console.log("New notification created for", req.params.calendarUserId);
  }

  console.log(JSON.stringify(req.body, null, 2));

  // Check for validation tokens, validate them if present
  let areTokensValid = true;
  if (req.body && req.body.validationTokens) {
    const appId = process.env.OAUTH_CLIENT_ID;
    const tenantId = process.env.OAUTH_TENANT_ID;
    const validationResults = await Promise.all(
      req.body.validationTokens.map((token) =>
        tokenHelper.isTokenValid(token, appId, tenantId)
      )
    );

    areTokensValid = validationResults.reduce((x, y) => x && y);
  }

  if (req.body && areTokensValid) {
    for (let i = 0; i < req.body.value.length; i++) {
      const notification = req.body.value[i];

      // Verify the client state matches the expected value
      if (notification.clientState == process.env.SUBSCRIPTION_CLIENT_STATE) {
        // Verify we have a matching subscription record in the database
        const subscription = await dbHelper.getSubscription(
          notification.subscriptionId
        );
        if (subscription) {
          // If notification has encrypted content, process that
          if (notification.encryptedContent) {
            processEncryptedNotification(notification);
          } else {
            await processNotification(
              notification,
              req.app.locals.msalClient,
              subscription.userAccountId
            );
          }
        }
      }
    }
  }

  socketServer.emit("calendar_changed", {
    calendarUserId: req.params.calendarUserId,
  });

  res.status(202).end();
});

//const io = require('socket.io')(http);

/*
io.on('connection', (socket) => {
    console.log('New client connected.');

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

http.listen(httpPort, 'localhost', () => console.log('Listening'));
*/

app.listen(httpPort, () => {
  console.log(`Example app listening on port ${httpPort}`);
});
