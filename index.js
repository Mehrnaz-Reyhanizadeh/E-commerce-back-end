const express = require("express");
const app = express();
const router = require("./src/routes");

require("./startup/config")(app, express);

require("./startup/db")();

require("./startup/logging")();

// const p = Promise.reject(new Error("promis error"));
// p.then(() => console.log("done"));

// throw new Error("error outside");

app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listining on port ${port}`));
