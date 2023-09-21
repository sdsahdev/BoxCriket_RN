import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackgroundSvg from '../asserts/svgs/BgImg';
import imagesClass from '../asserts/imagepath';
const TopHeader = ({ name, back, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flex: 1 }}>
                <Image
                    source={imagesClass.headerbg}
                    style={{ height: hp(50), width: '100%', position: 'absolute', flex: 1 }}
                />
            </View>
            <View
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(3) }}>
                {back && (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={imagesClass.backScreen} style={styles.backstyle} />
                    </TouchableOpacity>

                )}
                <Text style={styles.headetxt}>{name}</Text>
            </View>
        </View>
    );
};
export default TopHeader;
const styles = StyleSheet.create({
    backstyle: {
        width: wp(10),
        height: hp(8),
        resizeMode: 'contain',
        marginLeft: wp(8),
        tintColor: '#000',
    },
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginLeft: wp(4),
    },
    container: { width: '100%' },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
});
