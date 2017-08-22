angular
    .module('myApp.overview')
    .component('overviewItems', {
        templateUrl: 'overview/overview-items.template.html',
        controller: ['$scope', 'overviewService', function OverviewItemsController($scope, overviewService) {
            $scope.items = overviewService.getItems();
            $scope.newItemText = '';

            $scope.addItem = function () {
                var item = {
                    title: $scope.newItemText,
                    comments: []
                };
                if (overviewService.addItem(item)) {
                    $scope.resetInput();
                    $scope.selectItem(item);
                }
            };
            $scope.resetInput = function () {
                $scope.newItem = '';
            };
            $scope.selectItem = function (item) {
                overviewService.selectItem(item);
            };
            $scope.deleteItem = function (item) {
                overviewService.deleteItem(item);
            };
            $scope.keypressHandler = function (event) {
                if (event.which === 13) { // on enter
                    $scope.addItem();
                }
            };
            $scope.isSelectedItem = function (item) {
                return overviewService.isSelectedItem(item);
            };
        }]
    });