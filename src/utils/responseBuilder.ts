const responseBuilder = ({ data = [], error = '' }) => ({
  status: error.length ? 'Error' : 'Ok',
  error,
  data,
});

export default responseBuilder;
