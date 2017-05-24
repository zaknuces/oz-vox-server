const randomQuote = require('random-quote');

module.exports = {
	/**
	 * This method return random quote.
	 */
	getData: (req, res) => {
		randomQuote().then(quote => res.json(quote));
	}
};
