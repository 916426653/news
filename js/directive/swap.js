/**
 * Created by qingyun on 16/9/27.
 */
angular.module('starter')
.directive('swap',['dataService','$state',function (dataService,$state) {
    return {
        restrict:'A',
        link:function (scope,ele,attr) {
            $(document.documentElement).on("touchstart", function (e) {
                var startLeft = e.touches[0]['clientX'], endLeft, swapLeft;
                $(document.documentElement).on("touchend", function (e) {
                    endLeft = e.changedTouches[0].clientX;
                    swapLeft = endLeft - startLeft;
                    if (swapLeft) {
                        $state.go('home.list');
                    }
                    $(document.documentElement).off("touchend");
                });
            })
        }
    }
}])