angular.module('socketIOTest', [])
.controller('MainCtrl', function ($scope) {
	var socket = io();

	$scope.hello = "YO!";

	socket.on('client-connected', function (data) {
		$scope.$apply(function () {
			$scope.username = data.timestamp;
			$scope.globalMessage = data.message;
		});
	});

	socket.on('data-update', function (data) {
		$scope.$apply(function () {
			$scope.data = data;
		});
	});
});