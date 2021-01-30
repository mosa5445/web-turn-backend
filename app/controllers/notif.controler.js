const User = require("../models/Users");
const socket = require("../socket/index");

exports.handle = async (req, res, next) => {
    try {
        const {
            oldStuNumber,
            newStuNumber,
            link,
            ignoreOld,
            password,
        } = req.body;
        if (password !== "webcactus.com5445") return;
        if ((!oldStuNumber && ignoreOld == "false") || !newStuNumber) {
            const Err = new Error("invalid input");
            Err.status = 400;
            Err.userMSG = "شماره دانشجویی ها رو وارد نکردید";
            next(Err);
            return;
        }

        let oldStudent;
        if (ignoreOld == "false") {
            oldStudent = await User.findOne({ stuNumber: oldStuNumber });
            if (!oldStudent) {
                const Err = new Error("invalid oldStudent");
                Err.status = 400;
                Err.userMSG = "شماره دانشجویی ها  درست نیست ";
                next(Err);
                return;
            }
            oldStudent.status = 1;
            await oldStudent.save();
        }

        const newStudent = await User.findOne({ stuNumber: newStuNumber });
        if (!newStudent) {
            const Err = new Error("invalid newStudent");
            Err.status = 400;
            Err.userMSG = "شماره دانشجویی ها  درست نیست ";
            next(Err);
            return;
        }

        if (ignoreOld == "false") {
            socket.sendMessage(
                "by",
                {
                    data: {
                        msg: `${oldStudent.name} عزیز ، دمت گرم - خوش خرم باشی :)`,
                    },
                    timestamps: Date.now(),
                },
                oldStudent.socketId,
            );
        }

        socket.sendMessage(
            "hi",
            {
                data: {
                    msg: `${newStudent.name} گل - نوبت شماست لطفا از طریق لینک زیر وارد محیط امتحان بشین`,
                    link,
                },
                timestamps: Date.now(),
            },
            newStudent.socketId,
        );

        socket.sendMessage("haha", {
            data: null,
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
