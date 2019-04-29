class ConnectionManager {
	constructor() {
		this.conn = null;
	}

	connect(address) {
		this.conn = new WebSocket(address);

		/* 这个open和new有什么区别？ 应该是 如果new了以后 server没反应，这个open也应该不会有执行*/
		this.conn.addEventListener('open', () => {
			console.log('conn established');
			/*create-session已经是程序自己指定的来*/
			this.send({
				type: 'create-session',
			});
		});

		this.conn.addEventListener('message', event => {
			console.log("receive message:" + event.data);
			this.receive(event.data);
		});
	}

	receive(msg) {
		const data = JSON.parse(msg);
		if (data.type === "session-created") {
			window.location.hash = data.id;
		}
	}

	send(data) {
		const msg = JSON.stringify(data);
		console.log(`Sending msg ${msg}`);
		this.conn.send(msg);
	}
}