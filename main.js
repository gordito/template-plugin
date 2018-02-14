/*
	Klister.io Plugin Template

	This is a template of a plugin in Klister.io.
	Minimum files needed are a package.json and an entry script with the following functions:
		
		Init(controller)
		- Runs once when the Klister server starts
		- Can contain a worker loop for polling external API:s
		- The class that first ran Init() is stored in the Controller.Plugin.pluginname


		Run(controller, session, command)
		- Allocates a unique class with Run() for every session
		- All your Inited data (Eg. MySQL, global vars, trackers...) is avaliable in Controller.Plugin.pluginname
		- The parameter command is a json structure following the Klister.io pattern
		- The parameter Session is a REST or WebSocket connection with a paretn Device. 
			- In the Device, you can access metadata connected to the User added by Klister.io and other plugins.
			- The Session.Read() function triggers the plugin Run() function.
			- The Session.Send() function sends the answer to the user.
			- REST/HTTP needs you to call Session.Send() at least once to close the current request and end lingering.

*/

var Controller = null;

function Init(controller)
{
	Controller = controller;
	// Your init code, DB connections and worker jobs here...
	// Maybe check the global Config for your required values.
}

function Run(controller, session, command) 
{
	// Metadata, like command name, is in the first level of the json
	var ret 			= {};
	ret.com 			= 'testplugin'; // the plugin name
	ret.action 			= 'call-mom'; // the API action
	ret.success 		= 1;  // Return 1 of the command was successfull, 0 if not
	ret.error 			= 0;  // If success was 0, optionally return an error code explaining what went wrong
	ret.errortext 		= ''; // Add a error text to clarify the error

	// a successfull domain uses the data field to return the data
	ret.data = {};
	ret.data.test = 'Hello KLister.io 😁';
	ret.data.another = 'Is there life on Mars?';

	// Use the session to return, in [Object] format.
	// Klister.io Session does the Json parsing for you
	session.Send(ret);
}

module.exports = 
{
	Init,
	Run
};
