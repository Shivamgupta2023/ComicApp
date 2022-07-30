import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({text, onPress}) {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity>
        <Icon name="chevron-left" style={styles.iconStyle} onPress={onPress} />
      </TouchableOpacity>
      <View style={styles.textTitle}>
        <Text style={styles.header}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  textTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    fontSize: 40,
    color: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
