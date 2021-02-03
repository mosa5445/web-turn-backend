const socketIO = require("socket.io");
const User = require("../models/Users");

class mySocket {
    #server;
    #io;
    #socket;

    init(server) {
        this.#io = socketIO(server, {
            cors: {
                origin: "*",
            },
        });
        this.#io.on("connection", (socket) => {
            this.#socket = socket;
            socket.emit("wellcome", {
                data: {
                    socketId: socket.id,
                },
                timestamps: Date.now(),
            });

            /**
             * this event calculate number of remaning student
             */

            socket.on("setId", async (socketId, userId, callback) => {
                const user = await User.findById(userId);
                user.socketId = socketId;
                await user.save();
                callback({
                    ok: true,
                });
            });
            socket.on("howMany", async (userId, callback) => {
                const user = await User.findById(userId);
                const remainCount = await User.countDocuments({
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

    async sendStatistics() {
        const user = await User.findById(userId);
        const remainCount = await User.countDocuments({
            createdAt: { $lt: user.createdAt || 0 },
            status: 0,
        });

        this.#socket.emit("update", {
            data: remainCount,
            timestamps: Date.now(),
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
            this.#socket.emit(`${event}`, {
                data,
                timestamps: Date.now(),
            });
        else {
            this.#io.to(`${to}`).emit(`${event}`, {
                data,
                timestamps: Date.now(),
            });
        }
    }
}

const singleton = new mySocket();
module.exports = singleton;
