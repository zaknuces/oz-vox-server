const fs = require('fs');
const path = require('path');

module.exports = {
	/**
	 * This method return main dashboard page template and (optional) resources associated with the page (if push feature is
	 * enabled)
	 */
	getData: (req, res) => {
		if (res.push) {
			let imageFilePath = path.join(__dirname, '/../public', '/images/Building.jpg');
			res
				.push('/images/Building.jpg', {
					req: {'accept': '*/*'},
					res: {'content-type': 'image/jpeg'}
				})
				.end(fs.readFileSync(imageFilePath));
		}
		let eventHTMLPath = path.join(__dirname, '/../public', '/main.html');
		res.write(fs.readFileSync(eventHTMLPath));
		res.end();
	}
};
