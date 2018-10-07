var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/users/dashboard');
});

router.get('/dashboard', function(req, res, next) {
  res.send('Client users dashboard');
});
module.exports = router;
