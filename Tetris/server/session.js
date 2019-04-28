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