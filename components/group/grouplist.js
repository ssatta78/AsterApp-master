import React, { Component } from 'react';
import {
    Card,
    CardItem,
    Left,
    Right,
    Text,
    View,
    Body,
} from "native-base"
import LottieView from 'lottie-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { FlatList } from 'react-native-gesture-handler';

class GroupList extends Component {

    renderGroupList = ({ item, i }) => {

        return (
            <View style={{ marginHorizontal: 12, marginTop: 2 }}>
                <Card
                    style={{
                        width: '100%', borderRadius: 8
                    }}>
                    <CardItem style={{ backgroundColor: 'transparent' }}>
                        <Left>
                            <Body>
                                <ProgressCircle
                                    percent={item.Percentage}
                                    radius={40}
                                    borderWidth={5}
                                    color={item.Percentage < 80 ? '#FF0000' : '#3cB043'}
                                    shadowColor="#c1c1c1"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 16 }}>{item.Percentage + '%'}</Text>
                                </ProgressCircle>
                            </Body>
                        </Left>
                        <Body style={{ marginStart: 10 }}>
                            <Left>
                                {/* <Text key={i} note style={{ marginBottom: 3, marginTop: 5 }}>Total Days: {item.totalworkingdays}</Text> */}
                                <Text key={i} note style={{ marginBottom: 3 }}>Bunks: {item.TotalBunk}</Text>
                                <Text key={i} note style={{ marginBottom: 3 }}>Absents: {item.TotalAbsent}</Text>
                                <Text key={i} note style={{ marginBottom: 3 }}>Leaves: {item.TotalLeave}</Text>
                                <Text key={i} note style={{ marginBottom: 5 }}>Presents: {item.TotalPresent}</Text>
                            </Left>
                        </Body>
                        <Right style={{ marginStart: 5 }}>
                            <Text note numberOfLines={1} style={styles.groupText}>{item.Subject? item.Subject.toUpperCase() : <Text note numberOfLines={1} style={styles.groupText}>Loading..</Text>}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.props.navigation.navigate('Group', item)
                                }}
                            >
                                <Text key={i} note style={{ marginBottom: 5, marginTop: 0 }}>Total Days: {item.totalworkingdays}</Text>
                                <Text style={styles.buttonText}>View Details</Text>
                            </TouchableOpacity>
                        </Right>
                    </CardItem>
                </Card>
            </View>
        )
    }

    renderEmptyMessage = ({ item, i }) => {
        return (
            <View style={{ marginHorizontal: 12, marginTop: 2 }}>
                <Card
                    style={{
                        width: '100%', borderRadius: 10
                    }}>
                    <CardItem style={{ backgroundColor: 'transparent' }}>
                        <Left>
                            <Body>
                                <ProgressCircle
                                    percent={0}
                                    radius={40}
                                    borderWidth={5}
                                    color={0 < 80 ? '#FF0000' : '#3cB043'}
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 20 }}>{0 + '%'}</Text>
                                </ProgressCircle>
                            </Body>
                        </Left>
                        <Body style={{ marginStart: 10 }}>
                            <Left>
                                <Text key={i} note style={{ marginBottom: 3, marginTop: 5 }}>Total Days: </Text>
                                <Text key={i} note style={{ marginBottom: 3 }}>Bunks: </Text>
                                <Text key={i} note style={{ marginBottom: 3 }}>Absents: </Text>
                                <Text key={i} note style={{ marginBottom: 5 }}>Presents: </Text>
                            </Left>
                        </Body>
                        <Right style={{ marginStart: 5 }}>
                            <View style={styles.animationContainer}>
                                <LottieView
                                    ref={animation => {
                                        this.animation = animation;
                                    }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: 'transparent',
                                    }}
                                    source={require('../../assets/customerservice.json')} />
                            </View>
                            <Text note numberOfLines={1} style={styles.groupEmptytext}>Work in progress...</Text>
                        </Right>
                    </CardItem>
                </Card>
            </View>)
    }



    render() {
        const { StudentAttendPercentage } = this.props.student
        return (
            <FlatList
                renderItem={this.renderGroupList}
                data={StudentAttendPercentage}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            //ListEmptyComponent={this.renderEmptyMessage}
            />
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "transparent",
        padding: 5,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#ebf0f7',
        borderRadius: 5,
    },
    buttonText: {
        color: "#f2b51c",
        fontSize: 12,
        justifyContent: "center",
        textAlign: "center",
    },
    groupText: {
        color: '#48494b',
        fontWeight: '500',
        marginBottom: 2,
        padding: 3,
    },
    groupEmptytext: {
        color: 'red',
        marginTop: 10
    },
    emptyMessageStyle: {
        textAlign: 'center',
    },
    animationContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GroupList;
