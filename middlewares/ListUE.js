// Middleware file for ListUE controller

module.exports.validateResult = function validateResult(req, res) {

  // A changer c'est dégueulasse lol
  const isNotEmptyArray = !res.locals.queryResultArray
    ? false
    : res.locals.queryResultArray > 0
    ? true
    : false;

  if (res.locals.queryResult) {
    res.json(res.locals.queryResult);
  } else if (isNotEmptyArray) {
    res.json(res.locals.queryResultArray);
  } else {
    res.status(404).send({ error: 'No results' });
  }
};
