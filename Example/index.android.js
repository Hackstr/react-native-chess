/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Board, Constants, helper } from './testBorder/index';
import { Chess } from 'chess.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Example extends Component {

  constructor() {
    super();
    this.game = new Chess();
    this.state = {
      turn: Constants.WHITE,
      capturedPieces: [],
      undo: null
    };
  }

  turnComplete() {
    this.setState({ turn: this.game.turn() === 'b' ? Constants.BLACK : Constants.WHITE })
  }

  moveCallback(row, column, lastMove) {
  }

  captureCallback(capturedPiece) {
    const capturedPieces = this.state.capturedPieces;
    capturedPieces.push(capturedPiece);
    this.setState({ capturedPieces });
  }

  undo() {
    this.setState({ undo: this.game.undo()});
  }

  renderCapture(captureColor) {
    return this.state.capturedPieces.filter( item => item.color === captureColor ).map((filteredItem, index) => {
      return (
        <Text
          key = { index }
        >
          { filteredItem.type }
        </Text>
      );
    });
  }



  render() {
    return (
      <View style={[styles.container]}>
        <View style = {[styles.boardContainer]}>
          <Text> { this.renderCapture('#FFFFFF')} </Text>
        </View>
        <View>
          <Board
            turn={this.state.turn}
            turnComplete={this.turnComplete.bind(this)}
            isVerified = {true}
            moveCallback = { this.moveCallback }
            captureCallback = { this.captureCallback.bind(this) }
            twoPlayer = { false }
            playerColor = { Constants.WHITE }
            isRotate = { false }
            game={this.game}
          />
        </View>
        <View style = {[styles.boardContainer]}>
          <Text> { this.renderCapture('#000000')} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardContainer: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Example', () => Example);
