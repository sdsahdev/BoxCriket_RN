
//import liraries
import React, { Component, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity, StatusBar, Alert
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


// create a component
const loginSceen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // const phoneInput = useRef < PhoneInput > (null);
  const handlePhoneNumberChange = (input) => {
    // Remove any non-digit characters from the input
    const formattedPhoneNumber = input.replace(/\D/g, '');
    const limitedPhoneNumber = formattedPhoneNumber.slice(0, 10);

    setPhoneNumber(limitedPhoneNumber);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    navigation.navigate("PasswordScreen");

    if (isValidPhoneNumber(phoneNumber)) {
      // Perform your action or validation success logic here
      Alert.alert('Success', 'Valid phone number!');
    } else {
      Alert.alert('Error', 'Invalid phone number!');
    }
  };

  // Function to validate the phone number using regex
  const isValidPhoneNumber = (input) => {
    // Phone number regex pattern (for example, supports only 10-digit US phone numbers)
    const phoneNumberPattern = /^\d{10}$/;
    return input.length === 10;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TopHeader />
        <Text style={styles.titelText}>
          Hi~{'\n'}
          Welcome Back!
        </Text>
        <View style={{ marginTop: hp(4) }}>

          <ChangePass name={"User Name"} headerText={null} />
        </View>
        <ChangePass name={"Password"} headerText={null} />
      </SafeAreaView >
      {/* <TouchableOpacity style={styles.bookbtn} onPress={() => handleSubmit()}> */}
      <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate("BoxList")}>
        <Text style={styles.booktxt}>
          Login
        </Text>
      </TouchableOpacity>

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
