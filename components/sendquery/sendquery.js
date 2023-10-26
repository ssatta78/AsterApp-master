import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../action"
import { Ionicons } from "@expo/vector-icons";
// import config from "../config/config.json"
import {
    Container,
    Content,
    Picker,
    Item,
    Input,
    Icon,
    Form,
    Button,
    Text,
    Spinner,
    View,
    Textarea
} from "native-base"
import { Dropdown } from 'react-native-material-dropdown-v2'
import { Alert, LogBox } from "react-native"
import axios from "axios";

class sendQuery extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            categoryList: [],
            subCategoryList: [],
            data: [],
            response: []
        });
        this.getdata = this.getdata.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    state = {
        StudentId: '',
        QueryNo: '',
        Query: '',
        CampusId: '',
        AcademicYearId: '',
        StudentFAQId: '',
        isLoading: false
    }

    componentDidMount() {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        //console.log("safaf", this.props.route.params)

        this.setState({
            StudentId: this.props.route.params.Student_ID,
            CampusId: this.props.route.params.Campus.Id,
            QueryNo: this.props.route.params.QueryNo,
            AcademicYearId: this.props.route.params.AcademicYearId
        })

        this.getdata()
    }

    async getdata() {
        //console.log("Console", this.props.route.params.Campus)

        const StuId = this.props.route.params.Student_ID;
        const CampId = this.props.route.params.Campus.Id;
        const AcadId = this.props.route.params.AcademicYearId;

        // let resp = await axios.get(`http://194.233.80.159/api/StudentFAQCategories/GetCategories/${StuId}/${CampId}/${AcadId}`)
        // console.log("categories", resp.data.FAQCategories)
        // this.setState({ data: resp.data.FAQCategories })

        //TODO: Popup Dropdown all Categories List get
        var temp = [];
        fetch(`http://194.233.80.159/api/StudentFAQCategories/GetCategories/${StuId}/${CampId}/${AcadId}`, {
            method: "Get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                var len = responseJson.FAQCategories.length;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        var data = responseJson.FAQCategories[i];
                        var joined = { value: data.Name };
                        var id = { Id: data.Id };
                        //console.log('Category Id=', id, joined);
                        temp.push(joined);
                    }
                }
                //console.log('catelgory List Data=', JSON.stringify(temp));
                this.setState({
                    categoryList: temp
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    //TODO: Drop down selted values show group values
    async onChangeText(text) {

        const StuId = this.props.route.params.Student_ID;
        const CampId = this.props.route.params.Campus.Id;
        const AcadId = this.props.route.params.AcademicYearId;

        var temp = [];
        fetch(`http://194.233.80.159/api/StudentFAQCategories/GetCategories/${StuId}/${CampId}/${AcadId}`, {
            method: "Get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                var len = responseJson.FAQCategories.length;
                //console.log('Subcategory List Data=', JSON.stringify(len));
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        var data = responseJson.FAQCategories[i];
                        //console.log('Subcategory List Data=', data.Id);
                        if (data.Name == text) {
                            console.log('Category List Data=', data.Id);
                            var len1 = data.StudentFAQs.length;
                            if (len1 > 0) {
                                for (let j = 0; j < len1; j++) {
                                    var choice = data.StudentFAQs[j];
                                    //console.log('Selected Id=', choice.Id);
                                    var joinID = { Id: choice.Id };
                                    //console.log('SubId=', joinID);
                                    var joined = { value: choice.Id, label: choice.Description };
                                    temp.push(joined);
                                }
                            }
                        }
                    }
                }
                this.setState({
                    subCategoryList: temp,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    renderSpinner = () => {
        this.setState({ isLoading: !this.state.isLoading })
    }

    render() {
        const date = new Date().toDateString();
        return (
            <Container style={styles.container}>
                <Content>
                    <Form>
                        <View style={styles.event}>
                            <Text style={styles.eventDay}>Query # {this.state.QueryNo}</Text>
                            <Text note>{date}</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ padding: 10 }}>
                                <Dropdown
                                    label="FAQ Category"
                                    onChangeText={this.onChangeText}
                                    data={this.state.categoryList}
                                    animationDuration={400}
                                    baseColor='rgba(244, 182, 23, 0.8)'
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Dropdown
                                    label="FAQs"
                                    onChangeText={(value) => {
                                        this.setState({ StudentFAQId: value })
                                    }}
                                    baseColor='rgba(244, 182, 23, 0.8)'
                                    data={this.state.subCategoryList}
                                    animationDuration={400}
                                />
                            </View>
                        </View>
                        <Item regular style={styles.input}>
                            <Textarea maxLength={280} style={{ width: '100%', paddingTop: '2%', borderRadius: 10 }} rowSpan={5} placeholder='Write down your query..' placeholderTextColor='#DCDCDF' onChangeText={v => this.setState({ Query: v })} />
                        </Item>
                        <Button block style={{ backgroundColor: '#f2b51c', marginTop: 20, elevation: 0 }}
                            onPress={() => {
                                if (this.state.Query) {
                                    this.renderSpinner();
                                    this.props.addQuerry({
                                        studentID: this.state.StudentId,
                                        queryNo: this.state.QueryNo,
                                        query: this.state.Query,
                                        compusId: this.state.CampusId,
                                        year: this.state.AcademicYearId,
                                        studentfaqID: this.state.StudentFAQId
                                    }, () => {
                                        this.props.navigation.goBack()
                                    })
                                } else {
                                    Alert.alert("Empty Text!",
                                        "Please fill out the query box!",
                                        [
                                            { text: 'OK', onPress: this._doSomethingSerious, style: 'destructive' },
                                        ],
                                        { cancelable: false }
                                    )
                                }
                            }}>
                            {this.state.isLoading ? <Spinner size={24} color="white" /> :
                                <View style={styles.btn}>
                                    <Text style={{ color: '#EEEDF5', marginRight: 20 }}>Submit</Text>
                                    <Ionicons name="send" size={20} color="white" />

                                </View>
                            }
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 15
    },
    event: {
        flexDirection: 'column',
        paddingLeft: 5
    },
    eventDay: {
        fontSize: 20,
        color: "#0099FF",
        fontWeight: "800",
        marginBottom: 5
    },
    eventDate: {
        fontSize: 16,
        color: "#000",
        fontWeight: "600",
    },
    form: {
        width: '90%',
        marginTop: '5%',
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: '#fff',
        elevation: 2,
        borderRadius: 3,
        marginBottom: 10,
        marginTop: 30,
        paddingLeft: 5,
    }
}


export default connect(null, actions)(sendQuery);
