/* Internal Use Methods ******************************************************************************************************/
const TITLES = {
	offline: {
		default: 'Summary of Adoption',
		site: 'Adoption Across Sites',
		year: 'Adoption by Year',
		month: 'Adoption by Month'
	},
	benchmark: {
		month: 'Company Cost vs Industry Avg. By Month',
		year: 'Company Cost vs Industry Avg. By Year'
	},
	cost: {
		default: 'Compare Booking Costs Across LOBs'
	},
	count: {
		default: 'Compare Total Bookings Across LOBs'
	}
};

function viewTemplateUrlProvider(templateName){
	return 'assets/views/' + templateName + '.html';
}

function getTitleFromType(name,type,from,to){
	return TITLES[name][type] + ' (' + from + ' to ' + to + ')';
}