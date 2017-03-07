import React, { Component } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, View, Dimensions, Image } from 'react-native';

import { testMesure } from './Helper';

const { width, height } = Dimensions.get('window');

class Square extends Component {

  // borderDraw() {
  //   const color = this.props.isPiece ? 'red' : 'yellow';
  //   return {
  //     borderColor: color,
  //     borderWidth: 3,
  //   };
  // }

  squareDraw() {
    const { row, column, hasMoves, selectedPiece } = this.props;
    const selected = selectedPiece != null && selectedPiece.row === row && selectedPiece.column === column;
    const selectedHasMoves = selected && selectedPiece.hasMoves;

    const color = column % 2 === 1 ?
      (row % 2 === 1 ? '#A3A3A3' : '#888888') :
      (row % 2 === 1 ? '#888888' : '#A3A3A3');

    return {
      backgroundColor: color,
      width: width / 8,
      height: width / 8
    };
  }

  borderDraw() {
    const { row, column, hasMoves, selectedPiece } = this.props;
    const selected = selectedPiece != null && selectedPiece.row === row && selectedPiece.column === column;
    const selectedHasMoves = selected && selectedPiece.hasMoves;

    if (selected) {
      return {
        borderColor: selectedHasMoves ? 'green' : 'red',
        borderWidth: 2,
      };
    }

    if(this.props.selectable && this.props.isPiece) {
      return {
        borderColor: 'red',
        borderWidth: 2,
      }
    }

    return {};
  }

  onPressEmptySquare() {
    const { onPressEmptySquare, row, column } = this.props;

    onPressEmptySquare(row, column)
  }

  onPressSelectable() {
    const { onSquareSelect, row, column } = this.props;
    onSquareSelect(row, column);
  }

  render() {
    const { row, column, selectable } = this.props;

    if (selectable) {
      return (
        <TouchableHighlight style={[this.squareDraw(), this.borderDraw()]} onPress={this.onPressSelectable.bind(this)}>
          <Image
            style = {{ width: width / 16.8, height: height / 16.8, alignSelf: 'center', zIndex: 5}}
            source = { require('./pieces/circle.png')}
          />
        </TouchableHighlight>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={this.onPressEmptySquare.bind(this)}
      >
          <View
            style={[this.squareDraw(), this.borderDraw()]}
          />
      </TouchableWithoutFeedback>
    );
  }

}

export default Square;
