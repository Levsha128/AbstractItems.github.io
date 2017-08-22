angular
    .module('myApp.overview')
    .component('overviewComments', {
        templateUrl: 'overview/overview-comments.template.html',
        controller: ['$scope', 'overviewService', function OverviewCommentsController($scope, overviewService) {
            $scope.newComment = {
                text: '',
                author: overviewService.getUser()
            };
            $scope.getSelectedItemIndex = function () {
                return overviewService.getSelectedItemIndex();
            };
            $scope.commentKeypressHandler = function (event) {
                if (event.ctrlKey && (event.which === 13 || event.which === 10)) { // on ctrl+enter //todo check on mobile devices
                    $scope.addComment();
                }
            };
            $scope.addComment = function () {
                overviewService.addCommentToSelectedItem($scope.newComment);
                $scope.newComment.text = '';
            };
            $scope.hasSelectedItem = function () {
                return overviewService.hasSelectedItem();
            };
            $scope.getComments = function () {
                return overviewService.getSelectedItemComments();
            };
        }]
    });