const fetchCategories = require('../fetchCategories');
const formattedReturn = require('../formattedReturn');

exports.handler = (event) => {
  if (event.httpMethod === 'GET') {
    return fetchCategories(event);
  }
  return formattedReturn(405, {});
};
