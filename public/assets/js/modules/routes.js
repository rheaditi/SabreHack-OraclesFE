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
					url: 'static/offline-vs-online/summary',
					templateUrl: viewTemplateUrlProvider('pie-chart'),
					controller: 'PieCtrl',
					params: {
						data: {}, title: {}
					},
					resolve: {
						pieData: function($stateParams){
							return $stateParams.data;
						}
					}
				})
				.state('staticReports.offline.site', {
					url: 'static/offline-vs-online/site-wise',
					templateUrl: viewTemplateUrlProvider('horizontal-bar-chart'),
					controller: 'HorizontalBarCtrl',
					params: {
						data: {}, title: {}
					},
					resolve: {
						barData: function($stateParams){
							return $stateParams.data;
						}
					}
				})
				.state('staticReports.offline.month', {
					url: 'static/offline-vs-online/monthly',
					templateUrl: viewTemplateUrlProvider('horizontal-bar-chart'),
					controller: 'HorizontalBarCtrl',
					params: {
						data: {}, title: {}
					},
					resolve: {
						barData: function($stateParams){
							return $stateParams.data;
						}
					}
				})
				.state('staticReports.offline.year', {
					url: 'static/offline-vs-online/yearly',
					templateUrl: viewTemplateUrlProvider('horizontal-bar-chart'),
					controller: 'HorizontalBarCtrl',
					params: {
						data: {}, title: {}
					},
					resolve: {
						barData: function($stateParams){
							return $stateParams.data;
						}
					}
				})
		.state('staticReports.spendlob', {
			url: 'static/spend-across-lobs',
			templateUrl: viewTemplateUrlProvider('static-spendlob'),
			controller: 'LobCtrl'
		})
		.state('staticReports.spendlob.default', {
			url: 'static/spend-across-lobs/default',
			templateUrl: viewTemplateUrlProvider('pie-chart'),
			controller: 'PieCtrl',
			params: {
				data: {}, title: {}
			},
			resolve: {
				pieData: function($stateParams){
					return $stateParams.data;
				}
			}
		})
		
		.state('benchmarking', {
			url: '/benchmarking',
			templateUrl: viewTemplateUrlProvider('benchmarking'),
			controller: 'BenchmarkCtrl'
		})
			.state('benchmarking.month', {
			url: '/benchmarking/monthly',
			templateUrl: viewTemplateUrlProvider('line-chart'),
			controller: 'LineChartCtrl',
			params: {
						data: {}, title: {}
			},
			resolve: {
				lineData: function($stateParams){
					return $stateParams.data;
				}
			}
		})
			.state('benchmarking.year', {
			url: '/benchmarking/yearly',
			templateUrl: viewTemplateUrlProvider('horizontal-bar-chart'),
			controller: 'HorizontalBarCtrl',
			params: {
						data: {}, title: {}
			},
			resolve: {
				barData: function($stateParams){
					return $stateParams.data;
				}
			}
		})
		.state('customReport', {
			url: '/create-custom-report',
			templateUrl: viewTemplateUrlProvider('custom-report'),
			controller: 'CustomReportCtrl'
		})
		.state('404', {
			url: '/404',
			templateUrl: viewTemplateUrlProvider('404'),
		})

		.state('staticReports.bookings', {
			url: 'static/bookings-metrics',
			templateUrl: viewTemplateUrlProvider('static-bookings'),
			controller: 'BookingCtrl'
		})

		.state('staticReports.bookings.default', {
			url: 'static/bookings-metrics/default',
			templateUrl: viewTemplateUrlProvider('pie-chart'),
			controller: 'PieCtrl',
			params: {
						data: {}, title: {}
			},
			resolve: {
				pieData: function($stateParams){
					return $stateParams.data;
				}
			}
		})
		.state('savedReports', {
			url: '/saved-reports',
			templateUrl: viewTemplateUrlProvider('saved-reports'),
			controller: 'SavedReportsCtrl'
		})

		ChartJsProvider.setOptions({ colors : [ '#F7464A', '#46BFBD', '#FDB45C'] });
});
