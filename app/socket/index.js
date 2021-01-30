const socket = require("socket.io");
const User = require("../models/Users");

class mySocket {
    #server;
    #io;

    init(server) {
        this.#io = socket(server);
        this.#io.on("connection", (socket) => {
            socket.emit("/wellcome", {
                data: {
                    socketId: socket.id,
                },
                timestamps: Date.now(),
            });

            /**
             * this event calculate number of remaning student
             */
            socket.on("howMany", async (userId) => {
                const user = await User.findById(userId);
                const remainCount = await User.count({
                    createdAt: { $lt: user.createdAt || 0 },
                    status: 0,
                });
                callback({
                    data: {
                        remainCount,
                    },
                    timestamps: Date.now(),
                });
            });
        });
    }

    /**
     *
     * @param {string} event
     * @param {string} data
     * @param {string} to
     */
    sendMessage(event, data, to) {
        if (!to)
            this.#io.emmit(`${event}`, {
                data,
                timestamps: Date.now(),
            });
        else {
            socket.to(`${to}`).emit(`${event}`, {
                data,
                timestamps: Date.now(),
            });
        }
    }
}

const singleton = new mySocket();
module.exports = singleton;
