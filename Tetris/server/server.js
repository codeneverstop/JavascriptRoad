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

/* 首先监听connection事件，获取连接 */
webServer.on('connection', conn => {
	console.log(conn + " established");
	client = new Client(conn);
	conn.on('message', msg => {
		console.log("get message from client:" + msg);

		if (msg == 'create-session')
		{
			console.log('server get create-session');
			var tempsession = new Session('123aaa');
			console.log(`11create session is ${tempsession}`);
			tempsession.join(client);
			sessions.set(session.id, session);
		}
	})

	/*关闭事件，都是conn来注册了*/
	conn.on('close', () => {
		console.log("client closed");
	});
});