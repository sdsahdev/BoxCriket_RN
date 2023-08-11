
//import liraries
import React, { Component, useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity, StatusBar, Alert, ActivityIndicator
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TopHeader from '../Components/TopHeader';
import ChangePass from '../Components/ChangePass';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";

// create a component
const RegisterScreen = ({ navigation }) => {
    FlashMessageManager.setDisabled(false);
    const [isLoading, setIsLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    // const phoneInput = useRef < PhoneInput > (null);
    const handlepassword = (input) => {
        setpassword(input)
    };
    const handleuserChange = (input) => {
        setusername(input)
    }
    const handleEmail = (input) => {
        setemail(input)
    }
    const callApi = async () => {
        console.log(username)
        console.log(phoneNumber)
        console.log(password)
        setIsLoading(true)
        const token = await AsyncStorage.getItem("token")
        console.log(token, "-----");
        const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=userRegistration';

        console.log(username);
        console.log(email);
        console.log(phoneNumber);
        console.log(password);
        const data = {
            name: username,
            email: email,
            phone: phoneNumber,
            password: password,
            type: 'insert'
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                token: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            setIsLoading(false)

            throw new Error('Network response was not ok');
        }
        if (response.ok) {
            const data = await response.json();
            setIsLoading(false)

            if (data.success) {
                showMessage({
                    message: data.message,
                    type: "Success",
                    backgroundColor: "green", // background color
                    color: "#fff", // text color
                    onHide: () => {
                        navigation.navigate("Otp");
                    }
                });

                console.log(data, " logg");
            } else {
                console.log(data.message, "jj");
                showMessage({
                    message: data.message,
                    type: "Danger",
                    duration: 3000,
                    backgroundColor: "red", // background color
                    color: "#fff", // text color
                });
            }
        } else {
            setIsLoading(false)

            showMessage({
                message: "data. s",
                type: "Danger",
                backgroundColor: "red", // background color
                color: "#fff", // text color
                duration: 3000
            });
        }
    };


    const isValidPhoneNumber = (input) => {
        const formattedPhoneNumber = input.replace(/\D/g, '');
        const limitedPhoneNumber = formattedPhoneNumber.slice(0, 10);
        setPhoneNumber(limitedPhoneNumber);
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern;
    };

    return (
        <View style={styles.container}>

            <FlashMessage />

            <SafeAreaView>
                <TopHeader />
                <Text style={styles.titelText}>
                    Hi~{'\n'}
                    Welcome
                </Text>

                <ChangePass name={"User Name"} headerText={null} onChangeText={handleuserChange} />

                <ChangePass name={"Email"} headerText={null} onChangeText={handleEmail} />
                <ChangePass name={"Phone Number"} headerText={null} onChangeText={isValidPhoneNumber} called={true} />

                <ChangePass name={"Password"} headerText={null} onChangeText={handlepassword} />
            </SafeAreaView >
            <FlashMessage position="bottom" />

            {/* <TouchableOpacity style={styles.bookbtn} onPress={() => callApi()}> */}
            <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate("Otp")}>
                <Text style={styles.booktxt}>
                    Register
                </Text>
            </TouchableOpacity>
            {isLoading && (
                <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: '100%' }} />)}

        </View >
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
        width: "90%",
        position: 'absolute',
        bottom: hp(5),
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2)
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
        marginHorizontal: wp(5), padding: wp(3),
        borderRadius: wp(2),
        color: ' #4b92b4',
        flexDirection: 'row',
        borderBottomColor: '#027850',
        borderBottomWidth: 2,
    },
    inputFild: {
        height: hp(5), width: wp(50), color: 'black', paddingLeft: wp(4),
    },
});

//make this component available to the app
export default RegisterScreen;

