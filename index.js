const express = require("express");
const cors = require('cors');
const app = express();
const port = 8000;
const db = require("./lib/db");
const apiRouter = require("./routes");


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Hello Mrs. !</h1>");
});

apiRouter(app);

app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`);
    db.connect().then(() => {
        console.log("DB Connect");
    }).catch((err) => {
        console.error("Connection error", err);
    });
});