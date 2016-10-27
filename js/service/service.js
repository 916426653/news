/**
 * Created by qingyun on 16/10/13.
 */
angular.module('starter')
.factory('dataService',['$http',function ($http) {
    var service ={
        getTopic:function () {
            var url = '/163topic';
            return  $http.get(url)
        }
    }
    return service;
}])