
import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  Text,
  Image,
  Animated
} from 'react-native';
import { getPosibleMoves, debugBorder, isEmpty, pieceHelper } from './Helper';

const { width, height } = Dimensions.get('window');

class Piece extends Component {

  constructor() {
    super();
  }

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

    this.props.onPieceSelect(this.props.row, this.props.column, this.props.color, this.props.piece, hasMoves);
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
        <TouchableOpacity style={[{ flex: 1 }, styles.container, containerStyle]} onPress={this.onPress.bind(this)} ref="this">
            <Text
              style={[styles.text, textStyle, this.getPieceTranfrom()]}
            >
              {pieceHelper(this.props.piece)}
            </Text>
        </TouchableOpacity>
      );
    }
      return (
        <View style={[styles.container, containerStyle]} ref='this'>
            <Text
              style={[styles.text, textStyle, this.getPieceTranfrom()]}
            >
              {pieceHelper(this.props.piece)}
            </Text>
        </View>
      );
  }

  // moveAnimation() {
  //   Animated.timing(          // Uses easing functions
  //      this.state.fadeAnim,    // The value to drive
  //      {toValue: 1}            // Configuration
  //    ).start();
  // }
  //
  // componentDidMount() {
  //   if(!isEmpty(this.props.lastMove)) {
  //     console.log(this.props.lastMove);
  //     this.moveAnimation();
  //   }
  // }
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
