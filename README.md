# Klister.io Plugin Template


A template you can use to write your own plugin to Klister.io.


The Klister.io server contains only bare minimum functionallity in itself, making it easy to extend the server with any type of functionallity you want. Klistyer.io provides a lot of base functionallity in its base packages, but everything is written as a plugin in itself, making it easy to both cherrypick plugins from your taste, rewrite or exchange plugins for better ones or make plugin packs with dependencies containing many interoperating plugins.


# Usage 


Writing your own plugin is super easy! You only need a few lines of codes, three functions and a GitHub account. We have made this template for you to have a good entrypoint to creating plugins and best practices when doing so. 

Minimum files needed are a package.json and an entry class with the following functions:


### constructor(controller)
- Store the server controller in this.Controller for later use.
- When the server starts, your plugin is loaded and you get acces to the server controller here.
- The constructor should only be used to store static globals, since you dont know 


### Init ()
- Runs once when the Klister server starts
- Can contain a worker loop for polling external API:s or init your DB connection.
- The class that first ran Init() is stored in the this.Controller.Plugins['your-plugin-name']
- Other plugins may not be loaded at this point.


### Run(session, command, response)
- Allocates a unique class with Run() for every session
- All your Inited data (Eg. MySQL, global vars, trackers...) is avaliable in this.Controller.Plugin['your-plugin-name']
- The parameter command is a json structure following the Klister.io pattern
- The parameter Session is a REST or WebSocket connection with a paretn Device. 
	- In the session, you can access metadata connected to the Device and User added by Klister.io and other plugins.
	- The response.Send({}) function sends the answer to the client.
	- REST/HTTP needs you to call response.Send({}) at least once to close the current request and end lingering.


# Publishing and using your plugin

To use your plugin with your Klister.io server, use the following steps:


1. **Choose a good name for you plugin.** 


The name will also be the command name inside the api. You need to name yor plugin with the 'klister-' prefix for it to work. When your klister server starts, it looks for all dependencies with the 'klister-' prefix and loads them automatically. You can not have two plugins with the same name activated at the same time. 

	### Working names
	```
	klister-hello-world
	klister-ilovecats
	klister-mycompany
	```

	### Not working names
	```
	hello-world
	ilovecats-klister
	company-klister-api
	```


2. **Create a repo on GitHub and upload your plugin**


containing at least a main.js and a package.json. If you want to use a private repo, be shure to add `private:true` to your package.json. Read more about using private repos with npm here: https://stackoverflow.com/questions/10386310/how-to-install-a-private-npm-module-without-my-own-registry


3. **Install the plugin.** 


If you use a public repo, just go into your Klister.io Klister-server folder and install the plugin:

**Production**
You should run the public commited version of your plugin in production to avoid data loss.
```
npm install git://github.com/your-ghithub-username/your-repo-name.git
```

**Development**
When you develop, you might want to run your plugin locally to avoid commiting every step of the way. You can achieve that by running `npm link`or by adding your local path directly to the `package.json` like this:
```
"dependencies": {
    "klister-myplugin": "file:../path/to/plugin"
}
```

This will add your repo as a dependency in you Klister-server installation. If you do updates to your repo in the future, all you need to do is run `npm install` in the klister-server folder again and restart the server, and you are up to date.


4. **Restart your klister server.** Depending on platform, look at the current documentation.


5. **Try it out with your favorie HTTP client.** You should have yor working plugin now!
