const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');


const Settings = require('./components/Settings');

module.exports = class Crypto extends Plugin {

    async startPlugin() {
        this.loadStylesheet('style.scss');

        powercord.api.commands.registerCommand({
			command: 'crypto',
			description: 'A powercord version of ethernet-bot',
			usage: '{c} for more help',
			executor: this.handleCommand.bind(this)
		});
		
		powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Glasscord Injector',
			render: (props) => React.createElement(Settings, {
                main: this,
                ...props
            })
		});
	}

    pluginWillUnload() {
		powercord.api.settings.unregisterSettings(this.entityID);
	}

    async handleCommand (args) {
    }

}