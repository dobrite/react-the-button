import React from "react/addons"
import TheButton from "./TheButton"

const h = 'cede9d1759dd8a1508b633610c1dec7910d782bb'
const e = '1430879171'

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

  componentDidUnmount() {
    this.ws.close()
  }

  handleMessage(e) {
    this.setState({
      count: this.secondsLeft(e.data)
    })
  }

  get url() {
    return `wss://wss.redditmedia.com/thebutton?h=${h}&e=${e}`
  }

  secondsLeft(data) {
    return JSON.parse(data).payload.seconds_left
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
