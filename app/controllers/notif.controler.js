const User = require("../models/Users");
const socket = require("../socket/index");

exports.handle = async (req, res) => {
    try {
        const { oldStuNumber, newStuNumber, link } = req.body;
        if (!oldStuNumber || newStuNumber) {
            const Err = new Error("invalid input");
            Err.status = 400;
            Err.userMSG = "شماره دانشجویی ها رو وارد نکردید";
            next(Err);
            return;
        }

        const oldStudent = await User.findOne({ stuNumber: oldStuNumber });
        if (!oldStudent) {
            const Err = new Error("invalid oldStudent");
            Err.status = 400;
            Err.userMSG = "شماره دانشجویی ها  درست نیست ";
            next(Err);
            return;
        }
        if (!oldStudent) {
            const Err = new Error("invalid oldStudent");
            Err.status = 400;
            Err.userMSG = "شماره دانشجویی ها  درست نیست ";
            next(Err);
            return;
        }
        const newStudent = await User.findOne({ stuNumber: newStuNumber });
        if (!newStudent) {
            const Err = new Error("invalid newStudent");
            Err.status = 400;
            Err.userMSG = "شماره دانشجویی ها  درست نیست ";
            next(Err);
            return;
        }

        socket.sendMessage("by", {
            data: {
                msg: `${oldStudent.name} عزیز ، دمت گرم - خوش خرم باشی :)`,
            },
            timestamps: Date.now(),
        });

        socket.sendMessage("hi", {
            data: {
                msg: `${newStudent.name} گل - نوبت شماست لطفا از طریق لینک زیر وارد محیط امتحان بشین`,
                link,
            },
            timestamps: Date.now(),
        });

        return res.json({
            status: 200,
            message: "نوتیف برای دانشجوی جدید ارسال شد",
            data: null,
            timestamps: Date.now(),
        });
    } catch (err) {
        const Err = new Error(err);
        Err.status = 500;
        Err.userMSG = "خطایی رخ داده";
        next(Err);
        return;
    }
};
