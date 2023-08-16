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
/*
const data6 = {
    "0": {
      "time2": "12-01 am",
      "success": true,
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
      "time2": "09-12 pm", time: '22-01 pm',
      "start_time": 1691960400,
      "end_time": 1691964000,
      "available": true,
      "price": 1000
    },
  }

  /*  "21": {
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

    */
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
  // ]; */