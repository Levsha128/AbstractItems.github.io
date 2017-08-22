'use strict';

angular.module('myApp.overview', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: 'overview/overview.html',
            controller: 'OverviewCtrl'
        });
    }])

    .controller('OverviewCtrl', function ($scope) {


        $scope.comments = [];
        $scope.user = {
            name: 'User 1',
            avatar: 'user1.jpg'
        };
        $scope.newComment = {
            text: '',
            author: $scope.user
        };
        $scope.getSelectedItemIndex = function () {
            return $scope.items.indexOf($scope.selectedItem);
        };
        $scope.commentKeypressHandler = function (event) {
            if (event.ctrlKey && (event.which === 13 || event.which === 10)) { // on ctrl+enter //todo check on mobile devices
                $scope.addComment();
            }
        };
        $scope.addComment = function () {
            $scope.comments.push(Object.assign({}, $scope.newComment));
            $scope.newComment.text = '';
        }
    });