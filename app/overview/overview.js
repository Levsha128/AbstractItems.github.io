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
        $scope.selectedItem = null;
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
            var item = {
                title: $scope.newItem,
                comments: []
            };
            $scope.items.push(item);
            $scope.resetInput();
            $scope.selectItem(item);
        };
        $scope.selectItem = function (item) {
            $scope.selectedItem = item;
        };
        $scope.resetInput = function () {
            $scope.newItem = '';
        };
        $scope.deleteItem = function (index) {
            if ($scope.items[index] === $scope.selectedItem) {
                $scope.resetSelection();
            }
            $scope.items.splice(index, 1);
        };
        $scope.resetSelection = function () {
            $scope.selectedItem = null;
        }
        $scope.keypressHandler = function (event) {
            if (event.which === 13) { // on enter
                $scope.addItem();
            }
        }
    });