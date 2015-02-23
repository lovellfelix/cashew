'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Employees = new Module('employees');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Employees.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Employees.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Employees.menus.add({
    title: 'employees example page',
    link: 'employees example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Employees.aggregateAsset('css', 'employees.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Employees.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Employees.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Employees.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Employees;
});
