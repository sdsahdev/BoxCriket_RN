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
    const [selectedSlot, setSelectedSlot] = useState([]);

    // const [torna, settoyna] = useState(tor);

    const handleSlotSelection = (id, data) => {

        if (selectedSlot.length == 1) {
            const sID = selectedSlot[0].id
            const filterSlot = data.filter(slot => sID > id ? slot.id <= sID && slot.id >= id : slot.id >= sID && slot.id <= id);
            onStartTimeChange(filterSlot[0].start_time)
            onEndTimeChange(filterSlot[filterSlot.length - 1].end_time)
            setSelectedSlot(filterSlot)

            console.log(filterSlot[0].start_time);
            console.log(filterSlot[filterSlot.length - 1].end_time);
        } else {
            const filterSlot = data.filter(slot => slot.id == id);
            onStartTimeChange(filterSlot[0].start_time)
            onEndTimeChange(filterSlot[filterSlot.length - 1].end_time)
            setSelectedSlot(filterSlot)
            console.log(filterSlot[0].start_time);
            console.log(filterSlot[filterSlot.length - 1].end_time);
        }

    }

    const renderItem = ({ item, index }) => {

        const slot = selectedSlot.map(i => i.id)

        return (
            <>

                {item.start_time &&
                    <TouchableOpacity
                        disabled={!item.available}
                        onPress={() => {
                            handleSlotSelection(item.id, data)
                        }}>
                        <View style={[styles.timeSlot, slot.includes(item.id) && styles.selectedTimeSlot, !item.available ? styles.notAvaable : null]}>
                            <Text style={[styles.timeText, slot.includes(item.id) && styles.selectedtext]}>
                                {item.time2}
                            </Text>
                            {/* <Text style={[styles.timeText, { marginTop: hp(2), color: 'red' }, slot.includes(item.id) && styles.selectedtext]}>
                                ₹ {Math.trunc(item.price)}
                            </Text> */}
                        </View>
                    </TouchableOpacity>}


            </>
        );
    };

    return (
        <View style={styles.container}>

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
        color: '#000'
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
        width: wp(20),
        paddingVertical: hp(1.5),
        margin: wp(2),
        borderRadius: wp(1.5),
        alignItems: 'center',
        borderWidth: wp(0.3),
        borderColor: '#027850',
        flexDirection: 'column',
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