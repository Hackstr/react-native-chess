import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { debugBorder, pieceHelper } from './Helper';
const { width, height } = Dimensions.get('window');

class PromotionView extends Component {

  constructor() {
    super();
  }

  rectStyle() {
    return {
      zIndex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0, left: 0, right: 0, bottom: 0,
    }
  }

  getPieceTranfrom() {
    const degree = (this.props.isRotate) ? '180deg' : '0deg';
    return {
      transform: [
        { rotateX: degree },
      ]
    };
  }

  render() {
    const textStyle = {
      color: this.props.color,
    };

    return (
        <View style = {[this.rectStyle(), this.getPieceTranfrom()]}>
          <View style={ styles.promotionHolder }>

            <TouchableOpacity onPress={()=>{
                this.props.promotionCallback('q');
              }}>
              <Text style={[textStyle, styles.text]}> {pieceHelper('q')} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                this.props.promotionCallback('n');
              }}>
              <Text style={[textStyle, styles.text]}> {pieceHelper('n')} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                this.props.promotionCallback('b');
              }}>
              <Text style={[textStyle, styles.text]}> {pieceHelper('b')} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                this.props.promotionCallback('r');
              }}>
              <Text style={[textStyle, styles.text]}> {pieceHelper('r')} </Text>
            </TouchableOpacity>

          </View>
        </View>
    );
  }
}

const styles = {
  promotionHolder: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  text: {
    fontSize: height / 16.8,
    textAlign: 'center',
    alignSelf: 'center',
  },
}

export default PromotionView;
