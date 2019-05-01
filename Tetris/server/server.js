/*
	服务器配置：
	1、在要运行的目录 npm install ws
	2、在运行的目录用命令行执行 node xxx.js , 
	运行完之后会看到是阻塞式的程序。 或者也可以让它在后台运行， 
	否则有打印直接会打印在屏幕上。
*/

const wbSocket = require('ws').Server
const Session = require('./session');
const Client = require('./client');
const sessions = new Map;

/* 姑且认为wbSocket是一个工厂模式 它就是所有实例化的类*/
const webServer = new wbSocket({port:9000});

function createId(len = 6, chars = "abcdefghijklmnopqrstuvwxyz1234567890")
{
	var id = '';
	for (var i = 0; i < 6; i++)
	{
		id += chars[chars.length * Math.random() | 0];
	}

	return id;
}

/* 首先监听connection事件，获取连接 */
webServer.on('connection', conn => {
	console.log(conn + " established");
	client = new Client(conn);
	conn.on('message', msg => {
		console.log("get message from client:" + msg);
		const data = JSON.parse(msg);
		if (data.type == 'create-session') {
			var id = createId();
			console.log('server get create-session, new id is ' + id);
			var tempsession = new Session(id);
			tempsession.join(client);
			sessions.set(tempsession.id, tempsession); //如果这个id已经对应过一个session，就会覆盖之前的
			console.log(sessions);
			client.send({
				type : "session-created",
				id : tempsession.id
			});
		} else if (data.type == 'join-session') {
			const session = sessions.get(data.id);
			session.join(client); /*这个地方还有看得到client哦*/
			console.log("session clients are " + session.clients.size);
		}
	})

	/*关闭事件，都是conn来注册了*/
	conn.on('close', () => {
		const session = client.session; //注意，这个client是在webServer的on这个函数内的
		if (session) {
			session.leave(client);
			if (session.clients.size === 0) {
				sessions.delete(session.id);
			}
			console.log("client closed, session clients are " + session.clients.size);
		}
	});
});