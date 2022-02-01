const jwt = require("../lib/jwt");


const authHandler = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers
    const decodedToken = await jwt.verify(token)
    console.log("token", decodedToken);
    if(!decodedToken) throw new Error("Unauthorized!")
    next()
  } catch (error) {
    res.status(403).json({
      ok: false,
      message: "Unauthorized catch!",
    });
  }
}


module.exports = authHandler;