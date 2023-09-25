import React, { useEffect, useState } from 'react';
import TopHeader from '../Components/TopHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import imagesClass from '../asserts/imagepath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native'; // Import the hook
import SearchBar from '../Components/SearchBar';
import ProgressLoader from 'rn-progress-loader';



const Inbox = ({ navigation }) => {
    const [idata, setidata] = useState([]);
    const [idata2, setidata2] = useState([]);
    const [Visible, setVisible] = useState([]);
    const [searchText, setSearchText] = useState('');
    const isFocused = useIsFocused(); // Get the screen's focused state
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Call the API when the component mounts
        console.log('+++++++');
        inboxapi();
    }, [isFocused]);

    const inboxapi = async () => {
        const Token = await AsyncStorage.getItem('token');
        setIsLoading(true)
        fetch('https://boxclub.in/Joker/Admin/index.php?what=showInboxUser', {
            method: 'POST', // Assuming you want to use POST method
            headers: {
                'Content-Type': 'application/json',
                token: Token,
            },
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                // Handle the response data here
                console.log(data);
                if (data.success) {
                    setidata(data.bookings);
                    setidata2(data.bookings)
                } else {
                    showMessage({
                        message: data.message,
                        type: 'Danger',
                        backgroundColor: 'red', // background color
                        color: '#fff', // text color
                    });
                }
            })
            .catch(error => {
                showMessage({
                    message: 'something went wrong',
                    type: 'Danger',
                    backgroundColor: 'red', // background color
                    color: '#fff', // text color
                });
                setIsLoading(false)
                // Handle any errors here
                console.error('Error:', error);
            });
    };

    const renderItem = ({ item }) => (
        <View style={styles.timeSlot}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textLeft}>code</Text>
                <Text style={[styles.textLeft, { color: 'red' }]}>{item.code}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textLeft}>Time</Text>
                <Text style={styles.textLeft}>{item.time}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textLeft}>Date</Text>
                <Text style={styles.textLeft}>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textLeft}>BoxName</Text>
                <Text style={styles.textLeft}>{item.BoxName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textLeft}>Amount</Text>
                <Text style={styles.textLeft}>{item.amount}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textLeft}>message</Text>
                <Text style={styles.textLeft}>{item.message}</Text>
            </View>
            {item.message === 'booked' ? (
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                        navigation.navigate('Cancel', {
                            ids: item.id,
                        })
                    }>
                    <Text style={styles.payment}>Cancellation</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );

    const handleSerach = e => {
        setSearchText(e)
        let text = e.toLowerCase();
        let filteredData = idata2.filter(item => {
            return (
                item.code.toLowerCase().match(text) ||
                item.time.toLowerCase().match(text) ||
                item.date.toLowerCase().match(text) ||
                item.BoxName.toLowerCase().match(text) ||
                item.amount.toLowerCase().match(text) ||
                item.message.toLowerCase().match(text)
            );
        });

        if (!text || text === '') {
            setSearchText('');
            inboxapi();
        } else if (!filteredData.length) {
            console.log('no data');
        } else if (Array.isArray(filteredData)) {
            setidata(filteredData);
        }
    };

    const handlemodal = () => {
        console.log("truew");
        setVisible(true)
    }
    const filterData = (keywork) => {
        const filtered = idata2.filter(item => {
            // Replace this condition with your own filtering logic
            return item.message === keywork;
        });

        setidata(filtered);
        setVisible(false)
    };
    return (
        <View style={{ position: 'relative' }}>
            <View style={{ position: 'relative' }}>
                <View style={{ width: '100%' }}>
                    <TopHeader name={'Inbox'} />
                </View>

                <SearchBar searchText={searchText} onChangeSearchText={handleSerach} press={() => handlemodal()} />
                <ScrollView >

                    <View style={{ marginRight: wp(9), width: '100%', marginBottom: hp(50) }}>
                        <FlatList
                            style={{ alignSelf: 'center', width: '95%' }}
                            data={idata}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </View>

                </ScrollView>

                <Modal
                    visible={Visible}
                    transparent={true}
                    animationType="slide">
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>

                        <View style={styles.modalContent}>


                            <View style={{
                                paddingVertical: hp(1), borderRadius: 8, backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundColor: '#fff',
                                padding: 20,
                                borderRadius: 8,
                                elevation: 5,
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '40%',
                            }}>
                                <TouchableOpacity style={styles.mbtn} onPress={() => filterData("booked")} >
                                    <Text style={{ color: '#fff' }}>Booked</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.mbtn} onPress={() => filterData("cancel_request")} >
                                    <Text style={{ color: '#fff' }}>cancel request</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.mbtn} onPress={() => filterData("cancelled")} >
                                    <Text style={{ color: '#fff' }}>cancelled</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback >

                </Modal >
            </View >


            <ProgressLoader
                visible={isLoading}
                isModal={true} isHUD={true}
                hudColor={"#fff"}
                color={"#027850"} />
        </View >
    );
};

export default Inbox;

const styles = StyleSheet.create({
    mbtn: { alignSelf: 'center', marginVertical: hp(0.5), backgroundColor: '#027850', padding: hp(2), borderRadius: 3, width: wp(40), alignItems: 'center' }
    , modalContent: {
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
    timeSlot: {
        marginVertical: wp(2),
        paddingHorizontal: wp(2),
        borderWidth: wp(0.5),
        justifyContent: 'center',
        borderColor: '#027850',
        borderRadius: wp(2),
        paddingVertical: hp(1),
    },
    textLeft: {
        alignSelf: 'flex-start',
        textAlignVertical: 'top',
        verticalAlign: 'top',
        justifyContent: 'flex-start',
        flex: 1,
        flexWrap: 'wrap',
        marginVertical: wp(0.5),
        fontWeight: 'bold',
        fontSize: wp(4),
    },
});
