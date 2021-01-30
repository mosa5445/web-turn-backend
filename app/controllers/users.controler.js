const User = require("../models/Users");

exports.handle = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        return res.json({
            status: 200,
            error: null,
            message: "لیست کاربر ها به ترتیب ثبت نام",
            data: {
                users,
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
