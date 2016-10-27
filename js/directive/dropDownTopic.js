/**
 * Created by qingyun on 16/9/27.
 */
angular.module('starter')
    .directive('dropDownTopic', ['dataService', function (dataService) {

        return {
            restrict: 'A',
            link: function (scope, ele, attr) {
                var topicContaier = $(ele).parent().next();

                ele.on('click', function () {

                    $(ele).hasClass('checked') ?
                        (
                            $(ele).removeClass('checked'),
                                $(ele).parent().next().css({top: -1 * 700 + 'px'})
                        ) :
                        (
                            $(ele).addClass('checked'),
                                $(ele).parent().next().css({top: 40 + 'px'})
                        )

                });
                $(topicContaier).on('touchstart','li',function(){

                    var startT = Date.now(),endT,elapseT;
                    $(this).on('touchend',function () {

                        endT=Date.now();
                        elapseT=endT-startT;
                        if(elapseT>2000){
                            console.log('ssss');

                            $(topicContaier).addClass('pressed')
                        }
                        $(this).off('touchend');
                    })
                });
                //安卓版
                $(topicContaier).on('touchstart','i',function () {
                    var idx = $(this).parent().attr('data-topicId');
                    scope.headerList.splice('idx',1);
                    scope.$apply();

                })


                dataService.getTopic().then(function (data) {
                    scope.headerList = data.data.tList;
                });

            }


        }
    }])