/*
 * The MIT License
 *
 * Copyright (c) 2013, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

angular.module('sample.widgets.randommsg', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('randommsg', {
        title: 'Random Message',
        description: 'Display a random quote of Douglas Adams',
        templateUrl: 'dashboard/views/widgets/randommsg/randommsg.html',
        controller: 'randommsgCtrl'
      });
  })
  .service('randommsgService', function(){
    // source http://bookriot.com/2012/05/25/the-42-best-lines-from-douglas-adams-the-hitchhikers-guide-to-the-galaxy-series/
    var msgs = [
      'There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened.',
      'Many were increasingly of the opinion that they’d all made a big mistake in coming down from the trees in the first place. And some said that even the trees had been a bad move, and that no one should ever have left the oceans.',
      '“My doctor says that I have a malformed public-duty gland and a natural deficiency in moral fibre,” Ford muttered to himself, “and that I am therefore excused from saving Universes.”',
      'The ships hung in the sky in much the same way that bricks don’t.',
      '“I don’t know, I didn’t listen.”'
    ];

    return {
      get: function(){
        return {
          text: msgs[Math.floor(Math.random() * msgs.length)],
          author: 'Douglas Adams'
        };
      }
    };
  })
  .controller('randommsgCtrl', function($scope, randommsgService){
    $scope.msg = randommsgService.get();
  });
