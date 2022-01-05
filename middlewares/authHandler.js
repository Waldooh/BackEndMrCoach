const authHandler = (req, res, next) => {
    const { auth } = req.body;
    if (auth) {
        next(req);
    } else {
        res.status(403).json({
            ok: false,
            message: "Unauthorized",
        });
    }
};

module.exports = authHandler;