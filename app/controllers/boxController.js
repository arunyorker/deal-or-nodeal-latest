app.controller('gameController', ['$scope', '$location', 'gameService', '$timeout',
	function ($scope, $location, gameService, $timeout) {
		$scope.playerName = gameService.playerName;
		$scope.playerBox = gameService.selectedBox;
		$scope.boxNumbers = gameService.boxNumber;
	}
])