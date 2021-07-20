const { React } = require('powercord/webpack');
const { Divider, Tooltip, Button } = require('powercord/components');
const { SwitchItem, TextInput } = require('powercord/components/settings');

const fs = require('fs')
const path = require('path');

module.exports = class CryptoSettings extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            public: this.props.getSetting('public', false),
            fiat: this.props.getSetting('defaultFiat', 'usd,gbp,eur'),
            crypto: this.props.getSetting('defaultCrypto', 'bitcoin'),
            api: this.props.getSetting('cryptoAPI', 'coingecko'),
        }
    }

    render() {
        return <>
            <div>
                <SwitchItem 
                    note="Send powercord-crypto messages publically"
                    value={this.state.public}
                    onChange={() => {
                        this.setState({public: !this.state.public})
                        this.props.toggleSetting('public')
                    }}
                >
                    Public messages
                </SwitchItem>
                <TextInput
                note = "Comma separated fiat currencies. Used as default in rate."
                defaultValue = {this.state.fiat}
                onChange = {(value) => {
                    this.setState({ fiat: value })
                    this.props.updateSetting('defaultFiat', value)
                }}
                >
                    Default Fiat currencies
                </TextInput>
                <TextInput
                note = "Default cryptocurrency. Used in convert."
                defaultValue = {this.state.crypto}
                onChange = {(value) => {
                    this.setState({ crypto: value })
                    this.props.updateSetting('defaultCrypto', value)
                }}
                >
                    Default cryptocurrency
                </TextInput>
                <TextInput
                defaultValue = {this.state.api}
                onChange = {(value) => {
                    this.setState({ api: value })
                    this.props.updateSetting('defaultAPI', value)
                }}
                >
                    Price & Exchange API
                </TextInput>
            </div>
        </>
    }
}