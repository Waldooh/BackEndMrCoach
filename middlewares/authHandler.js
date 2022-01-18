const jwt = require("../lib/jwt");


const authHandler = (req, res, next) => {
  try {
    const { authentication: token } = req.headers
    const decodedToken = jwt.verify(token)
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