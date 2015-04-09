var localStorageExtension = {};
(function (window) {
    var searchItems = ["input:text", "input:checkbox", "textarea", "select"];
    localStorageExtension.localStorage = window.Storage;

    // store the input , textarea , select in the area
    localStorageExtension.StorageArea = function (area) {
        return function () {

            var scope = $(area);
            // Don't store the perperty of no_webcache
            if (scope.attr('no_webcache') != undefined) {
                return true;
            }

            var jsonArray = [];
            for (var i = 0; i < searchItems.length; i++) {
                var getItem = scope.find(searchItems[i]);
                for (var j = 0; j < getItem.length; j++) {
                    var tmpId = getItem[j].id;

                    if (empty(tmpId)) {
                        continue;
                    }

                    var tmpV = getItem[j].value;
                    if (searchItems[i] == "input:checkbox") {
                        tmpV = getItem[j].checked;
                    }

                    // make json and then append to json array
                    var item = '{' + '"id":' + '"' + tmpId + '"' + ',"value":' + '"' + tmpV + '"' + '}';
                    jsonArray.push(item);
                }
            }

            var root = djb2Code(window.location.href);
            var jsonStr = '[' + jsonArray.join(",") + ']';
            window.localStorage.setItem(root, jsonStr); // storage 

            return true;
        };
    };

    // clean the input , textarea , select in the area
    localStorageExtension.CleanArea = function (area) {
        return function () {
            var scope = $(area);
            for (var i = 0; i < searchItems.length; i++) {
                var getItem = scope.find(searchItems[i]);
                for (var j = 0; j < getItem.length; j++) {
                    var tmpId = getItem[j].id;

                    if (empty(tmpId)) {
                        continue;
                    }

                    var tmpV = getItem[j];
                    if (searchItems[i] == "input:checkbox") {
                        getItem[j].checked = false;
                        continue;
                    }

                    if (searchItems[i] == "select") {
                        $(tmpV).prop('selectedIndex', 0);
                        continue;
                    }

                    $(tmpV).val('')
                }
            }
            return true;
        };
    };

    // get storage
    localStorageExtension.GetStorage = function (key) {
        return function () {
            var value = window.localStorage.getItem(key);
            var array = $.parseJSON('[' + value + ']');
            if (array[0] === null) {
                return false;
            }

            for (var i = 0; i < array[0].length; i++) {
                var tmp = array[0][i];
                var obj = document.getElementById(tmp.id);
                if (obj.type == "checkbox") {
                    obj.checked = tmp.value == "true" ? true : false;
                    continue;
                }

                obj.value = tmp.value;
            }

            return true;
        }
    };

    // Delete key
    localStorageExtension.DelStorage = function (key) {
        return function () {
            window.localStorage.removeItem(key);
        };
    };

    // key of the storage 
    localStorageExtension.GetRoot = function () {
        return djb2Code(window.location.href);
    }

    //is a given value empty? Objects, arrays, strings
    empty = function (value) {
        if (object(value)) {
            var num = Object.getOwnPropertyNames(value).length;
            if (num === 0 || (num === 1 && is.array(value)) || (num === 2 && is.arguments(value))) {
                return true;
            }
            return false;
        } else {
            return value === '';
        }
    };

    // is a given value object?
    object = function (value) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    };

    // convert string to hash value
    djb2Code = function (str) {
        var hash = 0;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

})(this);
