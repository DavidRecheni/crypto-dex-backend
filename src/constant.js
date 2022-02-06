let Constant = {
    ErrorCode: {
        User : {
            InvalidFormat: 'UserID is not in the correct format.',
            NotFound: 'User was not found.',
            UsernameError: 'Unable to search with specified username.',
            ErrorUserList: 'Unable to retrieve Users lists.',
            UnableToCreate: 'Unable to create user.'
        }
    }
};

module.exports = Object.freeze(Constant);