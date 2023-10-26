
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Thumbnail } from 'native-base';


export default class ProfileList extends Component {

    render() {
        const api = "http://194.233.80.159/";
        const defaultImage = 'Content/Images/UserDefault.png';
        const { Stu_Name, PhotoPath, Student_ID, Campus, HouseName, Stu_Class_name, Stu_PerAddress, Section } = this.props.student;
        const photoPath = PhotoPath ? PhotoPath.toString().slice(6) : defaultImage;
        const url = api + photoPath;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar} source={{ uri: url }} />
                        <Text style={styles.name}>
                            {Stu_Name}
                        </Text>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                        <Thumbnail large
                            source={{
                                uri: url,
                            }}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={[styles.title, {
                                marginTop: 15,
                                marginBottom: 5,
                            }]}>{Stu_Name}{Stu_Name}</Text>
                            <Text note style={styles.caption}>@{Student_ID}</Text>
                        </View>
                    </View>
                </View>

                {/* <View style={styles.profileDetail}>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Student Id</Text>
                        <Text style={styles.count}>{Student_ID}</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Campus</Text>
                        <Text style={styles.count}>{Campus}</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Class</Text>
                        <Text style={styles.count}>{Stu_Class_name}</Text>
                    </View>
                </View> */}
                {/* <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 1</Text>
                        </TouchableOpacity>
                        <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                    </View>
                </View> */}
                <View style={{ marginTop: 50 }}>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="home" />
                            </Button>
                        </Left>
                        <Body>
                            <Text numberOfLines={2} note style={{ fontWeight: '400' }}>{Stu_PerAddress}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="business" />
                            </Button>
                        </Left>
                        <Body>
                            <Text note style={{ fontWeight: '400' }}>{Campus} <Text note> ({Section})</Text></Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="card" />
                            </Button>
                        </Left>
                        <Body>
                            <Text note style={{ fontWeight: '400' }}>{Stu_Class_name} <Text note> ({Section})</Text></Text>
                        </Body>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="shirt" />
                            </Button>
                        </Left>
                        <Body>
                            <Text note style={{ fontWeight: '400' }}>{HouseName}</Text>
                        </Body>
                    </ListItem>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    userInfoSection: {
        paddingHorizontal: 30, 
        marginBottom: 25,
    },
    titleName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    header: {
        backgroundColor: "#f2f7ff",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        marginBottom: 10,
        resizeMode: 'stretch'
    },
    name: {
        fontSize: 16,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#dcf0ef',
        color: "#000",
        fontWeight: '400'
    },
    profileDetail: {
        alignSelf: 'center',
        marginTop: 210,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: "#f2f7ff"
    },
    detailContent: {
        margin: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: "#00CED1",
        fontWeight: 'bold',
    },
    count: {
        fontSize: 18,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        marginTop: 40
    },
    textInfo: {
        fontSize: 18,
        marginTop: 20,
        color: "#696969",
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00CED1",
    },
    description: {
        fontSize: 20,
        color: "#00CED1",
        marginTop: 10,
        textAlign: 'center'
    },
});
