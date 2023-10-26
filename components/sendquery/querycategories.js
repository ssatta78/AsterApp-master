import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from "axios";

function Item({ item, props }) {
    return (
        <TouchableOpacity>
            <View style={styles.listItem}>
                {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} /> */}
                <View style={{ alignItems: "center", flex: 0 }}>
                    <Text style={{ fontWeight: "bold", color: 'grey' }}>{item.Name.toUpperCase()}</Text>
                    <Text>{item.Description}</Text>
                </View>
                {/* <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"green"}}>Call</Text>
      </TouchableOpacity> */}
            </View>
        </TouchableOpacity>
    );
}

export default class App extends React.Component {
    state = {
        data: [
        ]
    }

    componentDidMount() {
        //console.log("safaf", this.props.route.params)
        this.getapiData()
    }

    async getapiData() {
        //console.log("Console", this.props.route.params.Campus)

        const StuId = this.props.route.params.Student_ID;
        const CampId = this.props.route.params.Campus.Id;
        const AcadId = this.props.route.params.AcademicYearId;

        let resp = await axios.get(`http://194.233.80.159/api/StudentFAQCategories/GetCategories/${StuId}/${CampId}/${AcadId}`)
        console.log("categories", resp.data.FAQCategories[0].StudentFAQs)
        this.setState({ data: resp.data.FAQCategories })
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item.Id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop: 5
    },
    listItem: {
        margin: 2,
        padding: 5,
        backgroundColor: "#FFF",
        width: "95%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    }
});
