'use strict';

angular.module('myApp.overview', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: 'overview/overview.html',
            controller: 'OverviewCtrl'
        });
    }])

    .controller('OverviewCtrl', function ($scope) {
        $scope.newItem = '';
        $scope.items = [
            {
                title: '1111',
                comments: [{}, {}]
            },
            {
                title: '222',
                comments: []
            }
        ];
        $scope.hasItem = function (title) {
            return $scope.items.some(function (item) {
                return item.title === title
            });
        };
        $scope.addItem = function () {
            if ($scope.newItem === '' || $scope.hasItem($scope.newItem)) {
                return;
            }
            $scope.items.push({
                title: $scope.newItem,
                comments: []
            });
            $scope.resetInput();
        };
        $scope.resetInput = function () {
            $scope.newItem = '';
        };
        $scope.deleteItem = function (index) {
            $scope.items.splice(index, 1);
        };
        $scope.keypressHandler = function (event) {
            if(event.which === 13){ // on enter
                $scope.addItem();
            }
        }
    });