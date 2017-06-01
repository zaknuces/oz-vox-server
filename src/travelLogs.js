const fs = require('fs');
const path = require('path');

module.exports = {
	/**
	 * This method return the travel log and resources associated with it (if push feature is enabled).
	 */
	getData: (req, res) => {
		if (res.push && req.query && req.query.serverPush !== undefined) {
			console.log('Server Push resources');

			let imageFilePath = path.join(__dirname, '../public', '/images/porto1.jpg');
			let stream = res.push('/images/porto1.jpg', {
				status: 200,
				method: 'GET',
				request: {
					accept: '*/*'
				},
				response: {
					'content-type': 'image/jpeg'
				}
			})
			stream.on('error', err => {
					console.log(err.message);
					stream.removeAllListeners();
    	});
			stream.on('end', () => {
        stream.removeAllListeners();
      })
			stream.end(fs.readFileSync(imageFilePath));

			imageFilePath = path.join(__dirname, '../public', '/images/porto2.jpg');
			stream = res.push('/images/porto2.jpg', {
				status: 200,
				method: 'GET',
				request: {
					accept: '*/*'
				},
				response: {
					'content-type': 'image/jpeg'
				}
			})
			stream.on('error', err => {
					console.log(err.message);
			})
			stream.end(fs.readFileSync(imageFilePath));

			imageFilePath = path.join(__dirname, '../public', '/images/porto3.jpg');
			stream = res.push('/images/porto3.jpg', {
				status: 200,
				method: 'GET',
				request: {
					accept: '*/*'
				},
				response: {
					'content-type': 'image/jpeg'
				}
			})
			stream.on('error', err => {
					console.log(err.message);
			})
			stream.end(fs.readFileSync(imageFilePath));

			imageFilePath = path.join(__dirname, '../public', '/images/porto4.jpg');
			stream = res.push('/images/porto4.jpg', {
				status: 200,
				method: 'GET',
				request: {
					accept: '*/*'
				},
				response: {
					'content-type': 'image/jpeg'
				}
			})
			stream.on('error', err => {
					console.log(err.message);
			})
			stream.end(fs.readFileSync(imageFilePath));
		}
		res.json([{
			details: 'Trip to Porto, Protugal. Last Year, I got an oppurtunity to spend few days in a beautiful Protugese city of Porto. It was like traveling back in time and was a major shift from Hassle Bussle of Singapore. Check out some of the pictures I took',
			images: [{
				url: 'images/porto1.jpg'
			}, {
				url: 'images/porto2.jpg'
			}, {
				url: 'images/porto3.jpg'
			}, {
				url: 'images/porto4.jpg'
			}]
		}]);
	}
};
