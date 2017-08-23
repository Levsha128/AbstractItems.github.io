angular
    .module('myApp.overview')
    .factory('overviewService', function () {
        var items = [];
        var selectedItem = null;
        var user = {
            name: 'User 1',
            avatar: 'images/user1.png'
        };

        if(isFirstStart())
        {
            setNotFirstStart();
            setDefaultItems();
            saveItems();
        }else {
            loadItems();
        }

        function isFirstStart() {
            return !window.localStorage.getItem('not-first-start');
        }

        function setNotFirstStart() {
            window.localStorage.setItem('not-first-start', true);
        }

        function setDefaultItems() {
            items = [
                {
                    title: 'Item 1',
                    comments: [{
                        author: {
                            name: 'User 1',
                            avatar: 'images/user1.png'
                        },
                        text: 'test comment'
                    }, {
                        author: {
                            name: 'User 2',
                            avatar: 'images/user2.png'
                        },
                        text: 'test comment2'
                    }]
                },
                {
                    title: 'Item 2',
                    comments: [{
                        author: {
                            name: 'User 1',
                            avatar: 'images/user1.png'
                        },
                        text: 'test comment3'
                    }]
                }
            ];
        }

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