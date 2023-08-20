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
import { ScrollView } from 'react-native-gesture-handler';

const About = ({ navigation }) => {
    return (
        <View>
            <ScrollView style={{}}>

                <View style={{ position: 'absolute', width: '100%' }}>
                    <TopHeader name={'About Us'} back={true} navigation={navigation} />
                </View>
                <View style={{ marginTop: hp(15) }}>
                    <Text style={styles.txt}>
                        Welcome to the Joker The Box cricket, your go-to destination for booking cricket turf slots with ease and
                        convenience. We strive to provide cricket enthusiasts like you with a seamless and hassle-free
                        experience for reserving turf facilities for practice sessions, matches, and more.

                        {'\n'}{'\n'}

                        Our mission is to bridge the gap between cricket enthusiasts and turf owners, enabling a smooth
                        booking process and facilitating enjoyable cricket experiences. Whether you are an individual looking for
                        a casual practice session or a team planning a competitive match, we’ve got you covered.
                        {'\n'}{'\n'}


                        At Joker The Box cricket, we understand the passion for cricket and the importance of having access to wellmaintained turf facilities. We have partnered with reputable turf owners and facilities to offer you a wide
                        range of options to suit your preferences and requirements.
                        {'\n'}{'\n'}
                        {'\n'}

                        Why Choose Joker The Box cricket
                        {'\n'}{'\n'}
                        {'\n'}
                        User-Friendly Interface: Our user-friendly app interface makes it easy for you to browse available turf
                        slots, select your preferred time and duration, and complete the booking process within minutes.
                        {'\n'}{'\n'}

                        Real-Time Availability: Say goodbye to the hassle of making phone calls or waiting for confirmation. Our
                        app provides real-time availability, ensuring that you can book open slots instantly
                        {'\n'}{'\n'}

                        Secure Payment: We prioritize the security of your transactions. Our app integrates trusted and secure
                        payment gateways, allowing you to make payments confidently.
                        {'\n'}{'\n'}

                        Reliable Customer Support: Our dedicated customer support team is available to assist you with any
                        inquiries, concerns, or technical issues you may encounter during the booking process.
                        {'\n'}{'\n'}

                        Transparent Policies: We believe in transparent and fair policies. Our cancellation and refund policy is
                        designed to provide clarity and ensure a smooth experience for our users.
                        {'\n'}{'\n'}

                        We are continuously working to enhance and improve our app to meet your evolving needs and exceed
                        your expectations. Your satisfaction is our top priority, and we welcome your feedback to help us deliver
                        an even better cricket turf booking experience.
                        {'\n'}{'\n'}

                        Join the growing community of cricket enthusiasts who trust Joker The Box cricket  for their turf booking needs.
                        Start exploring available slots, book your preferred time, and get ready for an exciting game of cricket!

                        {'\n'}{'\n'}

                        Thank you for choosing Joker The Box cricket. We look forward to serving you and being a part of your cricket
                        journey.

                    </Text>

                </View>
            </ScrollView>

        </View>
    );
};

export default About;

const styles = StyleSheet.create({
    cont: { color: '#000', marginHorizontal: wp(5), marginTop: hp(4), fontSize: wp(5) },
    txt: {
        marginHorizontal: wp(5),
        fontSize: wp(4.3),
        color: '#000',
        marginBottom: hp(10)
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
    container: { flex: 1, position: 'relative' },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
});
