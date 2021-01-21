const RequestModel = require('./request');

const createRandomChatRequest = async ({ userSend }) => {
    const request = await RequestModel.create({ type: 'random-chat', userSend, userReceive: 'none', status: 'waiting' });
    return request;
}

const findRandomChatRequest = async () => {
    const foundRequest = await RequestModel.find({ type: 'random-chat' }).lean();
    return foundRequest;
}

const checkRandomChatRequest = ({ id }) => {
    const foundRequest = await RequestModel.find({ _id: id }).lean();
    if (!foundRequest) return true;
    return false;
}

const deleteRequest = async ({ id }) => {
    await RequestModel.deleteOne({ _id: id });
}

module.exports = {
    createRandomChatRequest,
    findRandomChatRequest,
    deleteRequest
}