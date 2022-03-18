const messageMapper = (messageRow) => {
    return {
        messageId: messageRow['MessageId'],
        pseudo: messageRow['Pseudo'],
        content: messageRow['Content'],
        createDate: messageRow['CreateDate']
    };
};

module.exports = {
    messageMapper
};