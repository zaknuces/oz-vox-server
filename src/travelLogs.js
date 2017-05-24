const fs = require('fs');
const path = require('path');

module.exports = {
	/**
	 * This method return the travel log and resources associated with it (if push feature is enabled).
	 */
	getData: (req, res) => {
		if (res.push && req.query && req.query.serverPush !== undefined) {
			console.log('Serve Push resources');
			let imageFilePath = path.join(__dirname, '/public', '/images/porto1.jpg');
			res
				.push('/images/porto1.jpg', {})
				.end(fs.readFileSync(imageFilePath));

			imageFilePath = path.join(__dirname, '/public', '/images/porto2.jpg');
			res
				.push('/images/porto2.jpg', {})
				.end(fs.readFileSync(imageFilePath));

			imageFilePath = path.join(__dirname, '/public', '/images/porto3.jpg');
			res
				.push('/images/porto3.jpg', {})
				.end(fs.readFileSync(imageFilePath));

			imageFilePath = path.join(__dirname, '/public', '/images/porto4.jpg');
			res
				.push('/images/porto4.jpg', {})
				.end(fs.readFileSync(imageFilePath));

			imageFilePath = path.join(__dirname, '/public', '/images/porto5.jpg');
			res
				.push('/images/porto5.jpg', {})
				.end(fs.readFileSync(imageFilePath));
		}
		res.json([{
			details: 'Trip to Porto, Protugal',
			images: [{
				url: 'images/porto1.jpg'
			}, {
				url: 'images/porto2.jpg'
			}, {
				url: 'images/porto3.jpg'
			}, {
				url: 'images/porto4.jpg'
			}, {
				url: 'images/porto5.jpg'
			}]
		}]);
	}
};

