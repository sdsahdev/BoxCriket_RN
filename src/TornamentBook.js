

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
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

const TornamentBook = () => {

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

    const BookingPro = async (amounts) => {
        setIsLoading(true)

        const keys = await AsyncStorage.getItem('rkey')
        var options = {
            description: 'Credits towards ',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: keys,
            amount: amounts * 100,
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
                    bookm(data.razorpay_payment_id, amounts);
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
        setIsLoading(true)

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
            {isLoading && (
                <View style={{ height: '100%', position: 'absolute', width: '100%', justifyContent: 'center', }}>
                    <View style={{ height: hp(10), width: wp(10), backgroundColor: '#fff', position: 'absolute', justifyContent: 'center', alignSelf: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: '100%' }} />
                    </View>
                </View>
            )}

        </View>
    );
}
export default TornamentBook;

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