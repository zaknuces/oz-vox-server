class TravelLogs {
	constructor() {
	}

	clickEventHandler(event) {
		this.startTime = new Date().getTime();
		this.option = parseInt($('input[name=quantity]:checked').get(0).value);
		this.fetch(this.option === 2 ? '?serverPush' : '');
	}

	fetch(queryParam) {
		$('#travel-log').html('');
		$.get(`/travelLogs${queryParam}`, (data) => {
			this.createTemplate(data);
			this.checkTime();
		});
	}

	checkTime() {
		let endDate = new Date().getTime();
		let diff = (endDate - this.startTime) / 1000;
		$('#loadtimes').html(`Total Time ~ ${diff} seconds`);
	}

	createTemplate(data) {
		data.forEach(travelLog => {
			let images = '';
			travelLog.images.forEach(image => {
				images += `
			          <div class='col-md-4'>
			            <div class='thumbnail'>
			              <img src='${image.url}'>
			            </div>
			          </div>
			        `;
			})
			$('#travel-log').append(`
		        <div>${travelLog.details}</div>
		        <div class='row'>
		          ${images}
		        </div>
		        `);
		});
	}
};
