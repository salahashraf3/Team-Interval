const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(express.static(path.join(__dirname, "public")));

const route = require("./routes/route");
app.use("/", route);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
  