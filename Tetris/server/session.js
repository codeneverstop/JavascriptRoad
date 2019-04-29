/*
	每个session有一个client的集合
	但是一个client只有一个session

	session的join就是把client加入自己的set里
	session的leave就是把client踢出自己的set里
*/

class Session
{
    constructor(id)
    {
        this.id = id;
        this.clients = new Set;
    }

    join(client)
    {
    	if (client.session)
    	{
    		throw new Error("client already have session with id " + client.session.id);
    	}

    	this.clients.add(client);
    	client.session = this;
    }

    leave(client)
    {
    	if (client.session !== this)
    	{
    		throw new Error("client leave with wrong id " + client.session.id);
    	}
    	this.clients.delete(client);
    	client.session = null;
    }
}

module.exports = Session;