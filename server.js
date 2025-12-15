const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use("/project", express.static("project"));

app.listen(3000, () => {
    console.log("Server running on http://127.0.0.1:3000");
});
