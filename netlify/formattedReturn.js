exports.handler = (status, obj) => ({
  statusCode: status,
  body: JSON.stringify(obj),
});
