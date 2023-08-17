import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackgroundSvg from '../asserts/svgs/BgImg';
import imagesClass from '../asserts/imagepath';
import { TouchableOpacity } from 'react-native-gesture-handler';
const TopHeader = ({ name, back, navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', flex: 1, }} >
                {/* <BackgroundSvg /> */}
                <Image source={imagesClass.headerbg} style={{ height: hp(50), width: '100%', position: 'absolute', flex: 1 }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(3) }}>
                {back === true ?
                    <TouchableOpacity onPress={() => navigation.pop()} >
                        <Image source={imagesClass.backScreen} style={styles.backstyle} />
                    </TouchableOpacity>
                    : null}
                <Text
                    style={styles.headetxt}>
                    {name}
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default TopHeader
const styles = StyleSheet.create({
    backstyle: { width: wp(10), height: hp(8), resizeMode: 'center', marginLeft: wp(8), tintColor: '#000' },
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginLeft: wp(4),
    },
    container: { flex: 1, width: '100%' },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
})