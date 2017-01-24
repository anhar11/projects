var express = require('express');
var router = express.Router();
var pg = require('pg');

//callback(err, result)
function query(SQL, args, callback) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return callback(err);
    }
    client.query(SQL, args,
      /*callback*/
      function (err, result) {
        done();
        if (err) {
          return callback(err);
        }
        return callback(err, result);
      }
    );
  });
}


router.get('/students', function (req, res, next) {
  var SQL = "SELECT * FROM Students";
  query(SQL, [], function (err, result) {
    if (err)
      return next(err);
    res.render('students', {
      students: result.rows,
      title: "Students Page"
    })
  });

})

router.post('/addStudent', function (req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var SQL = "INSERT INTO Students(firstName, lastName, email) VALUES($1, $2, $3)";
  query(SQL, [firstName, lastName, email], function (err, result) {
    if (err)
      return next(err);
    res.render('addStudent', {
      title: "Added!"
    })
  })
});


router.get('/addStudent', function (req, res, next) {
  res.render('addStudent', {
    title: "Add Student"
  });
});


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;