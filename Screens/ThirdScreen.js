import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Header from '../Components/Header'

function ThirdScreen({route, navigation}) {
  const {creatorFullname, creatorImage, creatorComic} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Header 
      text = "CHARACTER DETAILS"
      onPress={() => navigation.goBack()}/>

      <View>
        <ScrollView>
        <View style={{margin: 5}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image}
              source={{
                uri: `${creatorImage.path}.${creatorImage.extension}`,
              }}
            />
            <View style={{alignItems: 'center', flex: 1, margin: 5}}>
              <Image
                style={{width: 100, height: 40, resizeMode: 'cover'}}
                source={require('../assets/MarvelNewLogo.png')}
              />
              <Text style={styles.text}>
                THE NEXT GENERATION OF ELITE ARTIST
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  margin: 5,
                  alignItems: 'center',
                }}>
                <Text style={styles.textStyle}>{creatorFullname}</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.header}>{creatorFullname}</Text>
            <Text style={styles.header}>:Comics</Text>
          </View>
          <View>
            {creatorComic ? (
              <FlatList
                data={creatorComic?.items}
                keyExtractor={(item, index) => `key_${index}`}
                renderItem={({item}) => {
                  return (
                    <View>
                      <View
                        style={{
                          backgroundColor: 'red',
                          margin: 2,
                          borderRadius: 5,
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'white',

                            borderRadius: 5,
                          }}>
                          {item?.name}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            ) : null}
          </View>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}
export default ThirdScreen;

const styles = StyleSheet.create({
  image: {
    height: 280,
    width: 180,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    marginTop: 40,
  },
  text: {
    color: 'white',
    marginTop: 10,
  },
});
