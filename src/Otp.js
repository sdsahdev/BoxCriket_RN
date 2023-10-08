//import liraries
import React, { useState, useRef, useEffect } from 'react';
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
    Pressable,
    ActivityIndicator,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PhoneInput, {
    getCountryCallingCode,
} from 'react-phone-number-input/react-native-input';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
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
import { useIsFocused } from '@react-navigation/native';
// import { err } from 'react-native-svg/lib/typescript/xml';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader';

const Otp = ({ navigation, route }) => {
    const { phoneNumber, username, password } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [randomOTP, setrandomOTP] = useState(0);
    const [otp, setOtp] = useState('');
    const [dares, setdares] = useState('');
    const MAX_CODE = 4;
    const isFocused = useIsFocused();
    const otpInputRef = useRef(null);

    const otpInputRefs = Array.from({ length: 4 }, () => useRef(null));

    useEffect(() => {
        wpmsg();
    }, []);
    const callApi = () => {
        console.log(username);
        console.log(phoneNumber);
        console.log(password);
        setIsLoading(true);

        AsyncStorage.getItem('token')
            .then(token => {
                console.log(token, '-----');
                const apiUrl =
                    'https://boxclub.in/Joker/Admin/index.php?what=userRegistration';

                console.log(username);
                console.log(phoneNumber);
                console.log(password);

                const data = {
                    name: username,
                    phone: phoneNumber,
                    password: password,
                    type: 'insert',
                };

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        token: token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => {
                        setIsLoading(false);

                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }

                        return response.json();
                    })
                    .then(data => {
                        if (data.success) {
                            showMessage({
                                message: data.message,
                                type: 'Success',
                                backgroundColor: 'green',
                                color: '#fff',
                                onHide: () => {
                                    navigation.navigate('loginSceen');
                                },
                            });
                            console.log(data, ' logg');
                        } else {
                            console.log(data.message, 'jj');
                            showMessage({
                                message: data.message,
                                type: 'Danger',
                                duration: 3000,
                                backgroundColor: 'red',
                                color: '#fff',
                                onHide: () => {
                                    navigation.pop();
                                },
                            });
                        }
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.error(error);
                        showMessage({
                            message: 'Network error',
                            type: 'Danger',
                            backgroundColor: 'red',
                            color: '#fff',
                            duration: 3000,
                        });
                    });
            })
            .catch(error => {
                setIsLoading(false);
                console.error(error);
                showMessage({
                    message: 'Error fetching token',
                    type: 'Danger',
                    backgroundColor: 'red',
                    color: '#fff',
                    duration: 3000,
                });
            });
    };

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
        const mkey = await AsyncStorage.getItem('msgkey');
        const phone = await AsyncStorage.getItem('phn');
        const randomOTP2 = generateOTP();
        console.log('otpss' + randomOTP2);
        setrandomOTP(randomOTP2);

        const apiUrl = `http://msg.msgclub.net/rest/services/sendSMS/sendGroupSms?AUTH_KEY=${mkey}`;
        const apiKey = mkey; // Replace with your actual auth key

        console.log(phoneNumber);
        const requestBody = {
            smsContent: `Your OTP for Box Critet Booking App is: *${randomOTP2}*. 
Please enter this OTP to complete your registration process.`,
            routeId: '21',
            mobileNumbers: phoneNumber,
            senderId: phone,
            signature: 'signature',
            smsContentType: 'english',
        };

        axios
            .post(apiUrl, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                console.log('API response:', response.data);
                // Handle the API response here
                setdares(response.data.responseCode);
                if (response.data.responseCode === '3001') {
                    showMessage({
                        message: `message send successfully ${phoneNumber}`,
                        type: 'Success',
                        backgroundColor: 'green', // background color
                        color: '#fff', // text color
                    });
                } else {
                    showMessage({
                        message: 'Please cheack the Whatsapp Number or try again',
                        type: 'Danager',
                        backgroundColor: 'red', // background color
                        color: '#fff', // text color
                    });
                }
            })
            .catch(error => {
                // console.error('API error:', error);
                console.error('Error sending SMS:', error);
                showMessage({
                    message: `fail` + error,
                    type: 'Success',
                    backgroundColor: 'red', // background color
                    color: '#fff', // text color
                });
                // Handle the API error here
            });
    };

    const handleSubmit = () => {
        // console.log(randomOTP, '==otp scere');
        if (randomOTP === otp) {
            callApi();
        } else {
            showMessage({
                message: 'please enter valid otp',
                type: 'Danger',
                backgroundColor: 'red', // background color
                color: '#fff', // text color
            });
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%' }}>
                <TopHeader name={'Otp'} back={true} navigation={navigation} />
            </View>
            <View style={{ borderRadius: wp(10), justifyContent: 'center', flex: 1 }}>
                <View style={styles.otpContainer}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TextInput
                            key={index}
                            returnKeyType="done"
                            ref={otpInputRefs[index]}
                            style={[
                                styles.input,
                                otp.length === index ? styles.inputFocus : null,
                            ]}
                            keyboardType="numeric"
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
                <Text style={styles.booktxt}>Verify Otp</Text>
            </TouchableOpacity>

            <ProgressLoader
                visible={isLoading}
                isModal={true}
                isHUD={true}
                hudColor={'#fff'}
                color={'#027850'}
            />
        </View>
    );
};

export default Otp;
const styles = StyleSheet.create({
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
    borderStyleBase: {
        width: 30,
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: '#000',
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: '#000',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
        textAlign: 'center',
    },
    inputFocus: {
        borderColor: 'blue',
        borderWidth: 2, // Highlight the input in focus
    },
});
