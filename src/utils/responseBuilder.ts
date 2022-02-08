const responseBuilder = (data: any = [], error: string = '') => ({
  status: error ? 'OK' : 'ERROR',
  error,
  data,
});

export default responseBuilder;
