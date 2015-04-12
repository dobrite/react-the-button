import React from "react/addons"
import ReactART from "react-art"

const { Group, Shape, Surface } = ReactART

class TheButton extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      centerX: 200,
      centerY: 200,
      startX: 200,
      startY: 20,
      arcRadiiX: 180,
      arcRadiiY: 180,
      count: 60,
      longArcFlag: 0,
      clockwiseFlag: 1
    }
  }

  componentWillMount() {
    this.ws = new window.WebSocket("wss://wss.redditmedia.com/thebutton?h=5d3af0ae97eb4d9f1cfcf205816d5f349343f524&e=1428958634")
  }

  componentDidMount() {
    this.ws.onmessage = this.handleMessage.bind(this)
  }

  handleMessage(e) {
    this.setState({ count: JSON.parse(e.data).payload.seconds_left })
  }

  get radians() {
    return 2 * Math.PI
  }

  get slice() {
    return (this.radians * (45 - this.state.count)) / 60
  }

  get sin() {
    // y
    return Math.sin(this.slice)
  }

  get cos() {
    // x
    return Math.cos(this.slice)
  }

  get x() {
    return this.cos * this.state.arcRadiiX + this.state.centerX
  }

  get y() {
    return this.sin * this.state.arcRadiiX + this.state.centerY
  }

  get longArcFlag() {
    return (this.state.count < 30) ? 1 : 0
  }

  get color() {
    const count = this.state.count

    if (count > 51) {
      return "#820080" // purple
    } else if (count > 41) {
      return "#0083C7" // blue
    } else if (count > 31) {
      return "#02be01" // green
    } else if (count > 21) {
      return "#E5D900" // yellow
    } else if (count > 11) {
      return "#E59500" // orange
    } else {
      return "#E50000" // red
    }
  }

  get path() {
    return `
      M${this.state.centerX},
        ${this.state.centerY}
      L${this.state.startX},
        ${this.state.startY}
      A${this.state.arcRadiiX},
        ${this.state.arcRadiiY}
      0
      ${this.longArcFlag},
        ${this.state.clockwiseFlag}
      ${this.x},
        ${this.y}
      Z
    `
  }

  render() {
    return (
      <Surface
        width="400"
        height="400"
      >
        <Group>
          <Shape
            stroke={this.color}
            fill={this.color}
            d={this.path}
          />
        </Group>
      </Surface>
    )
  }
}

export default TheButton
