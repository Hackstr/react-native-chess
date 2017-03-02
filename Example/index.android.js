/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Board, Constants } from 'react-native-chess';
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
    };
  }

  turnComplete() {
    this.setState({ turn: this.game.turn() === 'b' ? Constants.BLACK : Constants.WHITE })
  }

  moveCallback() {

  }

  captureCallback(capturedPiece) {
    const capturedPieces = this.state.capturedPieces;
    capturedPieces.push(capturedPiece);
    this.setState({ capturedPieces });
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
      <View style={[styles.container, this.debugBorder('red')]}>
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
            playerColor = { Constants.BLACK }
            isRotate = { true }
            game={this.game}
          />
        </View>
        <View style = {styles.boardContainer}>
          <Text> { this.renderCapture('#000000')} </Text>
        </View>
      </View>
    );
  }

  debugBorder(color) {
    return {
      borderColor: color,
      borderWidth: 2,
    }
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
