
const userUtils = {
validUserId: (userId: string) => userId.length > 25,
mapHit: (hit: any) => ({
    username: hit._source.username,
    userId: hit._source.userId,
  }),
}
export default userUtils

