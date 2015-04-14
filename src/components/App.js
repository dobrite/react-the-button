import React from "react/addons"
import TheButton from "./TheButton"

const h = 'bbc13d5d4091be61563dba995aa00351bb9133a1'
const e = '1429070360'

class App extends React.Component {
  constructor(props, state) {
    super(props, state)
    this.state = {
      count: 60
    }
  }

  componentWillMount() {
    this.ws = new window.WebSocket(this.url)
  }

  componentDidMount() {
    this.ws.onmessage = this.handleMessage.bind(this)
  }

  handleMessage(e) {
    this.setState({
      count: JSON.parse(e.data).payload.seconds_left
    })
  }

  get url() {
    return `wss://wss.redditmedia.com/thebutton?h=${h}&e=${e}`
  }

  render() {
    return (
      <TheButton
        count={this.state.count}
      />
    )
  }
}

export default App
