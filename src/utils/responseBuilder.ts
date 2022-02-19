const responseBuilder = (data: any = [], error: string = '') => ({
  status: error ? 'Error' : 'Ok',
  error,
  data,
});

export default responseBuilder;
