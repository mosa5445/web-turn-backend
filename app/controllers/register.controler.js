const User = require("../models/Users");

exports.handle = async (req, res, next) => {
    try {
        return res.status(400).json({
            status: 400,
            error: "مدت ثبت نام به پایان رسیده",
            message: "مدت ثبت نام به پایان رسیده",
            data: null,
        });
        // const { gender, stuNumber, name } = req.body;
        // if (!gender || !stuNumber || !name) {
        //     const Err = new Error("invalid input");
        //     Err.status = 400;
        //     Err.userMSG = "خطا در ثبت نام";
        //     next(Err);
        //     return;
        // }

        // const duplicate = await User.findOne({ stuNumber });
        // if (duplicate) {
        //     const Err = new Error("invalid input");
        //     Err.status = 400;
        //     Err.userMSG = "قبلا ثبت نام شده";
        //     next(Err);
        //     return;
        // }

        // const user = await User.create({
        //     gender,
        //     stuNumber,
        //     name,
        // });

        // return res.json({
        //     status: 200,
        //     error: null,
        //     message: "ثبت نام انجام شد",
        //     data: {
        //         user,
        //     },
        // });
    } catch (err) {
        const Err = new Error(err);
        Err.status = 500;
        Err.userMSG = "خطایی رخ داده";
        next(Err);
        return;
    }
};
