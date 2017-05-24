class Quote {
	constructor() {
	}

	/**
	 * Handles click event of scenario button.
	 * @param event
	 */
	clickEventHandler(event) {
		this.startTime = new Date().getTime();
		this.count = 0;
		this.option = parseInt($('input[name=quantity]:checked').get(0).value);
		for (let i = 0; i < this.option; i++) {
			this.fetchQuotation(i + 1);
		}
	}

	/**
	 * Fetch quote and update table.
	 */
	fetchQuotation(index) {
		this.createTableRow(index);
		$.get('/quote', (data) => {
			this.updateTableRow(index, data[0].content);
			this.checkTime();
		});
	}

	/**
	 * Gather stats for fetching process.
	 */
	checkTime() {
		this.count++;

		if (this.count === this.option) {
			let endDate = new Date().getTime();
			let diff = (endDate - this.startTime) / 1000;
			$('#loadtimes').html(`Total Time ~ ${diff} seconds`);
		}
	}

	createTableRow(count) {
		$('#resultTable tbody').append(`<tr><td>${count}</td><td class='id${count}'></td></tr>`);
	}

	updateTableRow(count, description) {
		$(`#resultTable tbody .id${count}`).html(description);
	}
}
