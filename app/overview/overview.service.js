angular
    .module('myApp.overview')
    .factory('overviewService', function () {
        var items = [];
        var selectedItem = null;
        var user = {
            name: 'User 1',
            avatar: 'user1.jpg'
        };

        loadItems();

        function loadItems() {
            try {
                var itemsString = window.localStorage.getItem('items');
                items = itemsString ? JSON.parse(itemsString) : [];
            } catch (e) {
                items = [];
            }
        }

        function saveItems() {
            window.localStorage.setItem('items', angular.toJson(items));
        }

        return {
            getUser: function () {
                return user;
            },
            getItems: function () {
                return items;
            },
            hasItemWithTitle: function (title) {
                return items.some(function (item) {
                    return item.title === title
                });
            },
            addItem: function (item) {
                if (item.title === '' ||
                    this.hasItemWithTitle(items.title)) {
                    return false;
                }
                items.push(item);
                saveItems();
                return true;
            },
            deleteItem: function (item) {
                if (this.isSelectedItem(item)) {
                    this.resetSelection();
                }
                var index = items.indexOf(item);
                if (index < 0) {
                    return false;
                }
                items.splice(index, 1);
                saveItems();
                return true;
            },
            isSelectedItem: function (item) {
                return item === selectedItem;
            },
            hasSelectedItem: function () {
                return selectedItem !== null;
            },
            selectItem: function (item) {
                if (this.isSelectedItem(item)) { //toggle selection
                    this.resetSelection();
                } else {
                    selectedItem = item;
                }
            },
            resetSelection: function () {
                selectedItem = null;
            },
            getSelectedItemComments: function () {
                return selectedItem ? selectedItem.comments : [];
            },
            getSelectedItemIndex: function () {
                return items.indexOf(selectedItem);
            },
            addCommentToSelectedItem: function (comment) {
                var comments = this.getSelectedItemComments();
                comments.push(Object.assign({}, comment));
                saveItems();
            }
        };
    });