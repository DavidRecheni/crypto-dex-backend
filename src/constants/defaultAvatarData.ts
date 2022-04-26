import defaultAvatarImage from '../assets/images/defaultAvatarImage';

const defaultAvatarData = (userId: string) => ({
  userId,
  url: defaultAvatarImage,
});

export default defaultAvatarData;
