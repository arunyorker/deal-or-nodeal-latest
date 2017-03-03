app.factory('gameService', ['$http', '$location',
	function ($http, $location, $scope) {
		var gameService = {};
		gameService.boxNumber = [];
		gameService.selectedBox = 0;
		gameService.playerName = "";
		gameService.dealAmount = 0;
		gameService.gameStarted = false;
		gameService.yourBoxAmount = 0;
		gameService.getAmount = function () {
			return $http.get('/assets/data/amount.json')
		}
		return gameService;
	}
])