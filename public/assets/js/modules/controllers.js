app.controller('StaticOfflineCtrl', function($scope, BackendService, $state){
	$scope.chartAvailable = false;
  $scope.dateInputOpen = function(which){
		$scope[which].opened=true;
	};

	$scope.getOffline = function(from, to){
		$scope.chartAvailable = false;
		BackendService.getOfflineBookingReport({from: from, to: to, type: $scope.offlineType})
		.then(function(response, error){
			if(error){
				$state.go('404');
				return console.log(error);
			}
			var params = {
				data: response.data,
				title: getTitleFromType('offline', $scope.offlineType, 
																BackendService.getPrettyDate(from), 
																BackendService.getPrettyDate(to))
			};
			switch($scope.offlineType){
				case 'default':	
					$state.go('staticReports.offline.default', params);
					break;
				case 'site':	
					$state.go('staticReports.offline.site', params);
					break;
				case 'month':	
					$state.go('staticReports.offline.month', params);
					break;
				case 'year':	
					$state.go('staticReports.offline.year', params);
					break;
				default:
					$state.go('404');
					break;
			}
			$scope.chartAvailable = true;
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

app.controller('PieCtrl', function($scope, $stateParams, pieData, PDFService, ChartJs, BackendService){
	$scope.fromDateText = '12 September 2016';
	$scope.toDateText = '26 October 2016';
	$scope.labels = pieData.labels;
  $scope.data = pieData.data;
  $scope.options = {
  	title: {
  		display: true,
  	fullWidth: true,
  	text: $stateParams.title
  	},
  	legend: {
  		display: true,
  		position: 'bottom',
  		fullWidth: true
  	}
  };
$scope.colors = ['#46BFBD', '#F7464A','#FDB45C'];


  $scope.saveToPDF = function(){
  	var chart = document.getElementById('pieChart');
  	var table = document.getElementById('dataTable');
  	var png = chart.toDataURL("image/png",1.0);
  	var title = getTitleFromType('offline', $scope.offlineType, 
  			BackendService.getPrettyDate($scope.from), 
  			BackendService.getPrettyDate($scope.to));
  	PDFService.savePDF(png);
  };

});

app.controller('HorizontalBarCtrl', function($scope, barData, BackendService, PDFService, $stateParams){
	$scope.labels = barData.labels;
	$scope.series = barData.series;
	$scope.data = barData.data;
	$scope.colors = [ '#F7464A', '#46BFBD', '#FDB45C'];
$scope.options = {
  	title: {
  		display: true,
  	fullWidth: true,
  	text: $stateParams.title
  	},
  	legend: {
  		display: true,
  		position: 'bottom',
  		fullWidth: true
  	}
  };
	 $scope.saveToPDF = function(){
  	var chart = document.getElementById('hBarChart');
  	var table = document.getElementById('dataTable');
  	var png = chart.toDataURL("image/png",1.0);
  	var title = getTitleFromType('offline', $scope.offlineType, 
  			BackendService.getPrettyDate($scope.from), 
  			BackendService.getPrettyDate($scope.to));
  	PDFService.savePDF(png);
  };
});

app.controller('LineChartCtrl', function($scope, lineData, BackendService, PDFService,$stateParams){
	$scope.labels = lineData.labels;
	$scope.series = lineData.series;
	$scope.data = lineData.data;
	$scope.colors = [ '#F7464A', '#46BFBD', '#FDB45C'];
$scope.options = {
  	title: {
  		display: true,
  	fullWidth: true,
  	text: $stateParams.title
  	},
  	legend: {
  		display: true,
  		position: 'bottom',
  		fullWidth: true
  	}
  };
	 $scope.saveToPDF = function(){
  	var chart = document.getElementById('lineChart');
  	var table = document.getElementById('dataTable');
  	var png = chart.toDataURL("image/png",1.0);
  	var title = getTitleFromType('offline', $scope.offlineType, 
  			BackendService.getPrettyDate($scope.from), 
  			BackendService.getPrettyDate($scope.to));
  	PDFService.savePDF(png);
  };
});

app.controller('CustomReportCtrl', function($scope, BackendService, uibButtonConfig, store, $state){
	uibButtonConfig.activeClass='btn-info';
	function initializeCustom(){
		$scope.stateIsValid = false;
		$scope.columns =[];
		$scope.columnNamesLoaded = false;
		$scope.request = {};
		$scope.request.tableName = null;
		$scope.resultsAvailable = false;
	}
	initializeCustom();
	$scope.$watch('request.tableName', function(name){ 

		if(name != null){			
			$scope.columnNamesLoaded = false;
			BackendService.getColumnsForTable(name).then(function(response,error){
				if(error){
					console.log(error);
				}
				$scope.columns = response.data.map(function(element,index){
					return {
						name: element
					}
				});
				$scope.columnNamesLoaded = true;
			});
		}
		else {
			$scope.stateIsValid = false;
		}
	}, true);

	$scope.$watch('columns',function(newCols,oldCols){
		$scope.request.columns = [];
		newCols.forEach(function(element,index){
			if(element.checked === true){
				$scope.request.columns.push(element);
			}
		});
	},true);

	$scope.$watch('request.columns',function(newCols,oldCols){
		var flag = true;
		newCols.forEach(function(element){
			if(!element.operator || !element.operand){
				flag=false;
			}
		});
		if(flag && $scope.request.tableName){
			$scope.stateIsValid = true;
		}
		else {
			$scope.stateIsValid = false;
		}
	},true);

	$scope.saveReport = function(name){
		var KEYSLIST = store.get('keys') || [];
		var key = name;
		var value = JSON.stringify($scope.request);
		KEYSLIST.push(key);
		value.name = name;
		store.set(key, value);
		store.set('keys', KEYSLIST);
		initializeCustom();
		$state.go('savedReports');
	}
});

app.controller('BenchmarkCtrl', function($scope, $state, BackendService, PDFService){
	$scope.chartAvailable = false;
	
  $scope.dateInputOpen = function(which){
		$scope[which].opened=true;
	};

	$scope.initDateData = function(){
		$scope.benchMarkType = 'month';
		$scope.fromDate = {
			opened: false
		}; 
		$scope.toDate = {
			opened: false
		};

		$scope.fromDate.date = new Date(2015,9,09);
		$scope.toDate.date = new Date(2016,9,09);

		$scope.altInputFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
		$scope.dateOptions = {
			maxDate: new Date(),
	    minDate: new Date(2000,1,1),
	    type: 'date'
		};
	};

	$scope.getBenchMark = function(from, to){
		$scope.chartAvailable = false;
		BackendService.getBenchmarkReport({from: from, to: to, type: $scope.benchMarkType})
		.then(function(response, error){
			if(error){
				$state.go('404');
				return console.log(error);
			}
			var params = {
				data: response.data,
				title: getTitleFromType('benchmark', $scope.benchMarkType, 
																BackendService.getPrettyDate(from), 
																BackendService.getPrettyDate(to))
			};
			switch($scope.benchMarkType){
				case 'month':	
					$state.go('benchmarking.month', params);
					break;
				case 'year':	
					$state.go('benchmarking.year', params);
					break;
				default:
					$state.go('404');
					break;
			}
			$scope.chartAvailable = true;
		});
	};
	$scope.initDateData();
});

app.controller('LobCtrl', function($scope, $state, BackendService, PDFService){
$scope.chartAvailable = false;
	$scope.lobType = 'default';
  $scope.dateInputOpen = function(which){
		$scope[which].opened=true;
	};

	$scope.initDateData = function(){
		$scope.fromDate = {
			opened: false
		}; 
		$scope.toDate = {
			opened: false
		};

		$scope.fromDate.date = new Date(2015,9,09);
		$scope.toDate.date = new Date(2016,9,09);

		$scope.altInputFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
		$scope.dateOptions = {
			maxDate: new Date(),
	    minDate: new Date(2000,1,1),
	    type: 'date'
		};
	};

	$scope.getLobCost = function(from, to){
		$scope.chartAvailable = false;
		BackendService.getCostReport({from: from, to: to, type: $scope.lobType})
		.then(function(response, error){
			if(error){
				$state.go('404');
				return console.log(error);
			}
			var params = {
				data: response.data,
				title: getTitleFromType('cost', $scope.lobType, 
																BackendService.getPrettyDate(from), 
																BackendService.getPrettyDate(to))
			};
			switch($scope.lobType){
				case 'default':	
					$state.go('staticReports.spendlob.default', params);
					break;
				default:
					$state.go('404');
					break;
			}
			$scope.chartAvailable = true;
		});
	};
	$scope.initDateData();
	$scope.lobType = 'default';
});

app.controller('BookingCtrl', function($scope, $state, BackendService, PDFService){
$scope.chartAvailable = false;
	$scope.bookingType = 'default';
  $scope.dateInputOpen = function(which){
		$scope[which].opened=true;
	};

	$scope.initDateData = function(){
		$scope.fromDate = {
			opened: false
		}; 
		$scope.toDate = {
			opened: false
		};

		$scope.fromDate.date = new Date(2015,9,09);
		$scope.toDate.date = new Date(2016,9,09);

		$scope.altInputFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
		$scope.dateOptions = {
			maxDate: new Date(),
	    minDate: new Date(2000,1,1),
	    type: 'date'
		};
	};

	$scope.getCountReport = function(from, to){
		$scope.chartAvailable = false;
		BackendService.getCountReport({from: from, to: to, type: $scope.bookingType})
		.then(function(response, error){
			if(error){
				$state.go('404');
				return console.log(error);
			}
			var params = {
				data: response.data,
				title: getTitleFromType('count', $scope.bookingType, 
																BackendService.getPrettyDate(from), 
																BackendService.getPrettyDate(to))
			};
			switch($scope.bookingType){
				case 'default':	
					$state.go('staticReports.bookings.default', params);
					break;
				default:
					$state.go('404');
					break;
			}
			$scope.chartAvailable = true;
		});
	};
	$scope.initDateData();
	$scope.bookingType = 'default';
});

app.controller('SavedReportsCtrl', function($scope, $state, BackendService, PDFService, store){
	$scope.populateAllReports = function(){
		var KEYSLIST = store.get('keys') || [];
		$scope.reports = [];
		KEYSLIST.forEach(function(element, index){
			var report = JSON.parse(store.get(element));
			$scope.reports.push(report);
		});
	};

	$scope.getPDF = function (reportData){
		BackendService.getPDFForSavedReport(reportData).then(function(response, error){
			if(error){
				console.log(error);
			}
			else {
				console.log(response);
			}
		});
	};
	$scope.reports = [];
	$scope.populateAllReports();
});
