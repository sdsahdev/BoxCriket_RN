import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ChangePass from '../Components/ChangePass';
import TopHeader from '../Components/TopHeader';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";
import imagesClass from '../asserts/imagepath';

const ForgotP = ({ navigation }) => {
    const [Phone, setPhone] = useState('');

    const handleuserChange = (phn) => {
        setPhone(phn);
    }
    const handleNavigation = () => {
        if (Phone == '') {
            showMessage({
                message: 'please enter a phone number',
                backgroundColor: "red",
                type: "danger",// background color
                color: "#fff", // text color
                icon: "danger",
            }); return;
        } else {
            console.log(Phone, " =====n 1");
            navigation.navigate("Fotp", { phoneNumber: Phone })
        }
    };
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ width: '100%' }}>
                <TopHeader name={"Verify Number"} navigation={navigation} back={true} />
            </View>


            <View style={{ marginTop: hp(5), }}>
                <ChangePass name={'phone number'} headerText={null} onChangeText={handleuserChange} called={true} im={imagesClass.telephone} />
            </View>

            <TouchableOpacity
                style={styles.bookbtn}
                onPress={() => handleNavigation()}>
                <Text style={styles.booktxt}>Send  Otp</Text>
            </TouchableOpacity>

        </View>
    );
};

export default ForgotP;

const styles = StyleSheet.create({
    bookbtn: {
        backgroundColor: '#027850',
        alignSelf: 'center',
        borderRadius: wp(2),
        marginHorizontal: wp(2),
        bottom: hp(10),
        padding: hp(2), position: 'absolute'
    },
    booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },

});
