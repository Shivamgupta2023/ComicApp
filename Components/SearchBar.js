import React from 'react';
import {TextInput , StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchBar ({onChangeText,value}) {
    return(
        <View style={styles.containerText}>
          <Icon
            name="text-box-search"
            style={{fontSize: 30, color: 'black'}}
          />
          <TextInput
            style={styles.input}
            value={value}
            placeholder="Search here..."
            onChangeText= {onChangeText}
          />
        </View>
    )
}

const styles = StyleSheet.create ({
    containerText: {
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: '90%',
      },
})