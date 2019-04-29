class Client
{
	constructor(conn)
	{
		this.conn = conn;
		this.session = null;
	}

	send(data)
	{
		const msg = JSON.stringify(data);
		console.log(`send msg is ${msg}`);
		this.conn.send(msg, function ack(err) {
			if (err) { 
				console.error("send msg failed. session id is " + this.session.id + ", err is " + err);
			}
		});
	}
}

module.exports = Client;