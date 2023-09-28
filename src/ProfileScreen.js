import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native-animatable';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TopHeader from '../Components/TopHeader';
import BackgroundSvg from '../asserts/svgs/BgImg';
import imagesClass from '../asserts/imagepath';
import Menu from '../Components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalCom from '../Components/ModalCom';
import { Notificationutill } from './Notificationutill';

const ProfileScreen = ({ navigation }) => {
    const [showWarning, setShowWarning] = useState(false);
    const [showclose, setshowclose] = useState(false);
    const [loginSkip, setloginSkip] = useState(false);
    const [skiplog, setSkiplo] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const skipLogin = await AsyncStorage.getItem('skiplogin');

                if (skipLogin === 'true') {
                    setSkiplo('true');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const sendNotification = () => {
        const titles = 'Title 2';
        const messages = 'kam karo';
        const fcmTokens = ['cssa9EVJ8UBkuhxM4Nwebc: APA91bEmfHtJbbTpkOdKVlSxcECkoSQT5pdzcANa_nLyT0zp6NDpLJTt0vXkol9mkVUqvKMIlqIY8qJihY - fdSit7QRCCQLlepmopW2TdvOefDI7tzhYuFhjUlrN_WjYuRa5ixEWcM_m', 'clEsWk9yQf-cED6WNtApGT:APA91bFAIQQ-YrRyj8TXU0Uw0vtJN0Z-RPVsFObc4-alPkHeLOk0ghXck9hZJtKArNMY9rlsyPsX6nPPtNqbMP-bFCps1j9QGeGGQGesy8DEe7HyFOkzFyeRuM-Yal9EiE_rB3v_Qrse', "fMjuTtQ0iUKjhhoiVlXoix:APA91bGEjMxDxCj9NhJDbM1PSKu8_p2jMIEJlkBxOS6ApgZmlI2JVAG7Hlv7PUQmqSWQr00KxqdhlJxVFWgFJp5tEYTgv4tYF5fY0DbDzwHWcR9uxpTpvZ7oIwu2MFslFzqBpB9WpAyC"];

        Notificationutill(titles, messages, fcmTokens);
    };

    const hEdit = () => {
        console.log('edit');
        navigation.navigate('EditProfile');
    };
    const hcontact = () => {

        // handleSendNotification()
        // sendNotification();
        console.log('Contact');
        navigation.navigate('ContactUs');
    };
    const habout = () => {
        navigation.navigate('About');

        console.log('About');
    };

    const hlogout = async () => {
        console.log('Logout');

        await AsyncStorage.clear();
        navigation.reset({
            index: 0,
            routes: [{ name: 'loginSceen' }],
        });
    };

    const hpassword = () => {
        console.log('Edit Profile pressed!');
        navigation.navigate('PasswordScreen');
    };

    const finaldelete = async (data) => {

        var unique = new Date().valueOf();
        console.log('WITH 13 digits ' + unique);
        console.log('WITH 10 digits ' + String(unique).substring(3, 13));
        unique = String(unique).substring(3, 13);


        console.log(unique, "======unique number h");
        const Token = await AsyncStorage.getItem('token');
        fetch('https://boxclub.in/Joker/Admin/index.php?what=userRegistration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': Token
            },
            body: JSON.stringify({
                "name": data.name + "1",
                "email": data.email,
                "phone": unique,
                "type": 'update'
            }),
        })
            .then(response => response.json())
            .then(async data => {

                console.log(data, "=====update succesfully");
                await AsyncStorage.clear();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'loginSceen' }],
                });
            })
            .catch(error => {

                console.error('Error:', error);
            });
    }

    const deleteApi = async () => {
        const Token = await AsyncStorage.getItem('token');
        fetch('https://boxclub.in/Joker/Admin/index.php?what=getProfile', {
            method: 'POST', // Assuming you want to use POST method
            headers: {
                'Content-Type': 'application/json',
                'token': Token
            },
        })
            .then(response => response.json())
            .then(data => {

                console.log(data.success, "=====data");

                if (data.success) {
                    finaldelete(data)
                }
            })
            .catch(error => {

                console.error('Error:', error);
            });
    }

    const handleSendNotification = async () => {

        const fcmtoken = await AsyncStorage.getItem('fcmToken');

        const notification = {
            to: fcmtoken,
            notification: {
                title: 'Box Cricket',
                body: 'Your slot is booked',
            },
            data: {},
        };
        const headers = {
            Authorization: `key=${"AAAAGTHgzAU:APA91bFQxGlEPBbSgEkaKdML-5j-enPUdoobZYch1X7oV_8rv9bqBFAsWJnYaDwcZ_qxhsZVDjMvRnjX1IdAqL_mMSw4TVNQyz6eVAFoRhznQxJE0HrjAXipyY0wcF0fYy3Y_Yjq_Zng"}`,
            'Content-Type': 'application/json',
        };
        await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            body: JSON.stringify(notification),
            headers: headers,
        })
            .then(responseJson => responseJson.json())
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };

    const handledelete = () => {
        if (skiplog === 'true') {
            setloginSkip(true)
        } else {
            setshowclose(true)
        }
    }
    const handleLogout = () => {
        if (skiplog === 'true') {
            setloginSkip(true)
        } else {
            setShowWarning(true)
        }
    }
    return (
        <View
            style={{
                position: 'relative',
                backgroundColor: '#eeeeee',
                height: '100%',
            }}>
            <ScrollView style={{ marginBottom: hp(10) }}>
                <View style={{ width: '100%' }}>
                    <TopHeader name={'My Profile'} />
                </View>
                {/* <View style={{ alignItems: 'center', marginTop: hp(4) }}>
                    <Image source={imagesClass.Profile} resizeMode='contain' style={{ backgroundColor: '#000', alignSelf: 'center', height: hp(15), width: hp(15), borderRadius: hp(7.5), alignItems: 'center', justifyContent: 'center', }} />
                    <Text style={{ color: '#000', fontSize: wp(5) }}>
                        User name
                    </Text>
                    <Text style={{ color: '#000', fontSize: wp(5) }}>
                        123456789</Text>
                </View> */}

                <View style={{ marginTop: hp(3) }}>
                    {/* <Menu icon={imagesClass.pen} name={"Edit Profile"} onpress={() => hEdit()} /> */}
                    {/* <Menu icon={imagesClass.password} name={"Change Password"} onpress={() => hpassword()} /> */}
                    <Menu
                        icon={imagesClass.call}
                        name={'Contact Us'}
                        onpress={() => hcontact()}
                    />

                    <Menu
                        icon={imagesClass.about}
                        name={'About Us'}
                        onpress={() => habout()}
                    />

                    <Menu
                        icon={imagesClass.delete}
                        name={'Delete Account'}
                        onpress={() => handledelete()}
                    />

                    <Menu
                        icon={imagesClass.logout}
                        name={'Logout'}
                        onpress={() => handleLogout()}
                    />
                </View>
            </ScrollView>
            <ModalCom visible={showWarning} onClose={() => setShowWarning(false)} content={"Are you sure to Logout?"} title={"Logout"} btn={"Logout"} btnonpress={() => hlogout()} />
            <ModalCom visible={showclose} onClose={() => setshowclose(false)} content={"Are you sure to Delete You Account?"} title={"Delete Account"} btn={"Delete"} btnonpress={() => deleteApi()} />
            <ModalCom visible={loginSkip} onClose={() => setloginSkip(false)} content={"For Access the full functionality of the app, Please login/register with us."} title={"Login Account"} btn={"login"} btnonpress={() => hlogout()} />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({

    booktxt: {
        color: '#027850',
        fontSize: wp(3),
    },

    bookbtn: {
        position: 'relative',
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2),
        flex: 1,
        marginHorizontal: wp(2),
        marginTop: hp(2),
        paddingHorizontal: wp(2),
    },

    modalv: {
        borderRadius: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
        width: '80%',
        paddingVertical: hp(2.5),
    },

    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginTop: wp(10),
        marginLeft: wp(10),
    },

    container:
    {
        flex: 1,
        position: 'relative'
    },

    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },

});