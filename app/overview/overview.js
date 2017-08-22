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
                comments: [{
                    author: {
                        name: 'User 1',
                        avatar: 'user1.jpg'
                    },
                    text: 'test comment'
                }, {
                    author: {
                        name: 'User 2',
                        avatar: 'user2.jpg'
                    },
                    text: 'test comment2'
                }]
            },
            {
                title: '222',
                comments: [{
                    author: {
                        name: 'User 1',
                        avatar: 'user1.jpg'
                    },
                    text: 'test comment3'
                }]
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
            if ($scope.selectedItem === item) {
                item = null;
            }
            $scope.selectedItem = item;
            $scope.comments = $scope.selectedItem ? $scope.selectedItem.comments : [];
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
            $scope.comments = $scope.selectedItem ? $scope.selectedItem.comments : [];
        };
        $scope.keypressHandler = function (event) {
            if (event.which === 13) { // on enter
                $scope.addItem();
            }
        };

        $scope.comments = [];
        $scope.user = {
            name: 'User 1',
            avatar: 'user1.jpg'
        };
        $scope.newComment = '';
        $scope.getSelectedItemIndex = function () {
            return $scope.items.indexOf($scope.selectedItem);
        };
        $scope.commentKeypressHandler = function (event) {
            if (event.ctrlKey && (event.which === 13 || event.which === 10)) { // on ctrl+enter //todo check on mobile devices
                $scope.addComment($scope.comments, $scope.user, $scope.newComment);
            }
        };
        $scope.addComment = function (comments, user, text) {
            comments.push({
                author: user,
                text: text
            });
        }
    });