var myApp = angular.module('gitUserModule',['ngAnimate']);


        myApp.controller('UserListController',['$scope','$http',function ($scope, $http) {
            $scope.userData = [];
            $scope.searchData = null;
            $scope.search = function () {
                $scope.userData = [];
                $http({
                    method: 'GET',
                    url: 'https://api.github.com/users/'+$scope.searchData+'/following'
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    angular.forEach(response.data,function (value,key) {
                        this.push(value);
                    },$scope.userData);
                    console.log(response);
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(response);
                });
            }
            //Profile Detail Modal..
            $scope.userDetail = [];
            $scope.followUsers = [];
            $scope.detail = function (login) {
                $http({
                    method: 'GET',
                    url: 'https://api.github.com/users/'+login
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.userDetail = response.data;
                    $scope.followUsers = [];
                    $('#user-detail').modal('show');
                    console.log(response.data);

                    $scope.getRepos(response.data.login);
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(response);
                });
            };

            $scope.getRepos = function (login) {
                
                $http({
                    method: 'GET',
                    url: 'https://api.github.com/users/'+login+'/repos'
                }).then(function successCallback(response) {
                    angular.forEach(response.data,function (d) {
                        $scope.followUsers.push(d);
                    })
                }, function errorCallback(response) {
                    console.log(response);
                });
            }


            /*
             * expose the event object to the scope
             */
            $scope.clickMe = function(clickEvent) {
                $scope.clickEvent = simpleKeys(clickEvent);
                console.log(clickEvent);
            };
            $scope.fn = function (event) {
                console.log(event);
                $scope.keyCode = event.keyCode;
            }
            /*
             * return a copy of an object with only non-object keys
             * we need this to avoid circular references
             */
            function simpleKeys (original) {
                return Object.keys(original).reduce(function (obj, key) {
                    obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key];
                    return obj;
                }, {});
            }


            /*
            var i=0;
            $scope.myFunct = function(myEnter) {
                if (myEnter.which === 13)i++;
                console.log("My number enter:"+i);
                console.log("My keycode:"+myEnter.which);
            }
            */
        }]);

        myApp.directive('myEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.myEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        });