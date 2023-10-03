

import { StyleSheet, Text, View, ActivityIndicator, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import About from './About';
import CalanderFile from '../Components/CalanderFile';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TopHeader from '../Components/TopHeader';
import TimeComp from '../Components/TimeComp';
import SlotTime from '../Components/SlotTime';
import RazorpayCheckout from 'react-native-razorpay';
import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import FlashMessage, {
    showMessage,
} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressLoader from 'rn-progress-loader';
import ModalCom from '../Components/ModalCom';

const TornamentBook = ({ navigation }) => {

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

    const BookingPro = async (amounts) => {
        setIsLoading(true)
        const phn = await AsyncStorage.getItem('phn')
        const famount = amounts / 2;
        console.log(amounts, ' ' + famount);
        const keys = await AsyncStorage.getItem('rkey')
        var options = {
            description: `user number ${phn}`,
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: keys,
            amount: (famount) * 100,
            name: 'Acme Corp',

            order_id: '',//Replace this with an order_id created using Orders API.
            prefill: {
                email: '',
                contact: phn,
                name: ''
            },
            theme: {
                color: '#027850',
            }
        }
        RazorpayCheckout.open(options).then((data) => {
            setIsLoading(false)

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
            setIsLoading(false)

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
        setIsLoading(true)
        setShowWarning(false)
        const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=checkMultipleSlot';

        const requestData = {
            start_time: startTime,
            end_time: endTime,
            box_id: item.id,
            dates: apidate,
            type: 'tournament'
        };
        console.log(requestData, "===res");
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

                console.error('Error calling API:', error);
                // Handle the error here
            });
    }

    const bookm = async (paymentid, amounts) => {

        setIsLoading(true)

        const Token = await AsyncStorage.getItem('token');

        const apiUrl = 'https://boxclub.in/Joker/Admin/index.php?what=bookMultipleSlot';

        const requestData = {
            start_time: startTime,
            end_time: endTime,
            box_id: item.id,
            dates: apidate,
            type: "tournament",
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

                console.error('Error calling API:', error);
                // Handle the error here
            });
    }
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const closedi = () => {
        // setShowWarning(false)
        // csapi()

        if (skiplog === 'true') {
            setloginSkip(true)
        } else {
            setShowWarning(true)
        }


    }
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
                    <TopHeader name={'Book Your Tournament'} back={true} navigation={navigation} />
                </View>
                <Text style={styles.datess}>select date is required</Text>
                <View style={styles.thiView}>
                    <CalanderFile datesselect={handleDateSelect} />
                </View>
                <View>

                    {Object.keys(caldate).length !== 0 && startTime !== null && (
                        // <TouchableOpacity style={styles.btn} onPress={() => BookingPro()}>
                        <TouchableOpacity style={styles.btn} onPress={() => closedi()}>
                            <Text style={styles.payment}>
                                Book Now
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.sendView}>
                    <Text style={[styles.datess, { fontWeight: 'bold', fontSize: wp(4.5) }]}>Reserve Your Cricket Slot Today: 50% Payment Now, Remaining on the Field!</Text>

                    <SlotTime
                        onStartTimeChange={(e) => setStartTime(e)}
                        onEndTimeChange={(e) => setEndTime(e)}
                        tor={handletor}
                        data={data} />
                </View>
            </ScrollView>
            <View style={styles.modalContainer}>
                <ModalCom visible={loginSkip} onClose={() => setloginSkip(false)} content={"For Access the full functionality of the app, Please login/register with us."} title={"Login Account"} btn={"login"} btnonpress={() => hlogout()} />
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

                                    <Text style={styles.modalText}>
                                        Reserve Your Cricket Slot Today: 50% Payment Now, Remaining on the Field!
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

                                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => csapi()} >
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

            <ProgressLoader
                visible={isLoading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={"#027850"} />
        </View >
    );
}

export default TornamentBook;

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