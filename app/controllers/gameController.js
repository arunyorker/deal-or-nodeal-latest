app.controller('gameController', ['$scope', '$location', 'gameService', '$timeout',
	function ($scope, $location, gameService, $timeout) {
		$scope.playerName = gameService.playerName;
		$scope.playerBox = gameService.selectedBox;
		$scope.boxNumbers = gameService.boxNumber;
		$scope.openCaseClass = "";
		$scope.showSelectCase = true;
		$scope.showBankerOffer = false;
		$scope.showSwapBox = false;
		$scope.roundCount = 1;
		$scope.boxToBeSelected = 5;
		$scope.bankerOffer = 0;
		$scope.optionBox = 0;
		$scope.transition = false;
		$scope.gameDetails = true;
		$scope.showBox = false;
		$scope.showBox2 = false;
		$scope.bankerOfferDetails = false;
		$scope.swapBoxDetails = false;
		$scope.value = 0;
		$scope.displayNumber = 0;
		var enableGame = false;
		var animated = false;
		var boxAmounts = [];
		var remainingAmounts = [];
		var remainingBox = angular.copy($scope.boxNumbers);
		var choosedBox = gameService.selectedBox;
		// to showhide the leftamount and rightAmount when amountshow is clicked
		$scope.IsVisible = true;
		$scope.ShowHide = function () {
			$scope.IsVisible = $scope.IsVisible ? false : true;
		}

		function initial() {
			// if back is pressed or url is changed to redirects to home on game completion
			if (gameService.dealAmount != 0) {
				$location.path('/');
			}
			/*to prevent navigation to pages using url*/
			if (gameService.playerName == "" || gameService.selectedBox == 0) {
				$location.path('/');
			}
			$timeout(function () {
				$scope.transition = true;
			}, 100);
		}
		initial();
		//function to get left and right amounts
		gameService.getAmount().then(function (response) {
			var left = [];
			var right = [];
			for (var i = 0; i < response.data.left.length; i++) {
				var leftObject = {
					"money": response.data.left[i],
					"selected": false
				}
				left.push(leftObject)
			}
			for (var i = 0; i < response.data.right.length; i++) {
				var rightObject = {
					"money": response.data.right[i],
					"selected": false
				}
				right.push(rightObject)
			}
			$scope.leftAmount = left;
			$scope.rightAmount = right;
		});
		// //function to assign all amounts
		gameService.getAmount().then(function (response) {
			for (var i = 0; i < response.data.left.length; i++) {
				boxAmounts.push(response.data.left[i]);
			}
			for (var i = 0; i < response.data.right.length; i++) {
				boxAmounts.push(response.data.right[i]);
			}
			remainingAmounts = angular.copy(boxAmounts);
			shuffle();
		})
		//function to shufle amounts
		var shuffle = function () {
			var temp;
			var j;
			for (var i = 0; i < boxAmounts.length; i++) {
				var j = Math.floor(Math.random() * (boxAmounts.length));
				temp = boxAmounts[i];
				boxAmounts[i] = boxAmounts[j];
				boxAmounts[j] = temp;
			}
		}
		$scope.eliminateBox1 = function (a) {
			if (a.openCaseClass == "" && animated == false) {
				$scope.showSelectCase = false;
				$scope.showBox = true;
				$scope.showBox2 = false;
				animated = true;
				a.openCaseClass = 'open-case';
				choosedBox = a.number;
				$scope.displayNumber = choosedBox;
				a.number = '';
				$timeout(function () {
					a.openINR = 'assets/images/inr_case_open_status.png';
					a.number = boxAmounts[choosedBox - 1];
					var Amountindex = remainingAmounts.indexOf(a.number);
					remainingAmounts.splice(Amountindex, 1);
					var boxIndex = remainingBox.indexOf(choosedBox);
					remainingBox.splice(boxIndex, 1);
					hideAmount(a.number);
					$scope.showBox = false;
					$scope.showBox2 = true;
					$scope.value = a.number;
				}, 1000);
				$timeout(function () {
					$scope.showSelectCase = true;
					$scope.showBox2 = false;
					a.openCaseClass = 'hide-case';
					if ($scope.roundCount == 6 && $scope.boxToBeSelected == 1) {
						$scope.showSelectCase = false;
						enableSwapBox();
					} else if ($scope.roundCount < 6 && $scope.boxToBeSelected == 1) {
						$scope.showSelectCase = false;
						bankerCalculation();
						enableBankerOffer();
					}
					if (!($scope.roundCount == 6 && $scope.boxToBeSelected == 1)) {
						round();
					}
					animated = false;
				}, 2500);
			}
		}
		//function to hide the opened amount
		var hideAmount = function (amt) {
				for (var i = 0; i < $scope.leftAmount.length; i++) {
					if (amt == $scope.leftAmount[i].money && $scope.leftAmount[i].selected == false) {
						$scope.leftAmount[i].selected = true;
						return;
					}
				}
				for (var i = 0; i < $scope.rightAmount.length; i++) {
					if (amt == $scope.rightAmount[i].money && $scope.rightAmount[i].selected == false) {
						$scope.rightAmount[i].selected = true;
						return;
					}
				}
			}
			//function to calculate banker offer
		var bankerCalculation = function () {
				var sum = 0;
				for (var i = 0; i < remainingAmounts.length; i++) {
					sum = sum + (remainingAmounts[i] / remainingAmounts.length);
				}
				if ($scope.roundCount == 1) {
					$scope.bankerOffer = Math.ceil((Math.round(20 * sum / 100)) / 100) * 100;
				} else if ($scope.roundCount == 2) {
					$scope.bankerOffer = Math.ceil((Math.round(30 * sum / 100)) / 100) * 100;
				} else if ($scope.roundCount == 3) {
					$scope.bankerOffer = Math.ceil((Math.round(50 * sum / 100)) / 100) * 100;
				} else if ($scope.roundCount == 4) {
					$scope.bankerOffer = Math.ceil((Math.round(65 * sum / 100)) / 100) * 100;
				} else if ($scope.roundCount == 5) {
					$scope.bankerOffer = Math.ceil((Math.round(80 * sum / 100)) / 100) * 100;
				} else {
					$scope.bankerOffer = Math.ceil((Math.round(95 * sum / 100)) / 100) * 100;
				}
			}
			//function to control round number & number of cases to be selected
		var round = function () {
			$scope.boxToBeSelected--;
			if ($scope.boxToBeSelected == 0 && $scope.roundCount <= 6) {
				$scope.roundCount++;
				if ($scope.roundCount == 4) {
					$scope.boxToBeSelected = 4
				} else if ($scope.roundCount == 5) {
					$scope.boxToBeSelected = 3
				} else if ($scope.roundCount == 6) {
					$scope.boxToBeSelected = 2
				} else {
					$scope.boxToBeSelected = 5;
				}
			}
		}
		var enableBankerOffer = function () {
			$scope.gameDetails = false;
			$scope.bankerOfferDetails = true;
			$scope.swapBoxDetails = false;
			$scope.showSelectCase = false;
			$scope.showBankerOffer = true;
			$scope.showSwapBox = false;
		}
		var enableSelectCase = function () {
			$scope.gameDetails = true;
			$scope.bankerOfferDetails = false;
			$scope.swapBoxDetails = false;
			$scope.showSelectCase = true;
			$scope.showBankerOffer = false;
			$scope.showSwapBox = false;
		}
		var enableSwapBox = function () {
			$scope.gameDetails = false;
			$scope.bankerOfferDetails = false;
			$scope.swapBoxDetails = true;
			$scope.showSelectCase = false;
			$scope.showBankerOffer = false;
			$scope.optionBox = remainingBox[0];
			$scope.showSwapBox = true;
		}
		$scope.noDeal = function () {
			enableSelectCase();
		}
		$scope.deal = function () {
			gameService.dealAmount = $scope.bankerOffer;
			gameService.yourBoxAmount = boxAmounts[$scope.playerBox - 1];
			$location.path('/score');
		}
		$scope.showplayerBox = function () {
			gameService.dealAmount = boxAmounts[$scope.playerBox - 1];
			$location.path('/score');
		}
		$scope.showoptionBox = function () {
			gameService.dealAmount = boxAmounts[$scope.optionBox - 1];
			$location.path('/score');
		}
	}
])