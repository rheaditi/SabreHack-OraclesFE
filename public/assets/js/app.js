var app = angular.module('oraclesFront', ['ui.router', 'ui.bootstrap', 'chart.js', 'angular-storage']);
var CONFIG = {
	// URL: 'http://10.162.229.235:7070/Oracles/QueryHandler'
	URL: '/api',
	TABLEURL: '/tabledata'
}
app.service('BackendService', function($http) {
	const MONTH_LOOKUP = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	this.getOfflineBookingReport = function(requestData) {
		var data = {};
		data.reportname = 'adoption';
		data.reporttype = requestData.type;
		data.from = this.parseDate(requestData.from);
		data.to = this.parseDate(requestData.to);
		return $http({
			method: 'GET',
			url: CONFIG.URL,
			params: data
		});
	};

	this.getBenchmarkReport = function(requestData) {
		var data = {};
		data.reportname = 'benchmark';
		data.reporttype = requestData.type;
		data.from = this.parseDate(requestData.from);
		data.to = this.parseDate(requestData.to);
		return $http({
			method: 'GET',
			url: CONFIG.URL,
			params: data
		});
	};

	this.getCostReport = function(requestData) {
		var data = {};
		data.reportname = 'cost';
		data.reporttype = requestData.type;
		data.from = this.parseDate(requestData.from);
		data.to = this.parseDate(requestData.to);
		return $http({
			method: 'GET',
			url: CONFIG.URL,
			params: data
		});
	};

	this.getCountReport = function(requestData) {
		var data = {};
		data.reportname = 'count';
		data.reporttype = requestData.type;
		data.from = this.parseDate(requestData.from);
		data.to = this.parseDate(requestData.to);
		return $http({
			method: 'GET',
			url: CONFIG.URL,
			params: data
		});
	};

	this.getColumnsForTable = function(table){
		var data = {};
		data.table = table+'';
		return $http({
			method: 'GET',
			url: CONFIG.TABLEURL,
			params: data
		});
	};
	this.parseDate = function(date) {
		if (!(date instanceof Date)) {
			date = new Date(date);
		}
		return date.toISOString().slice(0, 10).split('-').join('');
	};
	this.getPrettyDate = function(date) {
		if (!(date instanceof Date)) {
			date = new Date(date);
		}
		var dateDate = date.getDate();
		var dateMonth = MONTH_LOOKUP[date.getMonth()]
		var dateYear = date.getFullYear();
		return ( dateDate + ' ' + dateMonth + ' ' + dateYear) ;
	};

	this.getPDFForSavedReport = function(data){
		return $http({
			method: 'POST',
			url: CONFIG.URL,
			data: data
		});
	};
});
app.service('PDFService', function($http, $window) {	
	this.savePDF = function(png, title, filename) {
		$http({
			method: 'POST',
			url:'/pdf',
			data: {
				png: png,
				title: title,
                filename: filename + '.pdf'
			}
		}).then(function(response, error){
			if(error)
				console.log(error);
			else{
          $window.open('http://localhost:1337/' + response.data.resource_url);
      }
		});
	};
});
