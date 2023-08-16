import React, { useRef, useEffect } from 'react';
import imagesClass from '../asserts/imagepath';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SwipList from '../Components/SwipList';
import BackgroundSvg from '../asserts/svgs/BgImg.js';
import BoxeItems from '../Components/BoxeItems';
import NoticationSvg from '../asserts/svgs/NoticationSvg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BoxList = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundContainer}>
          <BackgroundSvg />
        </View>


        <View style={styles.topTexts}>

          <View style={styles.toptxt}>
            <Text>
              Hey, </Text>
            <Text style={styles.maintxt}>
              Here is best cricket box nearby you
            </Text>
          </View>
        </View>
        <View style={styles.swipest}>
          <SwipList />
        </View>

        <BoxeItems navigation={navigation} />

        {/* <View style={styles.botttombg}>
          <BackgroundSvg />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, height: '100%'
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%'
  },
  topTexts: { marginLeft: wp(6), marginTop: wp(10), flexDirection: 'row', justifyContent: 'space-between', padding: wp(4), },
  imageStyle: {
    width: wp(8),
    height: hp(4),
    justifyContent: 'center',
    alignSelf: 'center', marginTop: wp(2), marginRight: wp(3), color: 'yellow'

  }, botttombg: {
    bottom: 0, position: 'absolute', transform: [{ rotate: '180deg' }], flex: 1,

  },
  toptxt: { width: "85%" }, maintxt: { fontWeight: 'bold', color: '#000', fontSize: wp(6), marginBottom: wp(5), fontSize: wp(5) },
  swipest: { width: "100%", height: wp(50), },



});

export default BoxList;
