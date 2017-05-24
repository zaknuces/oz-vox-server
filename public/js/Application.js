/**
 * Application Class responsible for application level calculations.
 */
class Application {
	constructor() {
	}

	/**
	 * returns {String} page load statistics
	 */
	generatePageStatistics() {
		let times = 'DOM loaded: ' + (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) + 'ms, '
		times += 'DOM complete (all loaded): ' + (window.performance.timing.domComplete - window.performance.timing.navigationStart) + 'ms, '
		times += 'Load event fired: ' + (window.performance.timing.loadEventStart - window.performance.timing.navigationStart) + 'ms'
		return times;
	}
}
