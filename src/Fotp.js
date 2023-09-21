//import liraries
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity, StatusBar, Alert, Pressable, ActivityIndicator
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

import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressLoader from 'rn-progress-loader';

const Fotp = ({ navigation, route }) => {
    const { phoneNumber } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [randomOTP, setrandomOTP] = useState(0)
    const [otp, setOtp] = useState('');
    const MAX_CODE = 4;
    const otpInputRefs = Array.from({ length: 4 }, () => useRef(null));

    useEffect(() => {
        console.log('0000000');
        wpmsg();
    }, [])

    const handleOtpChange = (index, text) => {
        const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, 1);
        setOtp(prevOtp => {
            const newOtp = prevOtp.split('');
            newOtp[index] = sanitizedText;
            return newOtp.join('');
        });

        // Move to the previous input if the current input is empty
        if (text === '' && index > 0) {
            otpInputRefs[index - 1].current.focus();
        }

        // Move to the next input if available
        if (text !== '' && index < otpInputRefs.length - 1) {
            otpInputRefs[index + 1].current.focus();
        }
    };

    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const wpmsg = async () => {
        console.log("ot first ");

        const mkey = await AsyncStorage.getItem('msgkey')
        const phone = await AsyncStorage.getItem('phn')
        const randomOTP2 = generateOTP();
        setrandomOTP(randomOTP2)
        // console.log("otpss" + randomOTP2);

        const apiUrl = 'http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms';
        const apiKey = mkey; // Replace with your actual auth key

        const smsData = {
            smsContent: `Your OTP for Box Critet Booking App registration is: *${randomOTP2}*. 
Please enter this OTP to complete your registration process.`,
            routeId: '21',
            mobileNumbers: phoneNumber,
            senderId: phone,
            signature: 'signature',
            smsContentType: 'english',
        };

        fetch(`${apiUrl}?AUTH_KEY=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(smsData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('SMS sent successfully:', data.responseCode);
                if (data.responseCode === '3001') {
                    showMessage({
                        message: `message send successfully ${phone}`,
                        type: "Success",
                        backgroundColor: "green", // background color
                        color: "#fff", // text color

                    });
                } else {
                    showMessage({
                        message: "Try Again after some time",
                        type: "Danager",
                        backgroundColor: "red", // background color
                        color: "#fff", // text color
                        onHide: () => {
                            navigation.pop();
                        }
                    });
                }

                //hey llopa sayne  yution shere uis 
                // Handle success or display a message to the user
            })
            .catch(error => {
                console.error('Error sending SMS:', error);
                // Handle error or display an error message to the user
                showMessage({
                    message: `fail` + error,
                    type: "Success",
                    backgroundColor: "red", // background color
                    color: "#fff", // text color

                });
            });
    }

    const handleSubmit = () => {

        if (randomOTP === otp && otp !== '') {
            navigation.navigate("PasswordScreen", { phoneNumber: phoneNumber })
        } else {
            showMessage({
                message: "please enter valid otp",
                type: 'danger',
                backgroundColor: 'red', // background color
                color: '#fff', // text color

            });
        }
    }
    return (
        <View style={{ flex: 1, }}>
            <View style={{ width: '100%' }}>
                <TopHeader name={'Otp Screen'} navigation={navigation} back={true} />
            </View>
            <View style={{ borderRadius: wp(10), justifyContent: 'center', flex: 1, }}>

                <View style={styles.otpContainer}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TextInput
                            key={index}
                            ref={otpInputRefs[index]}
                            style={[styles.input, otp.length === index ? styles.inputFocus : null]}
                            keyboardType="numeric"
                            returnKeyType='done'
                            maxLength={1}
                            value={otp[index] || ''}
                            onChangeText={text => handleOtpChange(index, text)}
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={() => wpmsg()}>

                    <Text style={{ alignSelf: 'center', marginTop: hp(2) }}>
                        Resend OTP
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
                <Text style={styles.booktxt}>
                    Verify Otp
                </Text>
            </TouchableOpacity>
            <ProgressLoader
                visible={isLoading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={"#027850"} />
        </View>
    );
};

export default Fotp;
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
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#000",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#000",
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center'

    },
    input: {
        width: wp(15),
        height: hp(8),
        borderColor: '#027850',
        borderWidth: 1,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        fontSize: wp(8),
        textAlign: 'center'


    },
    inputFocus: {
        borderColor: 'blue',
        borderWidth: 2// Highlight the input in focus
    },
})