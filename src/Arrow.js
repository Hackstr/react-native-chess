import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  Text,
  Image
} from 'react-native';
import { getPosibleMoves, debugBorder } from './Helper';
import Victor from 'victor';

import Svg,{
    Line,
    Polygon,
} from 'react-native-svg';

class Arrow extends Component {

  setArrowValues() {
    const from = this.props.from;
    const to = this.props.to;

    const cellWidth = this.props.width / 8; //widht and height
    const cellHeight = cellWidth;

    const tempFrom = {
      x: (from.row * cellWidth) + cellWidth / 2,
      y: (from.column * cellHeight) + cellHeight / 2,
    };

    const tempTo = {
      x: (to.row * cellWidth) + cellWidth / 2,
      y: (to.column * cellHeight) + cellHeight / 2,
    };

    const testVector = new Victor(tempFrom.x - tempTo.x, tempFrom.y - tempTo.y);
    const rotateAngle = testVector.horizontalAngleDeg();

    const vectr = {x: tempTo.x - tempFrom.x, y: tempTo.y - tempFrom.y };

    return { arrow: { from: tempFrom, to: tempTo, rotateAngle }};
  }

  render() {
    const { from, to, rotateAngle } = this.setArrowValues().arrow;

    const rectStyle = {
        position: 'absolute',
        zIndex: 1,
        transform: [
          {rotateY: "180deg"},
          {rotate: "90deg"}
        ],
    };

    const polygonPoints = `${to.x},${to.y - 10} ${to.x - 10},${to.y} ${to.x},${to.y + 10}`;
    const origin = `${to.x}, ${to.y}`;

    return (
      <View
        pointerEvents="none" style={rectStyle}
      >
        <Svg
            height= { this.props.width }
            width= { this.props.width }
        >
          <Line
            x1={ from.x }
            y1={ from.y }
            x2={ to.x }
            y2={ to.y }
            stroke="green"
            strokeWidth="3"
          />
          <Polygon
            points={ polygonPoints }
            fill="green"
            strokeWidth="1"
            rotate={ rotateAngle }
            origin={ origin }
          />
        </Svg>
      </View>
    );
  }

}

export default Arrow;
