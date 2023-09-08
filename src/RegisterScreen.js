//import liraries
import React, { Component, useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TopHeader from '../Components/TopHeader';
import ChangePass from '../Components/ChangePass';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import imagesClass from '../asserts/imagepath';
import ProgressLoader from 'rn-progress-loader';



// create a component
const RegisterScreen = ({ navigation }) => {
    FlashMessageManager.setDisabled(false);
    const [isLoading, setIsLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    // const phoneInput = useRef < PhoneInput > (null);
    const handlepassword = input => {
        setpassword(input);
    };
    const handleuserChange = input => {
        setusername(input);
    };
    const handleEmail = input => {
        setemail(input);
    };




    const isValidPhoneNumber = input => {
        const formattedPhoneNumber = input.replace(/\D/g, '');
        const limitedPhoneNumber = formattedPhoneNumber.slice(0, 10);
        setPhoneNumber(limitedPhoneNumber);
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern;
    };
    const msgapi = () => {

        {
            phoneNumber && username && password ?
                navigation.navigate("Otp", {
                    phoneNumber: phoneNumber,
                    username: username,
                    password: password,
                })
                :
                showMessage({
                    message: "please enter all details",
                    type: 'Danger',
                    backgroundColor: 'red', // background color
                    color: '#fff', // text color

                });
        }


    };

    return (
        <View style={styles.container}>
            <FlashMessage />

            <View>
                <View style={{ position: 'absolute', width: '100%' }}>

                    <TopHeader />
                </View>
                <Text style={styles.titelText}>
                    Hi~{'\n'}
                    Welcome
                </Text>

                <ChangePass
                    name={'User Name'}
                    headerText={null}
                    onChangeText={handleuserChange}
                />

                {/* <ChangePass name={"Email"} headerText={null} onChangeText={handleEmail} /> */}
                <ChangePass
                    name={'Whatsapp Number'}
                    headerText={null}
                    onChangeText={isValidPhoneNumber}
                    called={true}
                    im={imagesClass.telephone}
                />

                <ChangePass
                    name={'Password'}
                    headerText={null}
                    onChangeText={handlepassword}
                    eye={true}
                    im={imagesClass.padlock}
                />
            </View>
            <FlashMessage position="bottom" />

            {/* <TouchableOpacity style={styles.bookbtn} onPress={() => callApi()}> */}
            {/* <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate("Otp")}> */}
            <TouchableOpacity style={styles.bookbtn} onPress={() => msgapi()}>
                <Text style={styles.booktxt}>Register</Text>
            </TouchableOpacity>


            <ProgressLoader
                visible={isLoading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={"#027850"} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    phnimage: { width: wp(5), height: hp(5), tintColor: '#027850' },
    booktxt: {
        color: '#fff',
        fontSize: wp(4),
    },
    bookbtn: {
        backgroundColor: '#027850',
        width: '90%',
        position: 'absolute',
        bottom: hp(5),
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2),
    },
    container: {
        flex: 1,
    },
    titelText: {
        width: wp(80),
        height: hp(9),
        color: '#027850',
        fontSize: wp(7),
        marginTop: hp(10),
        marginHorizontal: hp(4),
        fontWeight: 'bold',
    },
    fillDetails: {
        backgroundColor: '#fff',
        margin: wp(2),
        marginHorizontal: wp(5),
        padding: wp(3),
        borderRadius: wp(2),
        color: ' #4b92b4',
        flexDirection: 'row',
        borderBottomColor: '#027850',
        borderBottomWidth: 2,
    },
    inputFild: {
        height: hp(5),
        width: wp(50),
        color: 'black',
        paddingLeft: wp(4),
    },
});

//make this component available to the app
export default RegisterScreen;
