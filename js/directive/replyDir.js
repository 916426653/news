/**
 * Created by qingyun on 16/10/19.
 */
angular.module('starter')
    .directive('commentList',function () {
        return{
            controller:function ($stateParams,commentService,$scope) {
                var replyId = $stateParams.id;

                commentService.get(replyId).then(function (data) {
                    $scope.commentIds = data.data.commentIds;
                    $scope.comments = data.data.comments;
                    $scope.data = data.data;


                });
                $scope.loadMore=function () {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }
        }
    })
    .directive('comment',function () {
        return {
            scope:{
                data:'='
            },
            transclude:'element',
            compile:function () {
                return{
                    post:function ($scope,$element,$attr,ctr,$transclude) {
                        var ids = $scope.data.split(',');

                        var lastEle;

                        angular.forEach(ids,function (val,indx) {
                            $transclude(function (clone,scope) {
                                scope.id=val;

                                if(indx==0){
                                    $element.after(clone);
                                    lastEle = clone;


                                }
                                else{
                                    scope.comments[val]&& lastEle.append(clone);
                                    lastEle = clone;
                                }
                            })
                        })

                    }
                }
            }
        }
    });
