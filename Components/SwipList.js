import React, { useRef, useEffect } from 'react';
import imagesClass from '../asserts/imagepath';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import FastImage from 'react-native-fast-image';

const SwipList = ({ boxData }) => {
  const flatListRef = useRef(null);
  // const imagesFromPositionOne = boxData.slice(1).map(item => item.image);
  const extractedImages = [];
  // Check if the item has an "images" property and it's an array
  if (boxData.length > 0) {
    const firstItem = boxData[0];

    // Check if the first item has an "images" property and it's an array
    if (firstItem.images && Array.isArray(firstItem.images)) {
      for (let i = 2; i < firstItem.images.length; i++) {
        extractedImages.push(firstItem.images[i]); // You may need to specify the exact image property here
      }
      // Iterate through the images array of the first item and add each image to 'extractedImages'
      // firstItem.images.forEach(image => {
      //   extractedImages.push(image); // You may need to specify the exact image property here
      // });
    }
  }

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = currentIndex === extractedImages.length - 1 ? 0 : currentIndex + 1;
        const itemWidth = wp(90) + wp(2); // Adjust this value based on your image width and margin
        const offset = nextIndex * itemWidth;
        flatListRef.current.scrollToOffset({ offset, animated: true });
        currentIndex = nextIndex;
      }
    }, 3000); // Change the delay according to your needs

    return () => clearInterval(timer);
  }, [extractedImages]); // Listen for changes in boxData

  const renderItem = ({ item, index }) => {
    const imageUrl = item.url; // Extract the image URL from the object
    console.log(imageUrl, "=== ", index);
    return (
      <View style={styles.imageContainer}>
        <FastImage
          source={{
            uri: imageUrl, priority: FastImage.priority.high,
          }} style={styles.image} resizeMode='cover' />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={extractedImages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          getItemLayout={(_, index) => ({
            length: wp(90), // Adjust this value based on your image width
            offset: wp(90) * index, // Adjust this value based on your image width
            index,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  image: {
    width: wp(90),
    height: hp(23),
    backgroundColor: '#000',
    marginHorizontal: wp(1),
    borderRadius: wp(6),

  },
  contentContainer: {
    paddingHorizontal: wp(4),
    borderRadius: wp(4),
  },
});

export default SwipList;
