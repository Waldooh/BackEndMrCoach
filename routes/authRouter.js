const express = require("express");
const jwt = require("../lib/jwt");
const users = require("../usecases/users");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await users.getByUsername(userName);
    const match = await users.authenticate(username);

    if(match) {
        const payload = {
            sub: user._id,
            role: user.account
        };

        const token = jwt.sign(payload);

        res.status(200).json({
            ok: true,
            message: "Sign in successfully",
            payload: {
                token,
            }
        });
    } else {
        res.status(401).json({
            ok: false,
            message: "Password didn't match"
        });
    }
});