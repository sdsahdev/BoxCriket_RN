import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import imagesClass from '../asserts/imagepath';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



// const data = [
//     { id: '1', image: imagesClass.banner2, leftText: 'Box 1', rightText: '$100/hr' },
//     { id: '2', image: imagesClass.box2, leftText: 'Box 2', rightText: '$200/hr' },
//     { id: '3', image: imagesClass.box3, leftText: 'Box 3', rightText: '$300/hr' },
//     { id: '4', image: imagesClass.box4, leftText: 'Box 3', rightText: '$300/hr' },

//     // Add more items as needed
// ];



const BoxeItems = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        // Call the API when the component mounts
        console.log("+++++++");
        fetchBoxData();
    }, []);

    const fetchBoxData = async () => {
        console.log("-----------");
        try {
            setIsLoading(true);
            const response = await fetch('https://boxclub.in/Joker/Admin/index.php?what=getBox');
            if (!response.ok) {
                setIsLoading(false);
                console.log("not ok");
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log(jsonData[0].images[0].url, "==== datas");
            setData(jsonData);
        } catch (error) {
            setIsLoading(false);
            console.log('Error:', error);
        }
    };

    // const navigation = useNavigation();
    const filteredData = Object.keys(data).filter(key => key !== 'keys').reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
    }, {});
    const renderItem = ({ item }) => (

        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Details", { item })}
            >
                <View style={{ flexDirection: 'row' }}>

                    {console.log(item.images[0])}
                    {console.log(item.images[1])}
                    {item.images[0] && <Image
                        source={{ uri: item.images[0].url }}
                        style={[item.images[1] ? [styles.image] : [item.images[1], { width: '100%', height: '100%' }]]}
                        resizeMode="stretch"
                    />}
                    <Image
                        source={{ uri: item.images[1] ? item.images[1].url : item.images[0].url }}
                        style={styles.image2}
                        resizeMode="stretch"
                    />
                </View>
                <View style={styles.textContainer}>
                    {item.name && <Text style={styles.textLeft}>{item.name}</Text>}
                    {item.morning_price && <Text style={styles.textRight}>{parseInt(item.morning_price)} ₹</Text>}
                </View>
            </TouchableOpacity>

        </View>
    );
    return (
        <View style={styles.container}>
            {isLoading && (
                <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: '100%' }} />)}
            <FlatList
                style={{ marginBottom: wp(19) }}
                data={Object.values(filteredData)}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: wp(1),
        marginVertical: wp(2),

    },
    image: {
        width: "70%",
        height: 200,
        borderTopLeftRadius: wp(2),
        borderBottomLeftRadius: wp(2),
    },
    image2: {
        width: "30%",
        height: 200,
        borderTopRightRadius: wp(2),
        borderBottomRightRadius: wp(2),
    },
    textContainer: {
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        paddingRight: wp(2),
        paddingTop: wp(1),
        paddingLeft: wp(2)
    },
    textLeft: {
        color: 'white',
        fontSize: 16,
        color: '#027850',
        fontWeight: 'bold',


    },
    textRight: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#027850',
    },
});
export default BoxeItems;