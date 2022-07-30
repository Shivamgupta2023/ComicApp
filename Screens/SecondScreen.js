import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {getCreatorList} from '../redux/Action';
import moment from 'moment';
import Header from '../Components/Header';

export default function SecondScreen({route, navigation}) {
  const {
    comicImage,
    comicTitle,
    comicDescription,
    comicOnSaleDate,
    comicCreators,
    comicId,
  } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCreatorList({comicId}));
  }, [comicId]);

  const creatorArray = useSelector(state => state?.CreatorListReducer);

  const isCreatorLoading = useSelector(
    state => state?.CreatorListReducer?.isCreatorLoading ?? true,
  );

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {isCreatorLoading ? (
        <View style={styles.loader}>
          <Image
            style={{width: 100, height: 40, resizeMode: 'cover'}}
            source={require('../assets/MarvelNewLogo.png')}
          />
          <View style={{marginTop: 50}}>
            <ActivityIndicator color={'white'} size="large" />
          </View>
        </View>
      ) : (
        <View>
          <ScrollView>
            <Header text="COMIC DETAILS" 
            onPress = {() => navigation.navigate('Home',)} />
            <View style={{flex: 1}}>
              <ScrollView>
                <Text style={styles.comicTitle}>{comicTitle}</Text>
                <Image
                  style={styles.imageView}
                  source={{
                    uri: `${comicImage.path}.${comicImage.extension}`,
                  }}
                />
                <Text style={{marginTop: 5, color: 'white'}}>
                  {comicDescription}
                </Text>

                {comicOnSaleDate ? (
                  <FlatList
                    numColumns={2}
                    data={comicOnSaleDate}
                    keyExtractor={(item, index) => `key_${index}`}
                    renderItem={({item}) => {
                      return (
                        <View style={styles.dateMargin}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                              color: 'white',
                            }}>
                            {item?.type}
                          </Text>
                          <Text style={{color: 'white'}}>
                            {moment(item?.date).format('MMM DD, YYYY')}
                          </Text>
                        </View>
                      );
                    }}
                  />
                ) : null}

                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  Creators
                </Text>

                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  {creatorArray?.creator?.data?.results?.map((item, index) => (
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() => {
                        navigation.navigate('ThirdScreen', {
                          creatorFullname: item?.fullName,
                          creatorImage: item?.thumbnail,
                          creatorComic: item?.comics,
                        });
                      }}>
                      <View style={styles.Creators}>
                        <Text
                          // numberOfLines={1}
                          style={{color: 'white'}}>
                          {item?.fullName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  imageView: {
    width: '100%',
    height: 300,
    marginVertical: 12,
    resizeMode: 'contain',
  },
  comicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dateMargin: {
    margin: 5,
    flex: 1,
  },
  Creators: {
    margin: 5,
    borderRadius: 8,
    elevation: 8,
    backgroundColor: 'red',
    flexWrap: 'wrap',
    flex: 1,
    padding: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'flex-start',
  },
});
