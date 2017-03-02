import React, { Component } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback, View, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

class Square extends Component {

  borderDraw() {
    const color = this.props.isPiece ? 'red' : 'yellow';
    return {
      borderColor: color,
      borderWidth: 3,
    };
  }

  squareDraw() {
    const { row, column, hasMoves, selectedPiece } = this.props;
    const selected = selectedPiece != null && selectedPiece.row === row && selectedPiece.column === column;
    const selectedHasMoves = selected && selectedPiece.hasMoves;

    const color = column % 2 === 1 ?
      (row % 2 === 1 ? '#f0d9b5' : '#b58863') :
      (row % 2 === 1 ? '#b58863' : '#f0d9b5');

    return {
      backgroundColor: selected ? selectedHasMoves ? '#376060' : 'red' : color,
      width: width / 8,
      height: width / 8
    };
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
            style = {{ width: width / 16.8, height: height / 16.8, alignSelf: 'center' }}
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
            style={this.squareDraw()}
          />
      </TouchableWithoutFeedback>
    );
  }

}

export default Square;
