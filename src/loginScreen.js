
//import liraries
import React, { Component, useState, useRef } from 'react';
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
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input/react-native-input'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import Svg, { Path } from 'react-native-svg';
import Frame from '../asserts/svgs/Frame.svg';
import imagesClass from '../asserts/imagepath';
import TopHeader from '../Components/TopHeader';
import ChangePass from '../Components/ChangePass';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';


// create a component
const loginSceen = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [Password, setpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const phoneInput = useRef < PhoneInput > (null);
  const handlePhoneNumberChange = (input) => {
    // Remove any non-digit characters from the input
    const formattedPhoneNumber = input.replace(/\D/g, '');
    const limitedPhoneNumber = formattedPhoneNumber.slice(0, 10);

    setPhoneNumber(limitedPhoneNumber);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const url = 'https://boxclub.in/Joker/Admin/index.php?what=userLogin';
      const fcmToken = await AsyncStorage.getItem('fcmToken');
      console.log(fcmToken, "==storae");
      console.log(phoneNumber);
      console.log(Password);
      console.log(fcmToken);
      const requestBody = {
        email: phoneNumber,
        password: Password,
        fcm: fcmToken,
      };

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      console.log(response.status);
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Network response was not ok');

      }
      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        if (data.success) {
          showMessage({
            message: data.message,
            type: "Success",
            backgroundColor: "green", // background color
            color: "#fff", // text color
            onHide: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'BoxList' }],
              });
            }
          });
          console.log(data.token);
          AsyncStorage.setItem("token", data.token);
          AsyncStorage.setItem("user", "admin");
          setpassword('')
          setPhoneNumber('')

        } else {
          console.log(data.message);
          showMessage({
            message: data.message,
            type: "Danger",
            backgroundColor: "red", // background color
            color: "#fff", // text color
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: error.message,
        type: "Danger",
        backgroundColor: "red", // background color
        color: "#fff", // text color
      });
      console.log('Error:', error.message);
    }
  }

  // Function to validate the phone number using regex
  const isValidPhoneNumber = (input) => {
    // Phone number regex pattern (for example, supports only 10-digit US phone numbers)
    const phoneNumberPattern = /^\d{10}$/;
    return input.length === 10;
  };
  const handlepass = (input) => {
    setpassword(input)
  }
  const handlePhn = (input) => {
    setPhoneNumber(input)
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TopHeader />
        <Text style={styles.titelText}>
          Hi~{'\n'}
          Welcome Back!
        </Text>
        <View style={{ marginTop: hp(4) }}>

          <ChangePass name={"Whatsapp Number"} headerText={null} onChangeText={handlePhn} im={imagesClass.telephone} />
        </View>
        <ChangePass name={"Password"} headerText={null} onChangeText={handlepass} eye={true} im={imagesClass.padlock} />
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={{ color: '#027850', textAlign: 'center', marginTop: hp(2), fontSize: wp(4) }}>
            Register Your Profile
          </Text>
        </TouchableOpacity>
      </SafeAreaView >
      <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}>
        {/* <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate("BoxList")}> */}
        <Text style={styles.booktxt}>
          Login
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
export default loginSceen;
