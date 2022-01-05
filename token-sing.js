const jwt = require("jsonwebtoken");

const secret = "MySecret";
const payload = {
    sub: 1,
    role: "user"
}

const token = jwt.sign(payload, secret);

console.log("Token:", token);