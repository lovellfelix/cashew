'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Employees, app, auth, database) {

  app.get('/employees/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/employees/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/employees/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/employees/example/render', function(req, res, next) {
    Employees.render('index', {
      package: 'employees'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
