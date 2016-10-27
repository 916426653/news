/**
 * Created by qingyun on 16/10/18.
 */
angular.module('starter')
.directive('floor',['commentService',function (commentService) {
    return{
        restrict:'AE',
        templateUrl:'temp/reply.html',
        link:function (scope,ele,attr) {
            commentService.get().then(function (res) {
            })
        },
        controller:['$http',function ($http) {
            $ctrl = this;

        }]
    }
}])