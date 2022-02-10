const express = require("express");
const path = require("path");
const cors = require("cors");
const { PORT } = require("./config");
const router = require("./routes/routes");
const { SIGN } = require("./utils/jwt");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "/uploads")));

app.use(router);

app.listen(PORT || 1001, console.log(`app run on port ${PORT || 1002}`));
console.log(SIGN({adminId:'a8abaf58-9cbc-41c7-a45c-72c6b5a26258',isSuper:true}))