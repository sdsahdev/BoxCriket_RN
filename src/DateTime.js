

import { StyleSheet, Text, View, ActivityIndicator, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import About from './About';
import CalanderFile from '../Components/CalanderFile';
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
import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import FlashMessage, {
  showMessage,
  hideMessage,
  FlashMessageManager,
} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateTime = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  const [showWarning, setShowWarning] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // setdatea6(Object.values(data6))
    if (!hasLoaded) {
      // slotapi();
      setHasLoaded(true);
    }
    if (startTimeData) {
      setStartTime(startTimeData.start_time);
      if (!endTimeData) {
        // If endTimeData is not set, set it to startTimeData.etime initially
        setEndTime(startTimeData.end_time);
      }

    }
    if (endTimeData) {
      setEndTime(endTimeData.end_time);
    }
  }, [startTimeData, endTimeData]);


  const slotapi = (date) => {
    setIsLoading(true)
    fetch('https://boxclub.in/Joker/Admin/index.php?what=getAllSlots', {
      method: 'POST', // Assuming you want to use POST method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        box_id: item.id,
        date: date,
      }),
    })
      .then(response => response.json())
      .then((data, index) => {
        setIsLoading(false)

        function convertTimeFormat(time, index) {
          console.log(Object.values(data).length);
          if (index === 0) {
            return '01-02 am'
          }
          if (data.length === 23) {
            return '22-01 pm'
          }
          const [hourMinute, ampm] = time.split(' ');
          const [shour, ehour] = hourMinute.split('-');
          const newsHour = String(parseInt(shour, 10) + 1).padStart(2, '0');
          const neweHour = String(parseInt(ehour, 10) + 1).padStart(2, '0');

          return `${newsHour}-${neweHour} ${ampm}`;
        }
        const customTimeArray = [
          "12:00 am", "01:00 am", "02:00 am", "03:00 am", "04:00 am",
          "05:00 am", "06:00 am", "07:00 am", "08:00 am", "09:00 am",
          "10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm",
          "03:00 pm", "04:00 pm", "05:00 pm", "06:00 pm", "07:00 pm",
          "08:00 pm", "09:00 pm", "10:00 pm", "11:00 pm"
        ];

        // Create a new array of modified response objects
        const modifiedResponse = Object.values(data).map((slot, index) => {
          if (typeof slot === 'object' && slot.time) {
            return {
              ...slot,
              time: convertTimeFormat(slot.time, index)
            };
          }
          return slot;
        });

        console.log(modifiedResponse);
        setdatea6(Object.values(modifiedResponse))

        // Handle the response data here
        // console.log(data);
      })
      .catch(error => {
        setIsLoading(false)
        // Handle any errors here
        showMessage({
          message: error,
          type: "Danger",
          backgroundColor: "red", // background color
          duration: 5000,
          color: "#fff", // text color
        });
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

      slotapi(firstSelectedDate)
      console.log("First selected date:", firstSelectedDate);
      // slotapi(firstSelectedDate);
      // Do something with the first selected date
    }
  };

  const BookingPro = async (amount) => {
    const keys = await AsyncStorage.getItem('rkey')
    const phn = await AsyncStorage.getItem('phn')

    console.log(amount);
    var options = {

      description: `user number ${phn}`,
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: keys,
      amount: amount * 100,
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
      console.log('success');
      // handle success
      // alert(`Success: ${data.razorpay_payment_id}`);
      showMessage({
        message: `Success Your Payment, Payment id : ${data.razorpay_payment_id}`,
        type: "Success",
        backgroundColor: "green", // background color
        color: "#fff", // text color
        duration: 2000,
        onHide: () => {
          bookm(data.razorpay_payment_id, amount);
        }
      });
    }).catch((error) => {
      // handle failure
      console.log('fails' + error.description);

      // alert(`Error: ${error.code} | ${error.description}`);
      showMessage({
        message: error.error.description ? error.error.description : error.description,
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
    setIsLoading(true)
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
        setIsLoading(false)
        console.log('API response:', data);
        if (data.success) {
          BookingPro(data.price);
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
        setIsLoading(false)
        showMessage({
          message: error,
          type: "Danger",
          duration: 10000,
          backgroundColor: "red", // background color
          color: "#fff", // text color
          onHide: () => {
          }
        });
        console.error('Error calling API:', error);
        // Handle the error here
      });
  }
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const bookm = async (paymentid, amounts) => {
    const Token = await AsyncStorage.getItem('token');
    setIsLoading(true)
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
        setIsLoading(false)
        console.log('API response:', data);
        if (data.success) {
          slotapi()
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
        setIsLoading(false)
        showMessage({
          message: error,
          type: "Danger",
          duration: 10000,
          backgroundColor: "red", // background color
          color: "#fff", // text color
          onHide: () => {
          }
        });
        console.error('Error calling API:', error);
        // Handle the error here
      });
  }

  const closedi = () => {
    setShowWarning(false)
    csapi()
  }
  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View style={{ width: '100%' }}>
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
            <TouchableOpacity style={styles.btn} onPress={() => setShowWarning(true)}>
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
      <View style={styles.modalContainer}>
        <Modal
          visible={showWarning}
          transparent={true}
          animationType="slide">
          <TouchableWithoutFeedback onPress={() => setShowWarning(false)}>

            <View style={styles.modalContent}>
              <View style={{
                paddingVertical: hp(1), borderRadius: 8, backgroundColor: '#fff',
                padding: 20,
                borderRadius: 8,
                elevation: 5,
                position: 'absolute',
                alignSelf: 'center',
                top: '40%',
                width: '80%'
              }}>
                <View style={{ flexDirection: 'column', marginLeft: wp(8) }}>
                  {/* <CheckBox
                value={isChecked}
                onValueChange={() => handleCheckboxChange()}
              /> */}
                  {/* <Text style={{ textAlign: 'center', color: 'red', fontSize: wp(7) }}>Alert</Text> */}
                  <Text style={styles.modalText}>
                    The slot will not be canceled if 48 hours are left of the selected slot time.
                  </Text>
                  <Text style={styles.modalText}>
                    48 canceled before 48 hours will be refunded after deducting 20 percent.
                  </Text>
                </View>

                <TouchableOpacity onPress={() => handleCheckboxChange()} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', }}>
                  <CheckBox
                    value={isChecked}
                    onValueChange={() => handleCheckboxChange()}
                  />
                  <Text style={styles.modalText2}>
                    I agree to above conditions</Text>
                </TouchableOpacity>

                {
                  isChecked &&
                  <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => closedi()} >
                    <View style={{ backgroundColor: isChecked ? '#027850' : '#c0e8a1', paddingVertical: hp(1), borderRadius: 8 }}>
                      <Text style={{ color: '#fff', padding: wp(2) }}>Confirm Booking</Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>

            </View>
          </TouchableWithoutFeedback >

        </Modal>
      </View>

      {
        isLoading && (
          <View style={{ height: '100%', position: 'absolute', width: '100%', justifyContent: 'center', }}>
            <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: '100%' }} />
          </View>
        )
      }
    </View >
  );
}
export default DateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {

    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalText: {
    marginBottom: hp(2),
    color: 'red',
    flex: 1,
    fontSize: 15
  },
  modalText2: {
    color: 'red',
    flex: 1,
  },

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
  btn: { marginHorizontal: wp(4), marginTop: hp(2), height: wp(12), flex: 1, width: '80%', alignSelf: 'center' },
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