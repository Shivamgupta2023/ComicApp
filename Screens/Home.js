import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {getComicList} from '../redux/Action';
import {getCharacterList} from '../redux/Action';
import {getNewComicList} from '../redux/Action';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CharacterView from '../Components/CharacterView';
import SearchBar from '../Components/SearchBar';
import BottomSheetView from '../Components/BottomSheetView';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation}) => {
  const [selComics, setSelComics] = useState(null);
  const [showDropComponent, setShowDropComponent] = useState(false);
  const [comicData, setComicData] = useState([]);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [val, setVal] = useState([]);
  const [count, setCount] = useState(20);
  const [selectBottom, setSelectBottom] = useState([]);
  const [selectHomeView, setSelectHomeView] = useState([]);
  const [selectBookmark, setSelectBookmark] = useState([]);

  const comicArray = useSelector(state => state?.comicListReducer?.characters);

  const isLoading = useSelector(
    state => state?.comicListReducer?.isLoading ?? true,
  );

  const isNewComicLoading = useSelector(
    state => state?.comicListReducer?.isNewComicLoading ?? false,
  );

  const isComicLoading = useSelector(
    state => state?.CharListReducer?.isComicLoading ?? true,
  );

  const charArray = useSelector(state => state?.CharListReducer);

  useEffect(() => {
    if (charArray) {
      setData(charArray?.comic?.data?.results);
      setVal(charArray?.comic?.data?.results);
    }
  }, [charArray]);

  const searchUser = text => {
    if (text) {
      const newDataText = data?.filter(function (item) {
        const itemData = item?.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      
      });

      setData(newDataText);
      setSearch(text);
    } else {
      setData(val);
      setSearch(text);
    }
  };

  useEffect(() => {
    if (selComics) {
      bottomSheetRef?.current?.snapToIndex(0);
    }
  }, [selComics]);

  useEffect(() => {
    if (charArray) {
      bottomSheetRef?.current?.snapToIndex(0);
    }
  }, [charArray]);

  useEffect(() => {
    if (comicArray) {
      setComicData(comicArray);
    }
  }, [comicArray]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComicList());
  }, []);

  const passCharID = charId => {
    dispatch(getCharacterList({charId}));
  };

  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const selectArray = item => {
    if (selectBottom.includes(item)) {
      const bottomArr = selectBottom.filter(items => items !== item);
      setSelectBottom(bottomArr);
    } else {
      setSelectBottom([item]);
    }
  };

  const selectHomeArray = item => {
    if (selectHomeView.includes(item)) {
      const homeArr = selectHomeView.filter(items => items !== item);
      setSelectHomeView(homeArr);
    } else {
      setSelectHomeView([item]);
    }
  };

  const callApi = offset => {
    dispatch(getNewComicList({offset, comicData}));
    setCount(offset + 20);
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('ComicKey2303', JSON.stringify(value));
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('ComicKey2303');
    
      if (value) {
        console.log(value);
        setSelectBookmark({...value});
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {isLoading ? (
        <View style={styles.loader}>
          <Image
            style={{width: 100, height: 40, resizeMode: 'cover'}}
            source={require('../assets/MarvelNewLogo.png')}
          />
          <View style={{marginTop: 50}}>
            <ActivityIndicator color={'white'} size={'large'} />
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 25, color: 'white'}}>
              MARVEL CHARACTERS
            </Text>
          </View>
          {
            <FlatList
              data={comicArray}
              numColumns={2}
              keyExtractor={(item, index) => `key_${index}`}
              onEndReached={() => callApi(count)}
              renderItem={({item}) => {
                return (
                  <CharacterView
                    style={{
                      borderRadius: 12,
                      backgroundColor: selectHomeView.includes(item)
                        ? 'orange'
                        : 'red',
                    }}
                    onPress={() => {
                      setSelComics(item?.comics?.items);
                      setShowDropComponent(true);
                      passCharID(item?.id);
                      selectHomeArray(item);
                      storeData(item?.name);
                    }}
                    text={item?.name}
                    image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  />
                );
              }}
            />
          }
          {isNewComicLoading ? (
            <ActivityIndicator color={'white'} size={'large'} />
          ) : null}

          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            backdropComponent={props =>
              showDropComponent ? (
                <TouchableWithoutFeedback
                  {...props}
                  onPress={() => {
                    setShowDropComponent(false);
                    bottomSheetRef?.current?.close();
                  }}>
                  <View
                    style={[
                      props.style,
                      {
                        backgroundColor: '#172B4D80',
                      },
                    ]}
                  />
                </TouchableWithoutFeedback>
              ) : null
            }
            onChange={handleSheetChanges}
            snapPoints={['60%', '100%']}>
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}>
              {isComicLoading ? (
                <ActivityIndicator color={'red'} size="large" />
              ) : (
                <View style={{backgroundColor: 'black', flex: 1}}>
                  <SearchBar
                    value={search}
                    onChangeText={text => {
                      searchUser(text);
                    }}
                  />
                  {data?.map((item, ind) => (

                    <BottomSheetView
                      key={`key${ind}`}
                      style={{
                        borderRadius: 12,
                        flexDirection: 'row',
                        backgroundColor: selectBottom.includes(item)
                          ? 'orange'
                          : 'red',
                      }}
                      onPress={() => {
                        navigation.navigate('SecondScreen', {
                          comicTitle: item?.title,
                          comicImage: item?.thumbnail,
                          comicDescription: item?.description,
                          comicOnSaleDate: item?.dates,
                          comicCreators: item?.creators,
                          comicId: item?.id,
                        });
                        selectArray(item);
                      }}
                      img={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      title={item?.title}
                    />
                  ))}
                </View>
              )}
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
  },
  comicView: {
    backgroundColor: 'red',
    width: 180,
    borderRadius: 12,
    elevation: 8,
    margin: 7,
  },
  comicList: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 8,
    heigth: 80,
  },
  mainTitle: {
    fontSize: 20,
    marginLeft: 50,
    marginTop: 20,
    flexDirection: 'row',
  },

  chatIconStyle: {
    fontSize: 30,
    color: 'black',
    marginleft: 200,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
    marginTop: 10,
  },
  contentContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: 'pink',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
