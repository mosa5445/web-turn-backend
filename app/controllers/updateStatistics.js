const socket = require("../socket/index");

exports.handle = async (req, res, next) => {
    try {
        if (req.body.password !== "webcactus.com5445") return;

        socket.sendStatistics();
    } catch (err) {
        const Err = new Error(err);
        Err.status = 500;
        Err.userMSG = "خطایی رخ داده";
        next(Err);
        return;
    }
};
