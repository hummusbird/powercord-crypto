const { React } = require('powercord/webpack');
const { Divider, Tooltip, Button } = require('powercord/components');
const { SwitchItem, TextInput, SelectInput, Category, SliderInput } = require('powercord/components/settings');

const fs = require('fs')
const path = require('path');

var data = fs.readFileSync(path.resolve(__dirname, '../data/crypto.json'), 'utf8')
const cryptocurrencies = JSON.parse(data)

module.exports = class CryptoSettings extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            categoryOpen: false,
            public: this.props.getSetting('public', false),
            fiat: this.props.getSetting('defaultFiat', 'usd,gbp,eur'),
            crypto: this.props.getSetting('defaultCrypto', 'bitcoin'),
            timescale: this.props.getSetting('defaultTimescale', 14),

            minDays: 1,
            maxDays: 365,
            markers: [1, 14, 28, 50, 100, 200, 365],
        };
    }

    render() {
        return <>
            <div>
                <SwitchItem
                    note="Send powercord-crypto messages publically"
                    value={this.state.public}
                    onChange={() => {
                        this.setState({ public: !this.state.public })
                        this.props.toggleSetting('public')
                    }}
                >
                    Public messages
                </SwitchItem>

                <Category
                    name='Defaults'
                    description={'Default cryptocurrency, used in all functions'}
                    opened={this.state.categoryOpen}
                    onChange={() => {
                        this.setState({ categoryOpen: !this.state.categoryOpen })
                    }}
                >
                    <TextInput
                        note="Comma separated fiat currencies."
                        defaultValue={this.state.fiat}
                        onChange={(value) => {
                            this.setState({ fiat: value })
                            this.props.updateSetting('defaultFiat', value)
                        }}
                    >
                        Default Fiat currencies
                    </TextInput>
                    <SelectInput
                        value={this.state.crypto}
                        onChange={(value) => {
                            this.setState({ crypto: value.value })
                            this.props.updateSetting('defaultCrypto', value.value)
                        }}
                        options={cryptocurrencies.map(({ label, value }) => ({
                            label, value,
                        }))}
                    >
                        Default cryptocurrency
                    </SelectInput>
                </Category>
                <SliderInput
                    minValue={this.state.minDays}
                    maxValue={this.state.maxDays}
                    markers={this.state.markers}
                    onMarkerRender={value => <span>{value}</span>}
                    initialValue={this.state.timescale}
                    onValueChange={val => this.props.updateSetting('defaultTimescale', Math.round(val))}
                    onValueRender={val => <span>{Math.round(val)} days</span>}
                    note="Default timescale for Chart function"
                >
                    Default Timescale
                </SliderInput>
            </div>
        </>
    }
}