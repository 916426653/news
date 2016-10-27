/**
 * Created by qingyun on 16/10/22.
 */
angular.module('starter')
.filter('getdate',[function () {
    return function (input) {
        if(!input){
            return '';
        }
        var result = input.match(/\d+\-(\d+\-\d+\s*\d+:\d+):\d+/);
        var date = result [1];
        return date;
    }
}])