/*
	Klister.io Plugin Template

	This is a template of a plugin in Klister.io.
	Minimum files needed are a package.json and an entry script with the following functions:
		
		Init(controller)
		- Runs once when the Klister server starts
		- Can contain a worker loop for polling external API:s
		- The class that first ran Init() is stored in the Controller.Plugin.pluginname


		Run(session, command)
		- Allocates a unique class with Run() for every session
		- All your Inited data (Eg. MySQL, global vars, trackers...) is avaliable in this.Controller.Plugin.pluginname
		- The parameter command is a json structure following the Klister.io pattern
		- The parameter Session is a REST or WebSocket connection with a paretn Device. 
			- In the Device, you can access metadata connected to the User added by Klister.io and other plugins.
			- The Session.Read() function triggers the plugin Run() function.
			- The Session.Send() function sends the answer to the user.
			- REST/HTTP needs you to call Session.Send() at least once to close the current request and end lingering.

*/

class Command
{
	// The command is reallocated everytime 
	// Eg. if the module is called 'klister-testplugin' the plugin name should be set to 'testplugin'
	constructor(controller)
	{
		this.Controller = controller;
		this.PluginName = 'your-plugin-name';
	}

	// Runns when the server starts the inited version of the class
	// is saved in this.Controller.Plugins[this.PluginName]
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

	// Runs when your command is called from a client
	Run(session, command)
	{

		// Metadata, like command name, is in the first level of the json
		var ret 			= {};
		ret.com 			= command.com; // Required - this will be the plugin name
		ret.action 			= command.action; // Required - a custom action you can react to
		ret.success 		= 1;  // Required - Return 1 of the command was successfull, 0 if not
		ret.error 			= 0;  // Optional, but nice to have on errors - If success was 0, optionally return an error code explaining what went wrong
		ret.errortext 		= ''; // Optional - Add a error text to clarify the error

		// a successfull domain uses the data field to return the data
		ret.data = {};
		ret.data.test = 'Hello KLister.io 😁';
		ret.data.another = 'Is there life on Mars?';

		// Use the session to return, in [Object] format.
		// Klister.io Session does the Json parsing for you
		session.Send(ret);
	}

	// Add more functions, folders and stuff if you need to. 
	// This class is only the entry point.

}
module.exports = Command;
