import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import imagesClass from '../asserts/imagepath'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const TimeComp = ({ img, text }) => {

    return (
        <View style={styles.mainstyle}>
            <Image
                source={img}
                style={styles.clocks}
                resizeMode="cover"
            />
            <Text style={styles.textStyle}>{text}</Text>
        </View>
    )
}

export default TimeComp

const styles = StyleSheet.create({
    mainstyle: {
        width: "100%", height: hp(3), flexDirection: 'row', alignItems: 'center', marginHorizontal: wp(4)
    },
    textStyle: {
        width: 'auto',
        height: 'auto',
        fontSize: wp(4),
        marginLeft: wp(2)
    },
    clocks: {
        width: wp(5),
        height: wp(5),
    },

})

