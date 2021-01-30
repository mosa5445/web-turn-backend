const User = require("../models/Users");
const jwt = require("json-web-token");
const socket = require("../socket/index");

exports.handle = async (req, res) => {
    try {
        const { stuNumber, socketId } = req.body;
        if (stuNumber) {
            const Err = new Error("invalid input");
            Err.status = 400;
            Err.userMSG = "خطا در ورود ";
            next(Err);
            return;
        }

        const user = await User.findOne({ stuNumber });

        if (!user) {
            const Err = new Error("invalid input");
            Err.status = 401;
            Err.userMSG = "کاربر قبلا ثبت نام نشده";
            next(Err);
            return;
        }

        user.socketId = socketId;

        await user.save();

        res.json({
            status: 200,
            error: null,
            message: " ورود انجام شد",
            data: {
                user,
            },
        });

        const remainCount = await User.count({
            createdAt: { $lt: user.createdAt },
            status: 0,
        });

        socket.sendMessage("howMany", remainCount, socketId);
    } catch (err) {
        const Err = new Error(err);
        Err.status = 500;
        Err.userMSG = "خطایی رخ داده";
        next(Err);
        return;
    }
};
