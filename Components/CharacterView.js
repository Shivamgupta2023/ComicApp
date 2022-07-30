import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function CharacterView({style, onPress, text, image}) {
  return (
    <View style={styles.comicView}>
      <TouchableOpacity style={style} onPress={onPress}>
        <View>
          <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'white'}}>
            {text}
          </Text>
          <Image
            style={{
              width: '100%',
              height: 120,
              resizeMode: 'stretch',
              borderRadius: 12,
            }}
            source={{
              uri: image,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  comicView: {
    backgroundColor: 'red',
    width: 180,
    borderRadius: 12,
    elevation: 8,
    margin: 7,
  },
  bookmark:{
    fontSize: 40,
    color: 'white'
  }
});
