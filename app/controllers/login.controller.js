const User = require("../models/Users");
const jwt = require("json-web-token");
const socket = require("../socket/index");

exports.handle = async (req, res, next) => {
    try {
        const { stuNumber } = req.body;
        if (!stuNumber) {
            const Err = new Error("invalid input");
            Err.status = 400;
            Err.userMSG = "خطا در ورود ";
            next(Err);
            return;
        }

        const user = await User.findOne({ stuNumber: parseInt(stuNumber) });
        console.log(user);
        if (!user) {
            const Err = new Error("invalid input");
            Err.status = 401;
            Err.userMSG = "کاربر قبلا ثبت نام نشده";
            next(Err);
            return;
        }

        res.json({
            status: 200,
            error: null,
            message: " ورود انجام شد",
            data: {
                user,
            },
        });
    } catch (err) {
        const Err = new Error(err);
        Err.status = 500;
        Err.userMSG = "خطایی رخ داده";
        next(Err);
        return;
    }
};
