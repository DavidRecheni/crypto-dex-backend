const responseBuilder = ({ data, error = '' }: {data?: any, error?: string}) => ({
  status: error.length ? 'Error' : 'Ok',
  error,
  data,
});

export default responseBuilder;
