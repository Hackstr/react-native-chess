/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Board, Constants, helper, Sound } from 'react-native-chess';
import { Chess } from 'chess.js';

console.log(Sound);

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Example extends Component {

  constructor() {
    super();
    this.game = new Chess();
    this.state = {
      hist: [ { turn: Constants.WHITE, capturedPieces: []}],
    };
  }

  turnComplete(lastMove) {

    const capturedPieces = this.currentMove().capturedPieces.slice(); // need slice, because need new array ref

    if (lastMove.captured) {
      capturedPieces.push(lastMove.captured);
    }

    const move = { turn: this.game.turn() === 'b' ? Constants.BLACK : Constants.WHITE, capturedPieces}
    const hist = this.state.hist;
    hist.push(move);

    this.setState({ hist });
  }

  moveCallback(row, column, lastMove) {
    Sound.move.play();
  }

  currentMove() {
    return this.state.hist[this.state.hist.length - 1];
  }

  captureCallback(capturedPiece) {

  }

  undo() {
    if (this.state.hist.length > 1) {
      const hist = this.state.hist.slice(0, -1); // new hist
      this.game.undo();
      this.refs.Board.resetState();
      this.setState({ hist });
    }

  }

  renderCapture(captureColor) {
    return this.currentMove().capturedPieces.filter( item => item.color === captureColor ).map((filteredItem, index) => {
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
    console.log(this.state.hist);
    return (
      <View style={[styles.container]}>
        <View style = {[styles.boardContainer]}>
          <Text> { this.renderCapture('#FFFFFF')} </Text>
        </View>
        <TouchableWithoutFeedback onPress={this.undo.bind(this)}>
          <View>
            <Text>
              Undo
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Board
            turn={this.currentMove().turn}
            ref={'Board'}
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

export default Example;
