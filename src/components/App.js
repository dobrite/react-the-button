import React from "react/addons"
import TheButton from "./TheButton"

const h = 'df843eab1f45bb2d0c5c262bc1f0c35ecb60f056'
const e = '1430190206'

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
