app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/enterName.html',
			controller: 'enterNameController',
		}).when('/chooseCase', {
			templateUrl: 'partials/chooseCase.html',
			controller: 'chooseCaseController'
		}).when('/game', {
			templateUrl: 'partials/game.html',
			controller: 'gameController',
		}).when('/score', {
			templateUrl: 'partials/score.html',
			controller: 'scoreController'
		}).otherwise({
			redirectTo: '/',
			controller: 'enterNameController'
		})
	}
]);