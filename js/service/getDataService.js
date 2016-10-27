/**
 * Created by qingyun on 16/10/13.
 */
angular.module('starter')
    .service('getListService',['$http',function ($http) {
        this.getList=function (url) {
            console.log(url);
            // return url;
            return  $http.get(url)
        }
    }])