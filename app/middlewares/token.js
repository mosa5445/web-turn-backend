const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.handle = async (req, res, next) => {
    try {
        const token = req.get("token");
        if (token) {
            jwt.verify(
                token,
                process.env.JSON_WEB_TOKEN_PRIVATE_KEY,
                async (err, decoded) => {
                    if (err && err.name === "TokenExpiredError") {
                        const Err = new Error("Token Expired");
                        Err.status = 401;
                        Err.userMSG = "نیاز به ورود مجدد";
                        next(Err);
                    } else if (err) {
                        const Err = new Error(err.message);
                        Err.status = 401;
                        Err.userMSG = "خطایی رخ داده ، بعدا امتحان کنید";
                        next(Err);
                    } else {
                        const user = await User.findOne({
                            _id: decoded.id,
                        });

                        if (!user) {
                            const Err = new Error("Invalid Token");
                            Err.status = 401;
                            Err.userMSG = "لطفا دوباره وارد شوید";
                            next(Err);
                            return;
                        }
                        req.user = user;
                        next();
                    }
                },
            );
        } else {
            const Err = new Error("Need Token");
            Err.status = 401;
            Err.userMSG = "لطفا وارد شوید";
            next(Err);
            return;
        }
    } catch (err) {
        console.error(
            "Err Location => middlewares/CheckTokenExp handle \n" + err,
        );
        const Err = new Error(err.message);
        Err.status = 400;
        Err.userMSG = "خطایی رخ داده ، بعدا امتحان کنید";
        next(Err);
    }
};
