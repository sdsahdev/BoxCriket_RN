import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import imagesClass from '../asserts/imagepath';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SearchBar = ({ searchText, onChangeSearchText, press }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Image source={imagesClass.search} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchText}
                    returnKeyType='done'
                    onChangeText={onChangeSearchText}
                />
            </View>
            <TouchableOpacity onPress={press}>
                <Image source={imagesClass.filter} style={styles.icon} />
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        width: wp(100),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: wp(5),
        paddingHorizontal: wp(2),
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#027850',
        borderWidth: 1,
        borderRadius: 10,
        padding: 7,

    },
    icon: { height: hp(3), width: hp(3), marginRight: wp(2), tintColor: '#027850' },
    input: {
        width: '80%'
        // flex: 1,
    },
});

export default SearchBar;
