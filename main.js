/*
	Klister.io Plugin Template

	This is a template of a plugin in Klister.io.
	Minimum files needed are a package.json and an entry script with the following functions:
		
		Init()
		- Runs once when the Klister server starts
		- Can contain a worker loop for polling external API:s or init your DB connection.
		- The class that first ran Init() is stored in the this.Controller.Plugins['your-plugin-name']
			- This way you can get data from other plugins as well.
			- Put other plugins as dependencies to you plugin, and they will be inited to.


		Run(session, command, response)
		- Allocates a unique class with Run() for every session
		- All your Inited data (Eg. MySQL, global vars, trackers...) is avaliable in this.Controller.Plugin.pluginname
		- The parameter command is a json structure following the Klister.io pattern
		- The parameter Session is a REST or WebSocket connection with a parent Device. 
			- In the Device, you can access metadata connected to the User added by Klister.io and other plugins.
			- The response.Send() function sends the answer to the user.
			- REST/HTTP needs you to call response.Send() at least once to close the current request and end lingering.

*/

class Command
{
	/*
		The command is reallocated everytime it's called from the client.
		Eg. if the module is called 'klister-testplugin' the plugin name should be set to 'testplugin'
		@param controller 	- Reference to the server controller and the entry point to the rest of the server.
	*/
	constructor(controller)
	{
		this.Controller = controller;
		this.PluginName = 'your-plugin-name';
	}

	/*
		Runns when the server starts, the inited version of the class 
		is saved in this.Controller.Plugins[this.PluginName]
	*/
	Init()
	{
		// Your init code, DB connections and worker jobs here...
		// Maybe check the global Config for your required values, like this:

		if (!('my_custom_config_value' in this.Controller.Config))
		{
			console.error('[Plugin Error] My config value is missing');
			process.exit();
		}
	}

	/*
		Runs when your command is called from a client
		@param session  - the current session, containing device and other info, often used to check if the device is authorized.
		@param command 	- the incomming cammand object, for you to handle
		@param response - use this to respond to the client. response.Send({foo:'bar'}) or response.Error(1337, 'a Leet error appeared')
	*/
	Run(session, command, response)
	{
		// Metadata, like command name, is in the first level of the json
		// response.com 			= Copied from incomming command.com. this is the plugin name
		// response.action 			= Copied from incomming command.action; this is your custom action.
		// response.index 			= Copied from incomming command.index; this is a client packet reference index
		// response.success 		= When using response.Send() success is set to 1, When using response.Error() suucess is set to 0
		// response.error 			= When using response.Error(), you can add a custom error code here
		// response.errortext 		= When using response.Error(), you can add a custom error text here

		// Use the response to send the respons back to the client.
		// Klister.io Response Class does the Json parsing for you
		// response.Send({foo:'bar'});

		switch (command.action)
		{
			case 'hello':
				response.Send({hello: '🌎'});
				break;

			case 'lookforlife':
				response.Send({life: true});
				break;

			default:
				response.Error(1, 'command not found');
		}

	}

	// Add more functions, folders and stuff if you need to. 
	// Look at me! You are the captain of this class now!

}
exports = module.exports = Command;
