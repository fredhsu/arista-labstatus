var app = angular.module('labApp', ['ngResource', 'ngRoute']);
var host = 'http://172.22.206.54:8081'

app.factory("Get", function($resource) {
    return $resource('/status', {})
});

app.factory("PanTest", function($resource) {
    return $resource('/pan', {})
});

app.factory("PanWebTest", function($resource) {
    return $resource('/panweb', {})
});

app.factory("NeutronNet", function($resource) {
    return $resource('/api/openstack/neutron', {})
});
app.factory("NeutronSubnet", function($resource) {
    return $resource('/api/openstack/subnet', {})
});
app.factory("NovaCompute", function($resource) {
    return $resource('/api/openstack/nova', {})
});
app.factory("StackEos", function($resource) {
    return $resource('/api/openstack/eos', {})
});
app.factory("StackReset", function($resource) {
    return $resource('/api/openstack/reset', {})
});

app.factory("Vmotion1", function($resource) {
    return $resource('/api/vmotion/vmotion1', {})
});
app.factory("Vmotion2", function($resource) {
    return $resource('/api/vmotion/vmotion2', {})
});
app.factory("VmotionTest1", function($resource) {
    return $resource('/api/vmotion/test1', {})
});
app.factory("VmotionTest2", function($resource) {
    return $resource('/api/vmotion/test2', {})
});

app.controller('SwitchesController', function($scope, Get) {
    Get.query(function(data) {
        $scope.test = data;
    });
    $scope.switches = [{
        Hostname: 'bleaf1',
        IpIntf: 'test',
        IntfConnected: 'testintf',
        Uptime: '00',
        Version: '11'
    }];

});

app.controller('PanController', function($scope, $log, PanTest, PanWebTest) {
    $scope.webresult = 'No Test';
    $scope.bypassresult = 'No Test';
    $scope.dropresult = 'No Test';

    $scope.itemClicked = function() {
        $scope.weblabel = "label-info";
        $scope.bypasslabel = "label-info";
        $scope.droplabel = "label-info";
        $scope.webresult = 'Running';
        $scope.bypassresult = 'Running';
        $scope.dropresult = 'Running';
        PanWebTest.query(function(data) {
            if (data[0].Working) {
                $scope.weblabel = "label-success";
                $scope.webresult = 'Passed';
            } else {
                $scope.weblabel = "label-danger";
                $scope.webresult = 'Failed';
            }
        });

        PanTest.query(function(data) {
            $log.log(data);
            if (data[0].Working) {
                $scope.bypasslabel = "label-success";
                $scope.bypassresult = 'Passed';
            } else {
                $scope.bypasslabel = "label-danger";
                $scope.bypassresult = 'Failed';
            }
            if (data[1].Working) {
                $scope.droplabel = "label-success";
                $scope.dropresult = 'Passed';
            } else {
                $scope.droplabel = "label-danger";
                $scope.dropresult = 'Failed';
            }
        });
    };
});

app.controller('VmotionController', function($scope, $log, $timeout, Vmotion1, Vmotion2, VmotionTest1, VmotionTest2) {
    $scope.vmotion1result = 'No Test';
    $scope.vmotion2result = 'No Test';
    $scope.test1result = 'No Test';
    $scope.test2result = 'No Test';
    $scope.itemClicked = function() {
        $scope.vmotion1label = "label-info";
        $scope.test1label = "label-info";
        $scope.vmotion2label = "label-info";
        $scope.test2label = "label-info";

        $scope.vmotion1result = 'Running';
        $scope.test1result = 'Running';
        $scope.vmotion2label = 'Running';
        $scope.test2result = 'Running';

        function VM1Func() {
            Vmotion1.query(function(data) {
                if (data[0].Working) {
                    $scope.vmotion1label = "label-success";
                    $scope.vmotion1result = 'Passed';
                } else {
                    $scope.vmotion1label = "label-danger";
                    $scope.vmotion1result = 'Failed';
                }
            });
            $timeout(Test1Func, 1000);
            return
        }

        function Test1Func() {
            VmotionTest1.query(function(data) {
                $log.log(data);
                if (data[0].Working) {
                    $scope.test1label = "label-success";
                    $scope.test1result = 'Passed';
                } else {
                    $scope.test1label = "label-danger";
                    $scope.test1result = 'Failed';
                }
            });
            $timeout(VM2Func, 1000);
            return
        }

        function VM2Func() {
            NovaCompute.query(function(data) {
                $log.log(data);
                if (data[0].Working) {
                    $scope.vmotion2label = "label-success";
                    $scope.vmotion2result = 'Passed';
                } else {
                    $scope.vmotion2label = "label-danger";
                    $scope.vmotion2result = 'Failed';
                }
            });
            $timeout(Test2Func, 5000);
        }

        function Test2Func() {
            StackEos.query(function(data) {
                $log.log(data);
                if (data[0].Working) {
                    $scope.test2label = "label-success";
                    $scope.test2result = 'Passed';
                } else {
                    $scope.test2label = "label-danger";
                    $scope.test2result = 'Failed';
                }
            });
        }
        VM1Func();
    };
});

app.controller('OpenstackController', function($scope, $log, $timeout, NeutronNet, NeutronSubnet, NovaCompute, StackEos, StackReset) {
    $scope.netresult = 'No Test';
    $scope.subnetresult = 'No Test';
    $scope.computeresult = 'No Test';
    $scope.eosresult = 'No Test';
    $scope.resetresult = 'No Test';

    $scope.itemClicked = function() {
        $scope.netlabel = "label-info";
        $scope.subnetlabel = "label-info";
        $scope.computelabel = "label-info";
        $scope.eoslabel = "label-info";
        $scope.resetlabel = "label-info";

        $scope.netresult = 'Running';
        $scope.subnetresult = 'Running';
        $scope.computeresult = 'Running';
        $scope.eosresult = 'Running';
        $scope.resetresult = 'Running';

        function NetFunc() {
            NeutronNet.query(function(data) {
                if (data[0].Working) {
                    $scope.netlabel = "label-success";
                    $scope.netresult = 'Passed';
                } else {
                    $scope.netlabel = "label-danger";
                    $scope.netresult = 'Failed';
                }
            });
            $timeout(SubnetFunc, 1000);
            return
        }

        function SubnetFunc() {
            NeutronSubnet.query(function(data) {
                $log.log(data);
                if (data[0].Working) {
                    $scope.subnetlabel = "label-success";
                    $scope.subnetresult = 'Passed';
                } else {
                    $scope.subnetlabel = "label-danger";
                    $scope.subnetresult = 'Failed';
                }
            });
            $timeout(ComputeFunc, 1000);
            return
        }

        function ComputeFunc() {
            NovaCompute.query(function(data) {
                $log.log(data);
                if (data[0].Working) {
                    $scope.computelabel = "label-success";
                    $scope.computeresult = 'Passed';
                } else {
                    $scope.computelabel = "label-danger";
                    $scope.computeresult = 'Failed';
                }
            });
            $timeout(EosFunc, 5000);
        }

        function EosFunc() {
            StackEos.query(function(data) {
                $log.log(data);
                if (data[0].Working) {
                    $scope.eoslabel = "label-success";
                    $scope.eosresult = 'Passed';
                } else {
                    $scope.eoslabel = "label-danger";
                    $scope.eosresult = 'Failed';
                }
            });
            $timeout(ResetFunc, 1000);
        }

        function ResetFunc() {
            StackReset.query(function(data) {
                $log.log(data);
                if (data[0].Working) {
                    $scope.resetlabel = "label-success";
                    $scope.resetresult = 'Passed';
                } else {
                    $scope.resetlabel = "label-danger";
                    $scope.resetresult = 'Failed';
                }
            });
        }
        NetFunc();
    };
});
app.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        })
        .when('/overview', {
            templateUrl: 'overview.html',
            controller: 'SwitchesController'
        })
        .when('/topology', {
            templateUrl: 'topology.html'
        })
        .when('/pan', {
            templateUrl: 'pan.html',
            controller: 'PanController'
        })
        .when('/openstack', {
            templateUrl: 'openstack.html',
            controller: 'OpenstackController'
        })
                .when('/vmotion', {
            templateUrl: 'vmotion.html',
            controller: 'VmotionController'
        })
});