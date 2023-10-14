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
import ProgressLoader from 'rn-progress-loader';
import { Notificationutill } from './Notificationutill';
import ModalCom from '../Components/ModalCom';

const DateTime = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const { item } = route.params;
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [caldate, setcalldat] = useState({});
  const [data, setdatea6] = useState([])
  const [apidate, setapidate] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [hasLoaded, setHasLoaded] = useState(false);
  const [fDate, setfDate] = useState('')

  const [skiplog, setSkiplo] = useState('');
  const [loginSkip, setloginSkip] = useState(false);


  useEffect(() => {
    // Define an async function to perform asynchronous operations
    const fetchData = async () => {
      console.log('+++++++');
      try {
        const skipLogin = await AsyncStorage.getItem('skiplogin');
        console.log(skipLogin);
        if (skipLogin === 'true') {
          setSkiplo('true');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


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
        // Create a new array of modified response objects
        const modifiedResponse = Object.values(data).map((slot, index) => {
          if (typeof slot === 'object' && slot.time) {
            return {
              ...slot,
              id: index + 1
            };
          }
          return slot;
        });

        console.log(modifiedResponse);
        setdatea6(Object.values(modifiedResponse))
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
      setfDate(firstSelectedDate);
      slotapi(firstSelectedDate)

      console.log("First selected date:", firstSelectedDate);
      // slotapi(firstSelectedDate);
      // Do something with the first selected date
    }
  };

  const BookingPro = async (amount) => {
    const keys = await AsyncStorage.getItem('rkey')
    const phn = await AsyncStorage.getItem('phn')
    const famount = amount / 2;
    console.log(famount);
    var options = {

      description: `user number ${phn}`,
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: keys,
      amount: famount * 100,
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
          bookm(data.razorpay_payment_id, famount);
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


  const handletor = time => {
  };

  const csapi = () => {
    setShowWarning(false)
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
          message: 'Please try again later',
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
    const user_name = await AsyncStorage.getItem('user_name');
    const user_email = await AsyncStorage.getItem('user_email');
    const user_phone = await AsyncStorage.getItem('user_phone');
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
          slotapi(fDate)
          sendNotification(data.fcms, user_name, user_phone);
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
    if (skiplog === 'true') {
      setloginSkip(true)
    } else {
      setShowWarning(true)
    }

  }
  const sendNotification = (fcm, name, phone) => {
    const titles = 'Booking confirm';
    const messages = `${name} is book the slot Please check your index in app`;
    const fcmTokens = ['cssa9EVJ8UBkuhxM4Nwebc: APA91bEmfHtJbbTpkOdKVlSxcECkoSQT5pdzcANa_nLyT0zp6NDpLJTt0vXkol9mkVUqvKMIlqIY8qJihY - fdSit7QRCCQLlepmopW2TdvOefDI7tzhYuFhjUlrN_WjYuRa5ixEWcM_m', 'clEsWk9yQf-cED6WNtApGT:APA91bFAIQQ-YrRyj8TXU0Uw0vtJN0Z-RPVsFObc4-alPkHeLOk0ghXck9hZJtKArNMY9rlsyPsX6nPPtNqbMP-bFCps1j9QGeGGQGesy8DEe7HyFOkzFyeRuM-Yal9EiE_rB3v_Qrse', "fMjuTtQ0iUKjhhoiVlXoix:APA91bGEjMxDxCj9NhJDbM1PSKu8_p2jMIEJlkBxOS6ApgZmlI2JVAG7Hlv7PUQmqSWQr00KxqdhlJxVFWgFJp5tEYTgv4tYF5fY0DbDzwHWcR9uxpTpvZ7oIwu2MFslFzqBpB9WpAyC"];

    Notificationutill(titles, messages, fcm);
  };
  const hlogout = async () => {
    console.log('Logout');

    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'loginSceen' }],
    });
  };

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View style={{ width: '100%' }}>
          <TopHeader name={'Book Your Slot'} back={true} navigation={navigation} />
        </View>
        {/* experine :  */}
        {/* {console.log(startTime, "==satrt===")}
        {console.log(endTime, "==end===")} */}

        <Text style={styles.datess}>select date is required</Text>
        <View style={styles.thiView}>
          <CalanderFile datesselect={handleDateSelect} />
        </View>
        <View>

          {Object.keys(caldate).length !== 0 && startTime !== null && (
            <TouchableOpacity style={styles.btn} onPress={() => closedi()}>
              <Text style={styles.payment}>Book Now</Text>
            </TouchableOpacity>
          )}


        </View>
        <View style={styles.sendView}>
          <Text style={[styles.datess, { fontWeight: 'bold', fontSize: wp(4.5) }]}>Reserve Your Cricket Slot Today: 50% Payment Now, Remaining on the Field!</Text>

          <SlotTime
            onStartTimeChange={(e) => setStartTime(e)}
            onEndTimeChange={(e) => setEndTime(e)}
            tor={false}
            data={data} />
        </View>
      </ScrollView>
      <View >
        <ModalCom visible={loginSkip} onClose={() => setloginSkip(false)} content={"For Access the full functionality of the app, Please login/register with us."} title={"Login Account"} btn={"login"} btnonpress={() => hlogout()} />


        <Modal
          visible={showWarning}
          transparent={true}

          animationType="fade">
          <TouchableWithoutFeedback onPress={() => setShowWarning(false)}>

            <View style={styles.modalContent}>
              <View style={styles.modalv}>
                <View style={styles.modalSv}>

                  <Text style={styles.modalText}>
                    The slot will not be canceled if 48 hours are left of the selected slot time.
                  </Text>
                  <Text style={styles.modalText}>
                    48 canceled before 48 hours will be refunded after deducting 20 percent.
                  </Text>
                  <Text style={styles.modalText}>
                    Reserve Your Cricket Slot Today: 50% Payment Now, Remaining on the Field!                  </Text>
                </View>

                <TouchableOpacity onPress={() => handleCheckboxChange()} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', }}>
                  <CheckBox
                    style={{ marginRight: 5 }}
                    value={isChecked}
                  // onValueChange={() => handleCheckboxChange()}
                  />
                  <Text style={styles.modalText2}>
                    I agree to above conditions</Text>
                </TouchableOpacity>

                {
                  isChecked &&
                  <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => csapi()} >
                    <View style={{ backgroundColor: isChecked ? '#027850' : '#c0e8a1', paddingVertical: hp(1), borderRadius: 8 }}>
                      <Text style={{ color: '#fff', padding: wp(2) }}>Confirm Booking</Text>
                    </View>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </TouchableWithoutFeedback>

        </Modal>
      </View>
      <ProgressLoader
        visible={isLoading}
        isModal={true} isHUD={true}
        hudColor={"#fff"}
        color={"#027850"} />
    </View>
  );
}
export default DateTime;

const styles = StyleSheet.create({
  modalSv: { flexDirection: 'column', marginLeft: wp(8) },
  modalv: {
    paddingVertical: hp(1), borderRadius: 8, backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    width: '80%'
  },
  modalContent: {

    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  container: {
    flex: 1,
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

  datess: { alignSelf: 'center', color: '#f97272', marginVertical: hp(1), textAlign: 'center', paddingHorizontal: wp(4), },

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
  btn: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    height: wp(12),
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#027850'

  }, payment: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: wp(5),
    justifyContent: 'center',
    padding: wp(3)
  },
});