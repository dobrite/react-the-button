import React from "react/addons"
import ReactART from "react-art"

const { Group, Shape, Surface } = ReactART
const config = {
  centerX: 200,
  centerY: 200,
  startX: 200,
  startY: 20,
  arcRadiiX: 180,
  arcRadiiY: 180,
  clockwiseFlag: 1
}

class TheButton extends React.Component {
  get radians() {
    return 2 * Math.PI
  }

  get slice() {
    return (this.radians * (45 - this.props.count)) / 60
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
    return this.cos * config.arcRadiiX + config.centerX
  }

  get y() {
    return this.sin * config.arcRadiiX + config.centerY
  }

  get longArcFlag() {
    return (this.props.count < 30) ? 1 : 0
  }

  get color() {
    const count = this.props.count

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
      M${config.centerX},
        ${config.centerY}
      L${config.startX},
        ${config.startY}
      A${config.arcRadiiX},
        ${config.arcRadiiY}
      0
      ${this.longArcFlag},
        ${config.clockwiseFlag}
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
