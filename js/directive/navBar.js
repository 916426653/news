/**
 * Created by qingyun on 16/9/27.
 */
angular.module('starter')
.directive('navBar',['dataService','$state',function (dataService,$state) {
    var data='';

    return{
        restrict:'E',
        templateUrl:'temp/navBar.html',
        link:function (scope,ele,attr) {
            dataService.getTopic().then(function (data) {
                scope.headerList=data.data.tList;
            });
            ele.on('click','.item-bar a',function (e) {
                var a = e.target;
                $(this).parent().parent().find('a').removeClass('checked');
                angular.element(a).addClass('checked');
                var rect = a.getBoundingClientRect();
                var nvaBarEle = $(ele).find('.navBar');
                var left = nvaBarEle[0].offsetLeft - 1 * (rect.left - window.innerWidth / 2);
                if(left>0){
                    left=0
                }
                nvaBarEle.css({left:left+'px'});
                $ctrl.say(e.target);
            })
        },
        controller:['$http',function ($http) {
            $ctrl = this;
            $ctrl.name='123';
            $ctrl.say=function (e) {
                dataService.getTopic().then(function (data) {
                    $ctrl.headerList=data.data.tList;

                    $ctrl.tname=$(e).html();

                    for(var i=0;i<$ctrl.headerList.length;i++){
                        if($ctrl.headerList[i].tname==$ctrl.tname){

                        }
                    }

                });
            }
        }]
    }
}]);

