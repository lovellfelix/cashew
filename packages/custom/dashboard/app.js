'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Dashboard = new Module('dashboard');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Dashboard.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Dashboard.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Dashboard.menus.add({
    title: 'dashboard',
    link: 'dashboard example page',
    roles: ['authenticated'],
    menu: 'main'
  });

  Dashboard.aggregateAsset('css', 'dashboard.css');

  Dashboard.aggregateAsset('css', '../lib/angular-dashboard-framework/dist/angular-dashboard-framework.min.css');

  Dashboard.aggregateAsset('js', '../lib/jquery-ui/ui/minified/core.min.js');
  Dashboard.aggregateAsset('js', '../lib/jquery-ui/ui/minified/widget.min.js');
  Dashboard.aggregateAsset('js', '../lib/jquery-ui/ui/minified/mouse.min.js');
  Dashboard.aggregateAsset('js', '../lib/jquery-ui/ui/minified/sortable.min.js');

  Dashboard.aggregateAsset('js', '../lib/angular-ui-sortable/sortable.min.js');
  Dashboard.aggregateAsset('js', '../lib/angular-route/angular-route.min.js');
  Dashboard.aggregateAsset('js', '../lib/angular-bootstrap/ui-bootstrap.min.js');
  Dashboard.aggregateAsset('js', '../lib/angular-bootstrap/ui-bootstrap-tpls.min.js');
  Dashboard.aggregateAsset('js', '../lib/angular-timeago/src/timeAgo.js');


  Dashboard.aggregateAsset('js', '../lib/angular-dashboard-framework/dist/angular-dashboard-framework.min.js');


  Dashboard.angularDependencies(['yaru22.angular-timeago', 'adf', 'ngRoute', 'structures',
    'sample.widgets.news', 'sample.widgets.weather',
    'sample.widgets.linklist', 'sample.widgets.randommsg']);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Dashboard.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Dashboard.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Dashboard.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Dashboard;
});
