
import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  Text,
  Image
} from 'react-native';
import PieceHelper from './PieceHelper';
import { getPosibleMoves, debugBorder } from './Helper';

const { width, height } = Dimensions.get('window');

class Piece extends Component {

  getPieceTranfrom() {
    const degree = (this.props.isRotate) ? '180deg' : '0deg';
    return {
      transform: [
        { rotateX: degree },
      ]
    };
  }

  onPress() {
    let hasMoves = false;
    if (getPosibleMoves(this.props.game, this.props.row, this.props.column).length > 0) {
      hasMoves = true;
    }

    this.props.onPieceSelect(this.props.row, this.props.column, this.props.color, hasMoves);
  }


  render() {
    const containerStyle = {
      top: this.props.row * (width / 8),
      left: this.props.column * (width / 8)
    };
    const textStyle = {
      color: this.props.color,
    };

    if (this.props.selectable) {
      return (
        <TouchableOpacity style={[{ flex: 1 }, styles.container, containerStyle]} onPress={this.onPress.bind(this)}>
            <Text
              style={[styles.text, textStyle, this.getPieceTranfrom()]}
            >
              {PieceHelper(this.props.piece)}
            </Text>
        </TouchableOpacity>
      );
    }
      return (
        <View style={[styles.container, containerStyle]} ref='this'>
            <Text
              style={[styles.text, textStyle, this.getPieceTranfrom()]}
            >
              {PieceHelper(this.props.piece)}
            </Text>
        </View>
      );
  }
}
const styles = {
    container: {
      position: 'absolute',
      width: width / 8,
      height: width / 8,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      opacity: 1,
      alignItems: 'center'
    },
    text: {
      fontSize: height / 16.8,
      textAlign: 'center',
      alignSelf: 'center',
    },
    pieceStyle: {
      height: height / 16.8,
      width: height / 16.8,
      alignSelf: 'center',
    }
};


export default Piece;
