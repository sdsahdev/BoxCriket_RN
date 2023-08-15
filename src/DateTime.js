

import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import About from './About';
import CalanderFile from '../Components/CalanderFile';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Facilities from '../Components/Facilities';
import BackgroundSvg from '../asserts/svgs/BgImg';
import TopHeader from '../Components/TopHeader';
import TimeComp from '../Components/TimeComp';
import SlotTime from '../Components/SlotTime';
import RazorpayCheckout from 'react-native-razorpay';
import { encode } from 'base-64';
import { base64 } from 'react-native-base64';

import { useRoute } from '@react-navigation/native';
import FlashMessage, {
  showMessage,
  hideMessage,
  FlashMessageManager,
} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateTime = () => {

  const route = useRoute();
  const { item } = route.params;
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [caldate, setcalldat] = useState({});
  const [startTimeData, setStartTimeData] = useState(null);
  const [endTimeData, setEndTimeData] = useState(null);
  const [data, setdatea6] = useState([])
  const [amo, setamo] = useState(0);
  const [apidate, setapidate] = useState([]);
  const data6 = {
    "success": true,
    "0": {
      "time2": "12-01 am",
      "time": '01-02 am',
      "start_time": 1691884800,
      "end_time": 1691888400,
      "available": true,
      "price": 1000
    },
    "1": {
      "time2": "01-02 am", time: '02-03 am',
      "start_time": 1691888400,
      "end_time": 1691892000,
      "available": true,
      "price": 1000
    },
    "2": {
      "time2": "02-03 am", time: '03-04 am',
      "start_time": 1691892000,
      "end_time": 1691895600,
      "available": true,
      "price": 1000
    },
    "3": {
      "time2": "03-04 am", time: '04-05 am',
      "start_time": 1691895600,
      "end_time": 1691899200,
      "available": true,
      "price": 1000
    },
    "4": {
      "time2": "04-05 am", time: '05-06 am',
      "start_time": 1691899200,
      "end_time": 1691902800,
      "available": true,
      "price": 1000
    },
    "5": {
      "time2": "05-06 am", time: '06-07 am',

      "start_time": 1691902800,
      "end_time": 1691906400,
      "available": true,
      "price": 1000
    },
    "6": {
      "time2": "06-07 am", time: '07-08 am',

      "start_time": 1691906400,
      "end_time": 1691910000,
      "available": true,
      "price": 1000
    },
    "7": {
      "time2": "07-08 am", time: '08-09 am',

      "start_time": 1691910000,
      "end_time": 1691913600,
      "available": true,
      "price": 1000
    },
    "8": {
      "time2": "08-09 am", time: '09-10 am',

      "start_time": 1691913600,
      "end_time": 1691917200,
      "available": true,
      "price": 1000
    },
    "9": {
      "time2": "09-10 am", time: '10-11 am',

      "start_time": 1691917200,
      "end_time": 1691920800,
      "available": true,
      "price": 1000
    },
    "10": {
      "time2": "10-11 am", time: '11-12 am',

      "start_time": 1691920800,
      "end_time": 1691924400,
      "available": true,
      "price": 1000
    },
    "11": {
      "time2": "11-12 pm", time: '12-13 pm',

      "start_time": 1691924400,
      "end_time": 1691928000,
      "available": true,
      "price": 1000
    },
    "12": {
      "time2": "12-01 pm", time: '13-14 pm',

      "start_time": 1691928000,
      "end_time": 1691931600,
      "available": true,
      "price": 1000
    },
    "13": {
      "time2": "01-02 pm", time: '14-15 pm',

      "start_time": 1691931600,
      "end_time": 1691935200,
      "available": true,
      "price": 1000
    },
    "14": {
      "time2": "02-03 pm", time: '15-16 pm',

      "start_time": 1691935200,
      "end_time": 1691938800,
      "available": true,
      "price": 1000
    },
    "15": {
      "time2": "03-04 pm", time: '16-17 pm',

      "start_time": 1691938800,
      "end_time": 1691942400,
      "available": true,
      "price": 1000
    },
    "16": {
      "time2": "04-05 pm", time: '17-18 pm',

      "start_time": 1691942400,
      "end_time": 1691946000,
      "available": true,
      "price": 1000
    },
    "17": {
      "time2": "05-06 pm", time: '18-19 pm',

      "start_time": 1691946000,
      "end_time": 1691949600,
      "available": true,
      "price": 1000
    },
    "18": {
      "time2": "06-07 pm", time: '19-20 pm',

      "start_time": 1691949600,
      "end_time": 1691953200,
      "available": true,
      "price": 1000
    },
    "19": {
      "time2": "07-08 pm", time: '20-21 pm',

      "start_time": 1691953200,
      "end_time": 1691956800,
      "available": true,
      "price": 1000
    },
    "20": {
      "time2": "08-09 pm", time: '21-22 pm',

      "start_time": 1691956800,
      "end_time": 1691960400,
      "available": true,
      "price": 1000
    },
    "21": {
      "time2": "09-10 pm", time: '22-23 pm',

      "start_time": 1691960400,
      "end_time": 1691964000,
      "available": true,
      "price": 1000
    },
    "22": {
      "time2": "10-11 pm", time: '23-24 pm',

      "start_time": 1691964000,
      "end_time": 1691967600,
      "available": true,
      "price": 1000
    },
    "23": {
      "time2": "11-12 am", time: '24-01 pm',

      "start_time": 1691967600,
      "end_time": 1691971200,
      "available": true,
      "price": 1000
    }
  }
  // const data = [
  //   { id: '1', time: '01-02 am', price: 100, status: true, stime: '01:00', etime: '02:00' },
  //   { id: '2', time: '02-03 am', price: 100, status: true, stime: '02:00', etime: '03:00' },
  //   { id: '3', time: '03-04 am', price: 100, status: true, stime: '03:00', etime: '04:00' },
  //   { id: '4', time: '04-05 am', price: 100, status: true, stime: '04:00', etime: '05:00' },
  //   { id: '5', time: '05-06 am', price: 100, status: true, stime: '05:00', etime: '06:00' },
  //   { id: '6', time: '06-07 am', price: 100, status: true, stime: '06:00', etime: '07:00' },
  //   { id: '7', time: '07-08 am', price: 100, status: true, stime: '07:00', etime: '08:00' },
  //   { id: '8', time: '08-09 am', price: 100, status: true, stime: '08:00', etime: '09:00' },
  //   { id: '9', time: '09-10 am', price: 100, status: true, stime: '09:00', etime: '10:00' },
  //   { id: '10', time: '10-11 am', price: 100, status: false, stime: '10:00', etime: '11:00' },
  //   { id: '11', time: '11-12 am', price: 100, status: false, stime: '11:00', etime: '12:00' },
  //   { id: '12', time: '12-13 am', price: 100, status: false, stime: '12:00', etime: '13:00' },
  //   { id: '13', time: '13-14 pm', price: 100, status: false, stime: '13:00', etime: '14:00' },
  //   { id: '14', time: '14-15 pm', price: 100, status: false, stime: '14:00', etime: '15:00' },
  //   { id: '15', time: '15-16 pm', price: 100, status: false, stime: '15:00', etime: '16:00' },
  //   { id: '16', time: '16-17 pm', price: 100, status: false, stime: '16:00', etime: '17:00' },
  //   { id: '17', time: '17-18 pm', price: 100, status: false, stime: '17:00', etime: '18:00' },
  //   { id: '18', time: '18-19 pm', price: 100, status: false, stime: '18:00', etime: '19:00' },
  //   { id: '19', time: '19-20 pm', price: 100, status: false, stime: '19:00', etime: '20:00' },
  //   { id: '20', time: '20-21 pm', price: 100, status: false, stime: '20:00', etime: '21:00' },
  //   { id: '21', time: '21-22 pm', price: 100, status: false, stime: '21:00', etime: '22:00' },
  //   { id: '22', time: '22-23 pm', price: 100, status: false, stime: '22:00', etime: '23:00' },
  //   { id: '23', time: '23-24 pm', price: 100, status: false, stime: '23:00', etime: '24:00' },
  //   { id: '24', time: '24-01 pm', price: 100, status: false, stime: '24:00', etime: '01:00' },
  // ];

  useEffect(() => {
    setdatea6(Object.values(data6))
    // slotapi()
    if (startTimeData) {
      setStartTime(startTimeData.start_time);
      if (!endTimeData) {
        // If endTimeData is not set, set it to startTimeData.etime initially
        setEndTime(startTimeData.end_time);
      }
      // booked
      // can
      // canreq
      // ref
    }
    if (endTimeData) {
      setEndTime(endTimeData.end_time);
    }
  }, [startTimeData, endTimeData]);


  slotapi = (date) => {
    fetch('https://boxclub.in/Joker/Admin/index.php?what=getAllSlots', {
      method: 'POST', // Assuming you want to use POST method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: date,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setdatea6(Object.values(data))

        // Handle the response data here
        console.log(data);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }


  const handleDateSelect = date => {
    console.log(date, "****data");
    // Reset startTime and endTime to null when the date is removed
    setcalldat(date);

    const selectedDates = Object.keys(date).filter(key => date[key].selected);
    setapidate(selectedDates)
    console.log(selectedDates, '---');
    if (selectedDates.length === 1) {
      const firstSelectedDate = selectedDates[0];
      console.log("First selected date:", firstSelectedDate);
      // slotapi(firstSelectedDate);
      // Do something with the first selected date
    }
  };

  const BookingPro = () => {

    const startIndex = data.findIndex(item => item.start_time === startTime);
    const endIndex = data.findIndex(item => item.end_time === endTime);
    console.log(startIndex, 'start index');
    console.log(endIndex, "end index");
    let totalAmount = 0;

    if (startIndex !== -1 && endIndex !== -1) {
      for (let i = startIndex; i <= endIndex; i++) {
        totalAmount += data[i].price;
      }
      totalAmount = totalAmount * Object.keys(caldate).length;

    }
    console.log('Total Amount:', totalAmount);
    setamo(totalAmount)
    // console.log('Total Amount:', Object.keys(caldate).length);
    var options = {
      description: 'Credits towards ',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_lFrGZBU3t0pDQ3',
      amount: totalAmount * 100,
      name: 'Acme Corp',

      order_id: '',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar'
      },
      theme: {
        color: '#027850',
      }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      // alert(`Success: ${data.razorpay_payment_id}`);
      showMessage({
        message: `Success Your Payment, Payment id : ${data.razorpay_payment_id}`,
        type: "Success",
        backgroundColor: "green", // background color
        color: "#fff", // text color
        duration: 2000,
        onHide: () => {
          bookm(data.razorpay_payment_id, totalAmount);
        }
      });
    }).catch((error) => {
      // handle failure
      // alert(`Error: ${error.code} | ${error.description}`);
      showMessage({
        message: error.error.description,
        type: "Danger",
        backgroundColor: "red", // background color
        duration: 5000,
        color: "#fff", // text color
      });
    });
  };

  const handleStartTimeChange = time => {
    if (!time) {
      return;
    }

    const selectedStartTimeData = data.find(item => item.time === time);

    if (selectedStartTimeData) {
      setStartTimeData(selectedStartTimeData);
    }
  };

  const handleEndTimeChange = time => {
    if (!time) {
      console.error('endTime is not valid:', time);
      setEndTimeData(null)
      return;
    }

    const selectedEndTimeData = data.find(item => item.time === time);
    if (selectedEndTimeData) {
      setEndTimeData(selectedEndTimeData);
    }
  };


  const handletor = time => {
    // setEndTime(time);
    // console.log(time, "++++end Times++++++++");
  };
  const csapi = () => {
    const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=checkMultipleSlot';

    const requestData = {
      start_time: startTime,
      end_time: endTime,
      box_id: item.id,
      dates: apidate,
      type: 'multi'
    };
    console.log(requestData, "===res");
    //  {"amount": 10000, "box_id": "1", "dates": ["2023-08-15", "2023-08-16"], "end_time": 1691946000, "payment_id": "pay_MQH7xrcsaGSSe4", "start_time": 1691928000, "type": "tournament"} ===res
    fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        if (data.success) {
          BookingPro();
        } else {
          showMessage({
            message: data.message,
            type: "Danger",
            duration: 10000,
            backgroundColor: "red", // background color
            color: "#fff", // text color
            onHide: () => {
            }
          });
        }
        // Handle the API response data here
      })
      .catch(error => {
        console.error('Error calling API:', error);
        // Handle the error here
      });
  }

  const bookm = async (paymentid, amounts) => {
    const Token = await AsyncStorage.getItem('token');

    const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=bookMultipleSlot';

    const requestData = {
      start_time: startTime,
      end_time: endTime,
      box_id: item.id,
      dates: apidate,
      type: "multi",
      payment_id: paymentid,
      amount: amounts
    };
    console.log(requestData, "===res");

    fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      headers: {
        token: Token

      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        if (data.success) {
          showMessage({
            message: `Your booking is successfull`,
            type: "Success",
            backgroundColor: "green", // background color
            color: "#fff", // text color
            onHide: () => {
            }
          });
        } else {
          showMessage({
            message: data.message,
            type: "Danger",
            backgroundColor: "red", // background color
            color: "#fff", // text color
          });
        }
        // Handle the API response data here
      })
      .catch(error => {
        console.error('Error calling API:', error);
        // Handle the error here
      });
  }

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View>
          <TopHeader name={'Book Your Slot'} />
        </View>

        {/* {console.log(startTime, "==satrt===")}
        {console.log(endTime, "==end===")} */}

        <Text style={styles.datess}>select date is required</Text>
        <View style={styles.thiView}>
          <CalanderFile datesselect={handleDateSelect} />
        </View>
        <View>

          {Object.keys(caldate).length !== 0 && startTime !== null && (
            // <TouchableOpacity style={styles.btn} onPress={() => BookingPro()}>
            <TouchableOpacity style={styles.btn} onPress={() => csapi()}>
              <Text style={styles.payment}>
                Book Now
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.sendView}>
          <SlotTime
            onStartTimeChange={handleStartTimeChange}
            onEndTimeChange={handleEndTimeChange}
            tor={handletor}
            data={data} />
        </View>
      </ScrollView>
    </View>
  );
}
export default DateTime;

const styles = StyleSheet.create({
  datess: { alignSelf: 'center', color: '#f97272', marginVertical: hp(1) },

  sold: { color: '#000' },
  thiView: { marginHorizontal: wp(10), },
  sendView: {
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  mainView: { flex: 1, marginBottom: hp(5) },
  btn: { margin: wp(3), height: 40, flex: 1 },
  payment: {
    color: '#fff',
    backgroundColor: '#027850',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: wp(5),
    borderRadius: wp(2),
  },
});