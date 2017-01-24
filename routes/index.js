var express = require('express');
var router = express.Router();
var pg = require('pg');



router.get('/initdb', function (req, res, next) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return next(err);
    }

    client.query(`CREATE TABLE Students(id SERIAL PRIMARY KEY,
                                        firstName TEXT NOT NULL,
                                        lastName TEXT NOT NULL,
                                        email TEXT NOT NULL)`,

      /*callback*/
      function (err, result) {
        done();
        if (err) {
          return next(err);
        }

        res.render('index', {
          title: "DB Initialized!"
        });
      }
    );
  });
});

router.get('/addStudent', function (req, res, next) {

});


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;