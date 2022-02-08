const responseBuilder = (data: any = [], error: string = '') => ({
  status: error ? 'Error' : 'Ok',
  error: error,
  data: data,
});

export default responseBuilder;
