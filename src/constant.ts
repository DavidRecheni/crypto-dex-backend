const ERROR_CODES = {
  Auth: {
    unauthorized: 'The user is not authorized',
  },
  User: {
    InvalidFormat: 'UserID is not in the correct format.',
    NotFound: 'User was not found.',
    UsernameError: 'Unable to search with specified username.',
    ErrorUserList: 'Unable to retrieve Users lists.',
    UnableToCreate: 'Unable to create user.',
    AlreadyExists: 'User with same email, wallet or username already exists.',
    InvalidSignature: 'Invalid message signature',
  },
  Wallet: {
    NotFound: 'Wallet with the specified address was not found.',
    UnableToCreate: 'Unable to create Wallet.',
  },
  Catalog: {
    NotFound: 'Catalog not found.',
  },
};

export default ERROR_CODES;
