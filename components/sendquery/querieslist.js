import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    Alert,
    TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';

export default class QueriesList extends Component {
    animation

    constructor(props) {
        super(props);
        //console.log(this.props);
        this.state = {
            isLoading: true,
            data: [
            ]
        };
    }

    componentDidMount() {
        //this.animation.play();
        this.setState({
            //isLoading: false,
            data: this.props.student.Queries
        })
    }

    clickEventListener = (item) => {
        Alert.alert("" + item.Query)
    }

    __getCompletedIcon = (item) => {
        if (item.Status == 'Resolved') {
            return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
        } else if (item.Status == 'Dismiss') {
            return "https://img.icons8.com/flat_round/64/000000/delete-sign.png";
        } else if (item.Status == 'InProgress') {
            return "https://img.icons8.com/color/48/000000/time-machine--v1.png";
        } else if (item.Status == 'Pending') {
            return "https://img.icons8.com/fluency/64/000000/progress-indicator.png";
        }
    }

    __getDescriptionStyle = (item) => {
        if (item.Status == 'Dismiss') {
            return { textDecorationLine: "line-through", fontStyle: 'italic', color: "#808080" };
        } else if (item.Status == 'Resolved') {
            return { textDecorationLine: "line-through", fontStyle: 'italic', color: "#808080" };
        }
    }

    render() {
        console.log('hello', this.props.student.Queries);
        let { data, isLoading } = this.state
        // if (isLoading) {
        //     return (
        //         <View>
        //             <Text>Loading..</Text>
        //         </View>
        //     )
        // } else {
            return (
                <View style={styles.container}>
                    {/* <View style={styles.animationContainer}>
                        <LottieView
                            ref={animation => {
                                this.animation = animation;
                            }}
                            style={{
                                width: 180,
                                height: 180,
                                backgroundColor: 'transparent',
                            }}
                            source={require('../../assets/customerservice.json')} />
                    </View> */}
                    <FlatList
                        style={styles.tasks}
                        columnWrapperStyle={styles.listContainer}
                        ListHeaderComponent={() => (!this.state.data.length ?
                            <Text style={styles.emptyMessageStyle}>You have no querries pending</Text>
                            : null)}
                        data={this.state.data}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginHorizontal: 5, marginTop: 2, borderLeftWidth: 5, borderColor: '#f2b51c', borderRadius: 15 }}>
                                    <TouchableOpacity onPress={() => { this.clickEventListener(item) }}>
                                        <Card transparent style={{ borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }}>
                                            <CardItem>
                                                <Left>
                                                    <Thumbnail style={styles.image} source={{ uri: this.__getCompletedIcon(item) }} />
                                                    <Body>
                                                        <Text style={styles.statusText}>{item.Status}</Text>
                                                        <Text note style={styles.queryNumber}>Query no: {item.QueryNo}</Text>
                                                    </Body>
                                                </Left>
                                                <Right>
                                                    <Text note style={styles.date}>{item.Date.toString().slice(0, -9)}</Text>
                                                    {/* <Text note style={styles.time}>{item.Date.toString().slice(18)}</Text> */}
                                                </Right>
                                            </CardItem>
                                            <CardItem bordered footer>
                                                <View>
                                                    <Text style={{ fontSize: 14, color: '#f2b51c' }}>Description:</Text>
                                                    <Text numberOfLines={10} style={[styles.description, this.__getDescriptionStyle(item)]}>{item.Query}</Text>
                                                </View>
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                </View>
                            )
                        }} />
                </View>
            );
        //}
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "transparent",
    },
    statusText: {
        fontSize: 15,
        marginTop: 5,
        color: "#000"
    },
    tasks: {
        flex: 1,
    },
    dateStyle: {
        marginLeft: 0,
        marginTop: 10,
        borderColor: '#000',
        borderWidth: 0,
    },
    cardContent: {
        marginLeft: 0,
        marginTop: 50,
        borderColor: '#000',
        borderWidth: 0,
    },
    image: {
        width: 28,
        height: 28,
    },
    emptyMessageStyle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '50%'
    },
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        flexBasis: '46%',
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderLeftWidth: 5,
        borderColor: '#f2b51c'
    },

    description: {
        flex: 1,
        color: "#696969",
        fontWeight: 'normal',
        padding: 0,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 13,
        fontStyle: 'italic'
    },
    date: {
        fontSize: 12,
        flex: 1,
        color: "#696969",
        marginTop: 15,
    },
    time: {
        fontSize: 12,
        flex: 1,
        color: "#696969",
        marginTop: 2,
    },
    queryNumber: {
        fontSize: 12,
        flex: 1,
        color: "#696969"
    },
});
