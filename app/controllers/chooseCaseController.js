app.controller('chooseCaseController', ['$scope', 'gameService', '$location', '$timeout',
	function ($scope, gameService, $location, $timeout) {
		$scope.playerName = gameService.playerName;
		$scope.boxNumbers = [26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
		$scope.showBox = false;
		$scope.box = true;
		var selected = false;
		// when box is selected
		$scope.boxSelect = function (ele) {
			if (selected == false) {
				ele.box = false;
				$scope.showBox = true;
				$scope.selectedNumber = ele.number;
				gameService.selectedBox = ele.number;
				selected = true;
				gameService.gameStarted = true;
				var index = $scope.boxNumbers.indexOf($scope.selectedNumber);
				$scope.boxNumbers.splice(index, 1);
				gameService.boxNumber = $scope.boxNumbers;
				$timeout(function () {
					$location.path('/game');
				}, 500);
			}
		}
		var initial = function () {
			/*after selecting box if back is pressed to go to home*/
			if (gameService.gameStarted == true) {
				$location.path('/');
			}
			/*while refreshing goes to home*/
			if (gameService.playerName == "") {
				$location.path('/');
			}
		}
		initial();
	}
])