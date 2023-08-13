import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import CalanderFile from '../Components/CalanderFile';
// nornmal and for bulk booking  comppoonent 
const SlotTime = ({ onStartTimeChange, onEndTimeChange, tor, data }) => {
    const [numColumns, setNumColumns] = useState(4);
    const [selectedItems, setSelectedItems] = useState({});
    const [selectedStartTime, setSelectedStartTime] = useState(null); +7
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [selectedStartTimeData, setSelectedStartTimeData] = useState(null);
    const [selectedEndTimeData, setSelectedEndTimeData] = useState(null);

    // const [torna, settoyna] = useState(tor);



    const handleTimePress = time => {
        if (!selectedStartTime) {
            setSelectedStartTime(time);
            setSelectedEndTime(null);
            onStartTimeChange(time);
            onEndTimeChange(null);
        } else if (!selectedEndTime) {
            if (time > selectedStartTime) {
                onEndTimeChange(time)
                setSelectedEndTime(time);
            } else {
                setSelectedEndTime(selectedStartTime);
                setSelectedStartTime(time);
                onEndTimeChange(selectedStartTime)
                onStartTimeChange(time)
            }
        } else {
            onStartTimeChange(time)
            setSelectedStartTime(time);
            setSelectedEndTime(null);
            onEndTimeChange(null)
        }
        setSelectedStartTimeData(data.find(item => item.time === selectedStartTime));
        setSelectedEndTimeData(data.find(item => item.time === selectedEndTime));
    };

    const handleItemPress = id => {
        setSelectedItems(prevSelectedItems => {
            const isSelected = prevSelectedItems[id];
            const updatedSelectedItems = { ...prevSelectedItems };
            if (isSelected) {
                updatedSelectedItems[id].quantity -= 1;
                if (updatedSelectedItems[id].quantity <= 0) {
                    delete updatedSelectedItems[id];
                }
            } else {
                updatedSelectedItems[id] = {
                    ...data.find(item => item.id === id),
                    quantity: 1,
                };
            }
            return updatedSelectedItems;
        });
    };

    const renderItem = ({ item, index }) => {
        const isSelected =
            (selectedStartTime &&
                selectedEndTime &&
                item.time >= selectedStartTime &&
                item.time <= selectedEndTime) ||
            (selectedStartTime && item.time === selectedStartTime) ||
            (selectedEndTime && item.time === selectedEndTime);

        return (
            <>
                {item.start_time &&
                    <TouchableOpacity
                        disabled={!item.available}
                        onPress={() => {
                            handleTimePress(item.time, data);
                            handleItemPress(index + 1);
                        }}>
                        <View style={[styles.timeSlot, isSelected && styles.selectedTimeSlot, !item.available ? styles.notAvaable : null]}>
                            <Text style={[styles.timeText, isSelected && styles.selectedtext]}>
                                {item.time2}
                            </Text>
                        </View>
                    </TouchableOpacity>}
            </>
        );
    };
    const calculateTotalDuration = () => {
        if (selectedStartTime && selectedEndTime) {
            // Calculate the time difference in hours
            const startMoment = moment(selectedStartTime, 'hh:mm a');
            const endMoment = moment(selectedEndTime, 'hh:mm a');
            const totalDuration = endMoment.diff(startMoment, 'hours');

            // { console.log(selectedStartTime, '===sat time ==='); }
            // { console.log(selectedEndTime, '===end time ==='); }
            // { console.log(startMoment, '===startMoment ==='); }
            // { console.log(endMoment, '===eendMoment ==='); }
            // { console.log(totalDuration, '===totalDuration ==='); }
            return totalDuration;
        }

        return 0; // Return 0 if start or end time is not selected
    };


    const renderSelectedItemsText = () => {
        const totalDuration = calculateTotalDuration();
        const requireDuration = 4 - totalDuration;
        const selectedItemsCount = Object.keys(selectedItems).length;
        return (
            <View>
                {totalDuration > 3 ? tor(true) : (
                    <>
                        {tor(false)}
                    </>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* {console.log(selectedStartTime, "===== start time ==")}
            {console.log(selectedEndTime, "===End time==")} */}

            {renderSelectedItemsText()}

            <FlatList
                style={{ flex: 1, alignSelf: 'center' }} // Set flex: 1 to occupy the remaining space
                data={data}
                numColumns={numColumns}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginTop: hp(2),
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.pxboxa}></View>

                    <Text style={styles.sold}>Available</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.pxboxn}></View>

                    <Text style={styles.sold}>Not Available</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.pxboxs}></View>

                    <Text style={styles.sold}>Selected</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    notAvaable: {
        backgroundColor: '#E5D9B6',
        color: '#fff'
    },
    datess: { alignSelf: 'center', color: '#f97272', marginVertical: hp(1) },
    pxboxa: {
        width: wp(3),
        height: wp(3),
        backgroundColor: '#E3EFEB',
        marginHorizontal: wp(2),
        borderColor: '#000',
        borderWidth: 1,
    },
    pxboxs: {
        width: wp(3),
        height: wp(3),
        backgroundColor: '#027850',
        marginHorizontal: wp(2),
        borderColor: '#000',
        borderWidth: 1,
    },
    pxboxn: {
        width: wp(3),
        height: wp(3),
        backgroundColor: '#E5D9B6',
        marginHorizontal: wp(2),
        borderColor: '#000',
        borderWidth: 1,
    },
    sold: { color: '#000' },
    thiView: { marginHorizontal: wp(10), },
    minHoursText: {
        textAlign: 'center',
        fontSize: wp(4),
        color: 'red',
        marginTop: 10,
    },
    timeText: { alignSelf: 'center', textAlign: 'center', flex: 1, fontWeight: 'bold', },
    selectedtext: { color: '#fff' },
    selectedItem: {
        // Add styles to indicate the selected item (e.g., change the background color)
        backgroundColor: 'blue',
    },
    slotTxt: {
        color: '#000',
        borderWidth: wp(0.3),
        borderColor: '#027850',
        padding: wp(3),
        borderRadius: wp(2),
        fontSize: wp(4),
        marginBottom: wp(1),
    },
    textLeft: { textAlignVertical: 'center', flex: 1 },
    timeSlot: {
        backgroundColor: '#E3EFEB',
        width: wp(18),
        height: hp(6),
        margin: wp(2),
        borderRadius: wp(1.5),
        alignItems: 'center',
        borderWidth: wp(0.3),
        borderColor: '#027850',
        flexDirection: 'row',
    },
    calView: { marginTop: hp(10) },
    con: {
        backgroundColor: '#E3EFEB',
        width: wp(12),
        height: wp(15),
        borderRadius: wp(2),
    },
    localestyle: {
        name: 'en', // Set the locale to English
        config: {
            months: moment.localeData('en').months(), // Use English months
            weekdaysShort: moment.localeData('en').weekdaysShort(), // Use English weekdays
        },
    },
    dateselect: {
        type: 'border',
        borderWidth: 0, // Adjust the borderWidth as desired
        borderHighlightColor: '#027850',

        // Add padding to create space between the border and content
    },
    hightname: {
        color: '#027850',
        fontSize: wp(4),
    },
    highDate: { color: '#027850', fontSize: wp(5) },
    datename: { color: 'grey', fontSize: wp(3.5) },
    numdate: { color: 'grey', fontSize: wp(3.5) },
    calheader: {
        color: '#000',
        fontSize: wp(5),
        paddingBottom: wp(5),
    },
    maincalanedr: {
        height: hp(14),
        paddingBottom: 20,
        position: 'relative',
    },
    container: { flex: 1, position: 'relative' },
    selectedDateText: { textAlign: 'center' },
    selectedItem: {
        backgroundColor: 'green',
    },
    selectedTimeSlot: {
        backgroundColor: 'green',
    },

});

export default SlotTime;