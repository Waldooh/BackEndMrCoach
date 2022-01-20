const jwt = require("jsonwebtoken");

const sign = async (payload) => {
  const secret = process.env.SECRET;
  return await jwt.sign(payload, secret, {expiresIn: "7d"});
};

const verify = async (token) => {
  const secret = process.env.SECRET;

  try {
    return await jwt.verify(token, secret);
  } catch (error) {
    console.log("Invalid Token")
  }
};

module.exports = {
  sign,
  verify,
};