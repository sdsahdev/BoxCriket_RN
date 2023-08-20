//import liraries
import React, { Component, useState, useRef } from 'react';
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

const ContactUs = ({ navigation }) => {
    return (
        <View>
            <View style={{ position: 'absolute', width: '100%' }}>
                <TopHeader name={'Contact Us'} back={true} navigation={navigation} />
            </View>
            <View style={{ marginTop: hp(15) }}>
                <Text style={styles.txt}>
                    We value your feedback and are committed to providing exceptional
                    customer service. {'\n'}{'\n'}If you have any questions, concerns, or feedback
                    regarding our cricket turf booking app, please don’t hesitate to reach
                    out to us. We’re here to assist you!
                </Text>


                <Text style={styles.txt2}>Customer Support:</Text>
                {/* 
                <Text style={styles.cont} >
                    Phone: 8520020093{'\n'}{'\n'}
                    Email: jokerbox0099@gmail.com{'\n'}{'\n'}
                    Location: Anthem compound, NR. Harekrishna village Restaurant, simada kenal road{'\n'}{'\n'}
                </Text> */}
                {/* <View style={styles.container}> */}
                <Text style={styles.contactText}>
                    {'\n'}   <Text style={styles.label}>Phone:{'\n'}</Text> <Text style={styles.info}>8520020093</Text>{'\n'}
                    <Text style={styles.label}>Email:{'\n'}</Text> <Text style={styles.info}>jokerbox0099@gmail.com</Text>{'\n'}
                    <Text style={styles.label}>Location:{'\n'}</Text> <Text style={styles.info}>Anthem compound, NR. Harekrishna village Restaurant, simada kenal road</Text>{'\n'}
                </Text>
                {/* </View> */}

                <Text style={styles.txt}>
                    Our customer support team is available during working hours to assist you with any inquiries or issues
                    you may have. We strive to provide prompt and helpful responses to ensure your satisfaction.

                    {'\n'}{'\n'}
                    For general inquiries, partnerships, or business opportunities, please reach out to us via email. We will
                    respond to your inquiries as soon as possible.
                    {'\n'}{'\n'}

                    Thank you for choosing our cricket turf booking app. We appreciate your support and look forward to
                    serving you
                </Text>
            </View>
        </View>
    );
};

export default ContactUs;

const styles = StyleSheet.create({
    cont: { color: '#000', marginHorizontal: wp(5), marginTop: hp(4), fontSize: wp(5) },
    txt: {
        marginHorizontal: wp(5),
        fontSize: wp(4.3),
        color: '#000',
    },
    txt2: {
        marginHorizontal: wp(5),
        fontSize: wp(5),
        color: '#027850',
        fontWeight: 'bold',
        marginTop: hp(5)
    },
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginTop: wp(10),
        marginLeft: wp(10),
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    contactText: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        color: '#333',
        fontFamily: 'Helvetica', // You can use your preferred font here
    },
    label: {
        fontWeight: 'bold',
        color: '#027850', // Custom label color
    },
    info: {
        color: '#147EFB', // Custom info color
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
});
