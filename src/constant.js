const CONSTANT = {
    ERRORCODE: {
        USER : {
            INVALIDFORMAT: 'UserID is not in the correct format.',
            NOTFOUND: 'User was not found.',
            USERNAMEERROR: 'Unable to search with specified username.',
            ERRORUSERLIST: 'Unable to retrieve Users lists.',
            UNABLETOCREATE: 'Unable to create user.'
        }
    }
};

module.exports = Object.freeze(CONSTANT);