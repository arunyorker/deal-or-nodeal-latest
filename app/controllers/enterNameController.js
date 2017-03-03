app.controller('enterNameController', ['$scope', 'gameService', '$location',
	function ($scope, gameService, $location) {
		$scope.playerName = "";
		gameService.playerName = "";
		$scope.showError = false;
		gameService.dealAmount = 0;
		gameService.gameStarted = false;
		gameService.yourBoxAmount = 0;
		var pattern = /^[a-zA-Z ]{2,}$/;
		$scope.play = function () {
			var nameValidationResult = validatePlayerName($scope.playerName);
			if (nameValidationResult == "valid") {
				$location.path('/chooseCase');
			} else {
				$scope.playerName = "";
				$scope.showError = true;
			}
		}
		// validation for playerName
		var validatePlayerName = function (name) {
			if (!pattern.test(name)) {
				return "invalid";
			} else {
				gameService.playerName = name.toLowerCase();
				return "valid";
			}
		}
	}
])