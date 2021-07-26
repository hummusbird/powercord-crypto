const { React, getModule } = require('powercord/webpack');
const { Divider, Tooltip, Button } = require('powercord/components');
const { SwitchItem, TextInput, SelectInput, Category, SliderInput } = require('powercord/components/settings');

const fs = require('fs')
const path = require('path');

var data = fs.readFileSync(path.resolve(__dirname, '../data/crypto.json'), 'utf8')
const cryptocurrencies = JSON.parse(data)


const { AsyncComponent } = require("powercord/components")
module.exports = AsyncComponent.from((async () => {
    let uid = window.DiscordNative.crashReporter.getMetadata().user_id;
    const { getUser } = await getModule(["getUser"], true)
    let userInfo = await getUser(uid)
    let nitro = false;
    if (userInfo.premiumType == 2) {nitro = true}
    return class CryptoSettings extends React.PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                categoryOpen: false,
                public: this.props.getSetting('public', false),
                fiat: this.props.getSetting('defaultFiat', 'usd,gbp,eur'),
                crypto: this.props.getSetting('defaultCrypto', 'bitcoin'),
                timescale: this.props.getSetting('defaultTimescale', 14),
                longChart: this.props.getSetting('longChart', false),

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
                            if (!nitro) {this.props.updateSetting('longChart', false)}
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
                    {nitro || !this.props.getSetting('public', false) ?
                        <SwitchItem
                            note="Print larger 32 line charts"
                            value={this.state.longChart}
                            onChange={() => {
                                this.setState({ longChart: !this.state.longChart })
                                this.props.toggleSetting('longChart')
                            }}
                        >
                            Larger charts
                        </SwitchItem> :
                        <SwitchItem
                            disabled
                            note="You must have nitro to use this feature!"
                            value={this.state.longChart}
                            onRender={this.setState({ longChart: false })}
                        >
                            Larger charts
                        </SwitchItem>
                    }
                </div>
            </>
        }
    }
})
    ()
)