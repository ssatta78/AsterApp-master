import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ProfileScreen extends Component {

    render() {
        const api = "http://194.233.80.159/";
        const defaultImage = 'Content/Images/UserDefault.png';
        const { Stu_Name, PhotoPath, Student_ID, Campus, HouseName, Stu_Class_name, Stu_PerAddress, Section, Stu_Mobile } = this.props.student;
        const photoPath = PhotoPath ? PhotoPath.toString().slice(6) : defaultImage;
        const url = api + photoPath;

        return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: url,
                                }}
                                size={80}
                            />
                            <View style={{ marginLeft: 20 }}>
                                <Title style={[styles.title, {
                                    marginTop: 15,
                                    marginBottom: 0,
                                }]}>{Stu_Name}</Title>
                                <Caption style={styles.caption}>@{Student_ID}</Caption>
                            </View>
                        </View>
                    </View>

                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon name="map-marker-radius" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>{Stu_PerAddress}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="phone" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>{Stu_Mobile}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="email" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>****@alpha.edu.pk</Text>
                        </View>
                    </View>

                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox, {
                            borderRightColor: '#dddddd',
                            borderRightWidth: 1
                        }]}>
                            <Title>{HouseName}</Title>
                            {/* <Caption>House Name</Caption> */}
                        </View>
                        <View style={styles.infoBox}>
                            <Title>{Stu_Class_name}</Title>
                            {/* <Caption>Orders</Caption> */}
                        </View>
                    </View>

                    <View style={styles.menuWrapper}>
                        <TouchableRipple onPress={() => { }}>
                            <View style={styles.menuItem}>
                                <Icon name="school-outline" color="#FF9501" size={25} />
                                <Text style={styles.menuItemText}>{Campus}</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => { }}>
                            <View style={styles.menuItem}>
                                <Icon name="home" color="#FF9501" size={25} />
                                <Text style={styles.menuItemText}>{Section}</Text>
                            </View>
                        </TouchableRipple>
                    </View>
                </SafeAreaView>
        );
    }
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
