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
import ProgressLoader from 'rn-progress-loader';

import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PasswordScreen = ({ navigation, route }) => {
    const { phoneNumber } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNewPasswordChange = text => {
        setNewPassword(text);
    };

    const handleConfirmPasswordChange = text => {
        setConfirmPassword(text);
    };

    const callApi = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            console.log(token, '-----');
            const apiUrl =
                'https://boxclub.in/Joker/Admin/index.php?what=changePassword';
            const data = {
                phone: phoneNumber,
                password: newPassword,
                role: 'user',
            };
            console.log('=== n 3' + phoneNumber + ' ' + newPassword);
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoading(false);

                if (data.success) {
                    showMessage({
                        message: 'Password Change successfully',
                        type: 'Success',
                        backgroundColor: 'green', // background color
                        color: '#fff', // text color
                        onHide: () => {
                            navigation.navigate('loginSceen');
                        },
                    });

                    console.log(data, ' logg');
                } else {
                    console.log(data.message, 'jj');
                    showMessage({
                        message: 'something went wrong',
                        type: 'danger',
                        duration: 3000,
                        backgroundColor: 'red', // background color
                        color: '#fff',
                        onHide: () => {
                            navigation.pop();
                        }, // text color
                    });
                }
            } else {
                setIsLoading(false);
                showMessage({
                    message: 'something went wrong',
                    type: 'danger',
                    backgroundColor: 'red', // background color
                    color: '#fff', // text color
                    duration: 3000,
                    onHide: () => {
                        navigation.pop();
                    },
                });
            }
        } catch (error) {
            console.error('Network error:', error);
            setIsLoading(false);
            showMessage({
                message: 'Network error occurred',
                type: 'danger',
                backgroundColor: 'red',
                color: '#fff',
                duration: 3000,
                onHide: () => {
                    navigation.pop();
                },
            });
        }
    };

    const handleSubmit = () => {
        if (newPassword === confirmPassword && newPassword !== '') {
            callApi();
        } else {
            showMessage({
                message: 'please enter same password ',
                type: 'danger',
                backgroundColor: 'red', // background color
                color: '#fff', // text color
            });
        }
    };

    return (
        <View
            style={{
                flex: 1,
                position: 'relative',
                flexDirection: 'column',
                height: '100%',
            }}>
            <View style={{ position: 'absolute', width: '100%' }}>
                <TopHeader
                    name={'Change Password'}
                    back={true}
                    navigation={navigation}
                />
            </View>
            <View style={{ marginTop: hp(15) }}>
                <ChangePass
                    name={'Enter new password'}
                    onChangeText={handleNewPasswordChange}
                    headerText={'Enter new password'}
                    eye={true}
                />
                <ChangePass
                    name={'Re-enter new password'}
                    onChangeText={handleConfirmPasswordChange}
                    headerText={'Re-enter new password'}
                    eye={true}
                />
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
                    <Text style={styles.booktxt}>Change Password</Text>
                </TouchableOpacity>
            </View>

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

export default PasswordScreen;

const styles = StyleSheet.create({
    booktxt: {
        color: '#fff',
        alignSelf: 'center',
        // textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: wp(4),

    },
    bookbtn: {
        backgroundColor: '#027850',
        width: '90%',
        position: 'absolute',
        bottom: hp(5),
        alignSelf: 'center',
        borderRadius: wp(2),
        alignItems: "center",
        justifyContent: "center",
        padding: hp(1.5)
    },
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginTop: wp(10),

        marginLeft: wp(10),
    },
});
