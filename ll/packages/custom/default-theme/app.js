'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var DefaultTheme = new Module('default-theme');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
DefaultTheme.register(function(system, app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  DefaultTheme.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
/*  DefaultTheme.menus.add({
    title: 'defaultTheme example page',
    link: 'defaultTheme example page',
    roles: ['authenticated'],
    menu: 'main'
  }); */


  DefaultTheme.aggregateAsset('css', 'defaultTheme.css');
  DefaultTheme.aggregateAsset('css', '../lib/angular-material/angular-material.css');
  DefaultTheme.aggregateAsset('css', '../lib/lumx/dist/lumx.css');

  DefaultTheme.aggregateAsset('js', '../lib/velocity/velocity.min.js');
  DefaultTheme.aggregateAsset('js', '../lib/moment/min/moment-with-locales.min.js');
  DefaultTheme.aggregateAsset('js', '../lib/lumx/dist/lumx.min.js');
  DefaultTheme.aggregateAsset('js', '../lib/angular-aria/angular-aria.js');
  DefaultTheme.aggregateAsset('js', '../lib/angular-animate/angular-animate.js');
  DefaultTheme.aggregateAsset('js', '../lib/angular-material/angular-material.js');
  DefaultTheme.aggregateAsset('js', '../lib/angular-timeago/src/timeAgo.js');


  DefaultTheme.angularDependencies(['yaru22.angular-timeago', 'ngMaterial', 'lumx']);


  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    DefaultTheme.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    DefaultTheme.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    DefaultTheme.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    app.set('views', __dirname + '/server/views');


  return DefaultTheme;
});
