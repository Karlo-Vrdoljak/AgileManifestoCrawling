import express from "express";
import * as fs from "fs";

import cache from "./cache";

const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;

app.get("/data", (_, res) => {
  // Look for the JSON file
  fs.readFile("data.json", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        cache();
      } else throw err;
    }

    res.json(JSON.parse(data.toString()));
  });
});

app.listen(port, () =>
  console.log("> Server is up and running at: http://localhost:" + port)
);

export default app;
