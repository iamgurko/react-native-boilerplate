import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    bßor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
