import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function BottomSheetView({key, style, onPress, img,title}) {
  return (
    <View style={styles.comicList} key={key}>
      <TouchableOpacity style={style} onPress={onPress}>
        <Image
          style={styles.bottomImage}
          source={{
            uri: img,
          }}
        />
        <Text
          numberOfLines={2}
          style={styles.bottomText}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  comicList: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 8,
    heigth: 80,
  },
  bottomImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  bottomText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    margin: 8,
  }
});
