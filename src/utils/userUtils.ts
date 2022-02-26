const userUtils = {
  validUserId: (userId: string) => userId.length < 25,
  // TODO: define hit type
  mapHit: (hit: any) => ({ username: hit._source.username, userId: hit._source.userId }),
  mapUserFind: (userBody: any) => ({
    username: { $regex: `.*${userBody?.query?.username || ''}.*`, $options: 'i' },
    name: { $regex: `.*${userBody?.query?.name || ''}.*`, $options: 'i' },
    wallet: { $regex: `.*${userBody?.query?.wallet || ''}.*` },
  }),
  validateSignature: (signature: string) => signature.length < 500,
};

export default userUtils;
