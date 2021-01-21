const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
    {
        type: {
            required: true,
            type: String
        },
        userSend: {
            required: true,
            type: String
        },
        userReceive: {
            required: true,
            type: String
        },
        status: {
            required: true,
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Request', RequestSchema);