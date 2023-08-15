import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TimeSlotScreen = () => {
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);

    const data = {
        "success": true,
        "0": {
            "time2": "12-01 am",
            "time": "12-01 am",
            "start_time": 1692230400,
            "end_time": 1692234000,
            "available": true,
            "price": "1000.00"
        },
        "1": {
            "time2": "01-02 am",
            "time": "01-02 am",
            "start_time": 1692234000,
            "end_time": 1692237600,
            "available": true,
            "price": "1000.00"
        },
        "2": {
            "time2": "02-03 am",
            "time": "02-03 am",
            "start_time": 1692237600,
            "end_time": 1692241200,
            "available": true,
            "price": "1000.00"
        },
        "3": {
            "time2": "03-04 am",
            "time": "03-04 am",
            "start_time": 1692241200,
            "end_time": 1692244800,
            "available": true,
            "price": "1000.00"
        },
        "4": {
            "time2": "04-05 am",
            "time": "04-05 am",
            "start_time": 1692244800,
            "end_time": 1692248400,
            "available": true,
            "price": "1000.00"
        },
        "5": {
            "time2": "05-06 am",
            "time": "05-06 am",
            "start_time": 1692248400,
            "end_time": 1692252000,
            "available": true,
            "price": "1000.00"
        },
        "6": {
            "time2": "06-07 am",
            "time": "06-07 am",
            "start_time": 1692252000,
            "end_time": 1692255600,
            "available": true,
            "price": "1000.00"
        },
        "7": {
            "time2": "07-08 am",
            "time": "07-08 am",
            "start_time": 1692255600,
            "end_time": 1692259200,
            "available": true,
            "price": "1000.00"
        },
        "8": {
            "time2": "08-09 am",
            "time": "08-09 am",
            "start_time": 1692259200,
            "end_time": 1692262800,
            "available": true,
            "price": "1000.00"
        },
        "9": {
            "time2": "09-10 am",
            "time": "09-10 am",
            "start_time": 1692262800,
            "end_time": 1692266400,
            "available": true,
            "price": "1000.00"
        },
        "10": {
            "time2": "10-11 am",
            "time": "10-11 am",
            "start_time": 1692266400,
            "end_time": 1692270000,
            "available": true,
            "price": "1000.00"
        },
        "11": {
            "time2": "11-12 pm",
            "time": "11-12 pm",
            "start_time": 1692270000,
            "end_time": 1692273600,
            "available": true,
            "price": "1000.00"
        },
        "12": {
            "time2": "12-01 pm",
            "time": "12-13 pm",
            "start_time": 1692273600,
            "end_time": 1692277200,
            "available": true,
            "price": "1000.00"
        },
        "13": {
            "time2": "01-02 pm",
            "time": "13-14 pm",
            "start_time": 1692277200,
            "end_time": 1692280800,
            "available": true,
            "price": "1000.00"
        },
        "14": {
            "time2": "02-03 pm",
            "time": "14-15 pm",
            "start_time": 1692280800,
            "end_time": 1692284400,
            "available": false,
            "price": "1000.00"
        },
        "15": {
            "time2": "03-04 pm",
            "time": "15-16 pm",
            "start_time": 1692284400,
            "end_time": 1692288000,
            "available": true,
            "price": "1000.00"
        },
        "16": {
            "time2": "04-05 pm",
            "time": "16-17 pm",
            "start_time": 1692288000,
            "end_time": 1692291600,
            "available": true,
            "price": "1000.00"
        },
        "17": {
            "time2": "05-06 pm",
            "time": "17-18 pm",
            "start_time": 1692291600,
            "end_time": 1692295200,
            "available": true,
            "price": "1000.00"
        },
        "18": {
            "time2": "06-07 pm",
            "time": "18-19 pm",
            "start_time": 1692295200,
            "end_time": 1692298800,
            "available": true,
            "price": "1000.00"
        },
        "19": {
            "time2": "07-08 pm",
            "time": "19-20 pm",
            "start_time": 1692298800,
            "end_time": 1692302400,
            "available": true,
            "price": "1000.00"
        },
        "20": {
            "time2": "08-09 pm",
            "time": "20-21 pm",
            "start_time": 1692302400,
            "end_time": 1692306000,
            "available": true,
            "price": "1000.00"
        },
        "21": {
            "time2": "09-12 am",
            "time": "21-24 pm",
            "start_time": 1692306000,
            "end_time": 1692316800,
            "available": true,
            "price": 3000
        }
    }

    const handleSlotPress = (time) => {
        if (selectedStart && selectedEnd) {
            setSelectedStart(time);
            setSelectedEnd(null);
        } else if (selectedStart) {
            if (data[selectedStart] && data[time] && data[selectedStart].start_time > data[time].start_time) {
                setSelectedEnd(selectedStart);
                setSelectedStart(time);
            } else {
                setSelectedEnd(time);
            }
        } else {
            setSelectedStart(time);
        }
    };





    // const renderItem = ({ item }) => {
    //     const isSelected = selectedStart === item.time || selectedEnd === item.time;
    //     const itemStyle = isSelected ? styles.selectedItem : styles.item;


    //     return (
    //         <TouchableOpacity
    //             style={itemStyle}
    //             onPress={() => handleSlotPress(item.time)}
    //         >
    //             <Text style={styles.time}>{item.time2}</Text>
    //             <Text style={styles.price}>Price: {item.price}</Text>
    //         </TouchableOpacity>
    //     );
    // };
    const renderItem = ({ item, index }) => {
        const isSelected = selectedStart === item.time || selectedEnd === item.time;
        const itemStyle = isSelected ? styles.selectedItem : styles.item;

        let isBetween = false;
        if (selectedStart && selectedEnd) {
            const startIndex = Object.values(data).findIndex(item => item.time2 === selectedStart);
            const endIndex = Object.values(data).findIndex(item => item.time2 === selectedEnd);
            isBetween = index > Math.min(startIndex, endIndex) && index < Math.max(startIndex, endIndex);
        }

        const betweenItemStyle = isBetween ? styles.betweenItem : {};

        return (
            <TouchableOpacity
                style={[itemStyle, betweenItemStyle]}
                onPress={() => handleSlotPress(item.time)}
            >
                <Text style={styles.time}>{item.time2}</Text>
                <Text style={styles.price}>Price: {item.price}</Text>
            </TouchableOpacity>
        );
    };

    const logs = () => {
        const startIndex = Object.values(data).findIndex(item => item.time2 === selectedStart);
        const endIndex = Object.values(data).findIndex(item => item.time2 === selectedEnd);


        console.log(startIndex)
        console.log(endIndex)
        console.log(selectedStart, "===start==")
        console.log(selectedEnd, "===end==")
    }
    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={() => logs()}>
                <Text>suwgds</Text>
            </TouchableOpacity>
            <FlatList
                data={Object.values(data)}
                renderItem={renderItem}
                keyExtractor={(item) => item.time}
                numColumns={4} // 4 items per row
            />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        margin: 4,
    },
    selectedItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#147EFB',
        borderRadius: 8,
        margin: 4,
    },
    time: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    price: {
        color: '#666',
    },
});

export default TimeSlotScreen;
