/**
 * Created by qingyun on 16/10/18.
 */
angular.module('starter')
.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/home/list/toutiao');
    $stateProvider.state('home',{
        //abstract抽象模板永远不能直接激活，但是可以设置被激活的子节点
        abstract:true,
        url:'/home',
        templateUrl: 'temp/home.html'
    })
        .state('home.list',{
            url:'/list/:id',
            views:{
                'home':{
                    templateUrl: 'temp/home.list.html',
                    controller:function (listService,$scope,data) {
                        console.log(data.tid)

                        $scope.items=data.tid;
                        listService.setReqState(false);
                        $scope.loadMore = function () {
                            var promise=listService.getNext()

                            if(promise){
                                promise.then(function (data) {
                                    var items = data.data.tid;
                                    $scope.items = $scope.items.concat(items);

                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                    listService.setReqState(false);
                                })
                            }
                        };
                    },
                    resolve: {
                        data: function (listService) {
                            return listService.getLists().then(function(res){
                                return res.data;
                            })
                        }
                    }
                }


            }
        })
        .state('detail',{
            url:'/detail/:id',
            templateUrl:'temp/detail.html',
            controller:function (listService,$scope,$stateParams,commentService) {
                var id = $stateParams.id;
                listService.getNewDetail(id).then(function (res) {
                    $scope.news = res.data[id];
                    // $scope.bodys = res.data[id].body;

                    var REG_img = '<!--IMG#(.*?)?-->';
                    var regExpression = new RegExp(REG_img, 'mg');

                    if(res.data[id].body){
                        $scope.bodys = res.data[id].body.replace(regExpression, function (a, b) {
                            for (var i = 0; i < res.data[id].img.length; i++) {

                                if (i == b) {
                                    b = res.data[id].img[i].src
                                }

                            }
                            return '<img src=' + b + '>';
                        });
                    }
                    commentService.get(id).then(function (res) {
                        $scope.preThree=[];
                        $scope.replys = res.data;

                        var commentIds = res.data.commentIds;
                        var comments = res.data.comments;

                        var three = commentIds.slice(0,3);

                        three.forEach(function (tar) {
                            var result = tar.split(',').pop();

                            $scope.preThree.push(comments[result])
                            console.log($scope.preThree)
                        })
                    })

                })
                listService.setReqState(false);
                $scope.loadMore = function () {
                    var promise=listService.getNext()

                    if(promise){
                        promise.then(function (data) {
                            var items = data.data.tid;
                            $scope.items = $scope.items.concat(items);

                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            listService.setReqState(false);
                        })
                    }
                };
            }
        })
        .state('reply',{
            url:'/reply/:id',
            templateUrl:'temp/reply.html',
        })
        .state('home.livechannel',{
            url: '/livechannel',
            views:{
                'livechannel':{
                    templateUrl:'temp/livechannel.html',
                    controller:function (listService,$scope) {
                        $scope.items=[];
                        listService.getNext().then(function (data) {
                            var items= data.data.tid;
                            $scope.items = items;
                        })
                        listService.setReqState(false);
                        $scope.loadMore = function () {
                            var promise=listService.getNext()

                            if(promise){
                                promise.then(function (data) {
                                    var items = data.data.tid;
                                    $scope.items = $scope.items.concat(items);

                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                    listService.setReqState(false);
                                })
                            }
                        };
                    }
                }
            }
        })
        .state('home.newstopic',{
            url:'/newstopic',
            views:{
            'newstopic': {
                templateUrl: 'temp/topic.html',
                controller:function (listService,$scope,data) {
                    console.log(data.tid)

                    $scope.items=data.tid;
                    listService.setReqState(false);
                    $scope.loadMore = function () {
                        var promise=listService.getNext()

                        if(promise){
                            promise.then(function (data) {
                                var items = data.data.tid;
                                $scope.items = $scope.items.concat(items);

                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                listService.setReqState(false);
                            })
                        }
                    };
                },
                resolve: {
                    data: function (listService) {
                        return listService.getLists().then(function(res){
                            return res.data;
                        })
                    }
                }

            }
            }
        })

})