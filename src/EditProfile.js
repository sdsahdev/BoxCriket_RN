
//import liraries
import React, { Component, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity, StatusBar, Alert
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input/react-native-input'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import Svg, { Path } from 'react-native-svg';
import Frame from '../asserts/svgs/Frame.svg';
import imagesClass from '../asserts/imagepath';
import TopHeader from '../Components/TopHeader';
import ChangePass from '../Components/ChangePass';

const EditProfile = ({ navigation }) => {
    return (
        <View style={{ position: 'relative', flex: 1, }}>

            <View style={{ position: 'absolute', width: '100%' }}>
                <TopHeader name={"Edit Profile"} back={true} navigation={navigation} />
            </View>
            <View style={{ marginTop: hp(15) }}>

                <ChangePass name={"Enter User Name"} headerText={"Enter New User Name"} />
            </View>

            <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
                <Text style={styles.booktxt}>
                    Save User Name
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    booktxt: {
        color: '#fff',
        fontSize: wp(4),
    },
    bookbtn: {
        backgroundColor: '#027850',
        width: "90%",
        position: 'absolute',
        bottom: hp(5),
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2)
    },
})