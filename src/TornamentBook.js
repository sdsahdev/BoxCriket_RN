import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
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

const TornamentBook = () => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [caldate, setcalldat] = useState({});
    const [startTimeData, setStartTimeData] = useState(null);
    const [endTimeData, setEndTimeData] = useState(null);

    const [tornament, settornament] = useState(false);
    const scrollViewRef = useRef(null);
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
    const data = [
        {
            id: '1',
            time: '01-02 am',
            price: 100,
            status: true,
            stime: '01:00',
            etime: '02:00',
        },
        {
            id: '2',
            time: '02-03 am',
            price: 100,
            status: true,
            stime: '02:00',
            etime: '03:00',
        },
        {
            id: '3',
            time: '03-04 am',
            price: 100,
            status: true,
            stime: '03:00',
            etime: '04:00',
        },
        {
            id: '4',
            time: '04-05 am',
            price: 100,
            status: true,
            stime: '04:00',
            etime: '05:00',
        },
        {
            id: '5',
            time: '05-06 am',
            price: 100,
            status: true,
            stime: '05:00',
            etime: '06:00',
        },
        {
            id: '6',
            time: '06-07 am',
            price: 100,
            status: true,
            stime: '06:00',
            etime: '07:00',
        },
        {
            id: '7',
            time: '07-08 am',
            price: 100,
            status: true,
            stime: '07:00',
            etime: '08:00',
        },
        {
            id: '8',
            time: '08-09 am',
            price: 100,
            status: true,
            stime: '08:00',
            etime: '09:00',
        },
        {
            id: '9',
            time: '09-10 am',
            price: 100,
            status: true,
            stime: '09:00',
            etime: '10:00',
        },
        {
            id: '10',
            time: '10-11 am',
            price: 100,
            status: true,
            stime: '10:00',
            etime: '11:00',
        },
        {
            id: '11',
            time: '11-12 am',
            price: 100,
            status: true,
            stime: '11:00',
            etime: '12:00',
        },
        {
            id: '12',
            time: '12-13 am',
            price: 100,
            status: true,
            stime: '12:00',
            etime: '13:00',
        },
        {
            id: '13',
            time: '13-14 pm',
            price: 100,
            status: true,
            stime: '13:00',
            etime: '14:00',
        },
        {
            id: '14',
            time: '14-15 pm',
            price: 100,
            status: true,
            stime: '14:00',
            etime: '15:00',
        },
        {
            id: '15',
            time: '15-16 pm',
            price: 100,
            status: true,
            stime: '15:00',
            etime: '16:00',
        },
        {
            id: '16',
            time: '16-17 pm',
            price: 100,
            status: true,
            stime: '16:00',
            etime: '17:00',
        },
        {
            id: '17',
            time: '17-18 pm',
            price: 100,
            status: true,
            stime: '17:00',
            etime: '18:00',
        },
        {
            id: '18',
            time: '18-19 pm',
            price: 100,
            status: true,
            stime: '18:00',
            etime: '19:00',
        },
        {
            id: '19',
            time: '19-20 pm',
            price: 100,
            status: true,
            stime: '19:00',
            etime: '20:00',
        },
        {
            id: '20',
            time: '20-21 pm',
            price: 100,
            status: true,
            stime: '20:00',
            etime: '21:00',
        },
        {
            id: '21',
            time: '21-22 pm',
            price: 100,
            status: true,
            stime: '21:00',
            etime: '22:00',
        },
        {
            id: '22',
            time: '22-23 pm',
            price: 100,
            status: true,
            stime: '22:00',
            etime: '23:00',
        },
        {
            id: '23',
            time: '23-24 pm',
            price: 100,
            status: true,
            stime: '23:00',
            etime: '24:00',
        },
        {
            id: '24',
            time: '24-01 pm',
            price: 100,
            status: true,
            stime: '24:00',
            etime: '01:00',
        },
    ];

    useEffect(() => {
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

    const handleDateSelect = date => {
        // Reset startTime and endTime to null when the date is removed
        setcalldat(date);
    };

    const BookingPro = () => {
        console.log('preess');
    };

    const handleStartTimeChange = time => {
        if (!time) {
            return;
        }

        const selectedStartTimeData = Object.values(data6).find(item => item.time === time);

        console.log(selectedStartTimeData.start_time, "====== sss time========")
        if (selectedStartTimeData) {
            setStartTimeData(selectedStartTimeData);
        }
    };

    const handleEndTimeChange = time => {

        if (!time) {
            console.error('endTime is not valid:', time);
            setEndTimeData(null);
            return;
        }

        const selectedEndTimeData = Object.values(data6).find(item => item.time === time);
        console.log(selectedEndTimeData.end_time, "====== endd time========")
        if (selectedEndTimeData) {
            setEndTimeData(selectedEndTimeData);
        }
    };

    const handletor = event => {
        settornament(event);
        // console.log(event, '++++event++++++++');
    };

    return (
        <View style={styles.mainView}>
            <ScrollView>
                <View>
                    <TopHeader name={'Book Your Tornament'} />
                </View>
                <Text style={styles.datess}>select date is required</Text>

                <View style={styles.thiView}>
                    <CalanderFile datesselect={handleDateSelect} />
                </View>

                <View>
                    {Object.keys(caldate).length !== 0 &&
                        startTime !== null &&
                        tornament === true && (
                            <TouchableOpacity style={styles.btn} onPress={() => BookingPro()}>
                                <Text style={styles.payment}>
                                    {startTime} to {endTime}
                                </Text>
                            </TouchableOpacity>
                        )}
                </View>

                <View style={styles.sendView}>
                    {tornament === false ? (
                        <Text Text style={styles.minHoursText}>
                            Please select minimum 5 hours
                        </Text>
                    ) : null}
                    {/* <SlotTime onStartTimeChange={handleStartTimeChange} onEndTimeChange={handleEndTimeChange} tor={handletor} data={data} /> */}
                    <SlotTime
                        onStartTimeChange={handleStartTimeChange}
                        onEndTimeChange={handleEndTimeChange}
                        tor={handletor}
                        data={Object.values(data6)}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default TornamentBook;

const styles = StyleSheet.create({
    datess: { alignSelf: 'center', color: '#f97272', marginVertical: hp(1) },

    minHoursText: {
        textAlign: 'center',
        fontSize: wp(4),
        color: 'red',
    },
    thiView: { marginHorizontal: wp(10) },
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
