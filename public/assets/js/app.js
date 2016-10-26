var app = angular.module('oraclesFront', ['ui.router', 'ui.bootstrap', 'chart.js']);

app.config(function($stateProvider, $urlRouterProvider, ChartJsProvider) {
	$urlRouterProvider.otherwise('/');
	$urlRouterProvider.when('/','static/offline-vs-online');

	$stateProvider
		.state('staticReports', {
			url: '/',
			templateUrl: viewTemplateUrlProvider('static-reports'),
		})
		.state('staticReports.offline', {
			url: 'static/offline-vs-online',
			templateUrl: viewTemplateUrlProvider('static-offline'),
			controller: 'StaticOfflineCtrl'
		})
		.state('staticReports.offline.default', {
			url: 'static/offline-vs-online/default',
			templateUrl: viewTemplateUrlProvider('pie-chart'),
			controller: 'PieCtrl'
		})
		.state('staticReports.spendlob', {
			url: 'static/spend-across-lobs',
			templateUrl: viewTemplateUrlProvider('static-spendlob'),
		})
		.state('staticReports.bookings', {
			url: 'static/bookings-metrics',
			templateUrl: viewTemplateUrlProvider('static-bookings'),
		})
		.state('benchmarking', {
			url: '/benchmarking',
			templateUrl: viewTemplateUrlProvider('benchmarking'),
		})
		.state('customReport', {
			url: '/create-custom-report',
			templateUrl: viewTemplateUrlProvider('custom-report'),
		})
		.state('savedReports', {
			url: '/saved',
			templateUrl: viewTemplateUrlProvider('saved-reports'),
		});

		ChartJsProvider.setOptions({ colors : [ '#F7464A', '#46BFBD', '#FDB45C', '#803690', '#00ADF9', '#949FB1', '#4D5360'] });
});

app.controller('StaticOfflineCtrl', function($scope, BackendService, $state){
	
  $scope.dateInputOpen = function(which){
		$scope[which].opened=true;
	};

	$scope.getOffline = function(from, to){
		BackendService.getOfflineBookingReport({from: from, to: to})
		.then(function(response){
			console.log(response);
			// $state.go('staticReports.offline.default', response);
		});
	};

	$scope.initDateData = function(){
		$scope.offlineType = 'default';
		$scope.fromDate = {
			opened: false
		}; 
		$scope.toDate = {
			opened: false
		};

		$scope.fromDate.date = new Date(2016,9,09);
		$scope.toDate.date = new Date(2016,10,09);

		$scope.altInputFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
		$scope.dateOptions = {
			maxDate: new Date(),
	    minDate: new Date(2000,1,1),
	    type: 'date'
		};
	};

	$scope.initChartData = function(){
		$scope.chartAvailable = 'default';
		$scope.defaultChart = {
			data: [300, 500, 100],
			labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
			options: {}
		};
	};

	$scope.initDateData();
	$scope.initChartData();
});

app.controller('PieCtrl', function($scope){
	$scope.fromDateText = '12 September 2016';
	$scope.toDateText = '26 October 2016';
	$scope.labels = ["Offline", "Online"];
  $scope.data = [300, 500];
  $scope.options = {
  	title: {
  		display: true,
  	fullWidth: true,
  	text: getChartTitle('Bookings', $scope.fromDateText, $scope.toDateText)
  	},
  	legend: {
  		display: true,
  		position: 'bottom',
  		fullWidth: true
  	}
  };

  function getChartTitle(title,from,to){
  		return title + ' between \''+ from +'\' to \'' + to + '\':'
  }
});

app.service('BackendService', function($http){
	this.getOfflineBookingReport = function(requestData){
		var data = {};
		data.reportname = 'adoption';
		data.requesttype = 'default';
		data.from = requestData.from;
		data.to = requestData.to;
		return $http({
			method: 'GET',
			url: 'http://10.135.240.100:7070/Oracles/QuerryHandler',
			params: data
		});
	};
});

/* Internal Use Methods ******************************************************************************************************/

function viewTemplateUrlProvider(templateName){
	return 'assets/views/' + templateName + '.html';
}