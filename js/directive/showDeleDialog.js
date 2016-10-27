/**
 * Created by qingyun on 16/10/22.
 */
angular.module('starter')
.directive('showDele',function () {
    return{
        restrict:'A',
        link:function (scope,ele,attr) {
            $(ele).on('click',function (e) {
                e.preventDefault();
                console.log(scope.$parent.item.source)
                var show = $(ele).parents('ion-content').prev();
                console.log(show)
            })
        }
    }
})