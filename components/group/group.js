import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from "native-base"
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import StudentProfile from "../student/studentProfile";

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeader: ['Group Attendance Summary'],
      tableHead: ['No.', 'Date', 'Group', 'Check In', 'Status'],
      tableData: [
      ]
    }
  }
  componentDidMount() {
    const { StuGroupAttendance } = this.props.route.params;
    const { GroupName } = this.props.route.params;
    //console.log('Group Name', this.props.route.params);
    console.log('Group Name: ', GroupName);
    const time = StuGroupAttendance.map((i, index) => [index + 1,
    i.Date ? new Date(i.Date).toString().slice(0, 16) : null,
    i.GroupName ? i.GroupName.toString() : <Text style={styles.greyStatus}>Not Found</Text>,
    i.CheckIn ? i.CheckIn.toString().slice(0, 5) : <Text style={styles.greyStatus}>Not Found</Text>,
    i.Attendance == 'Absent' ? <Text style={styles.redStatus}>{i.Attendance}</Text> : i.Attendance == 'Bunk' ? <Text style={styles.yellowStatus}>{i.Attendance}</Text> : i.Attendance == 'Present' ? <Text style={styles.greenStatus}>{i.Attendance}</Text> : i.Attendance == 'Leave' ? <Text style={styles.blueStatus}>{i.Attendance}</Text> : i.Attendance == 'Cancelled' ? <Text style={styles.strikeStatus}>{i.Attendance}</Text> : null]);
    this.setState({
      tableHeader: GroupName,
      tableData: time
    })
  }
  render() {
    const state = this.state;
    //console.log('hello', this.props.route.params.StuGroupAttendance);
    const { Subject } = this.props.route.params;
    return (
      <Container style={{ backgroundColor: 'tranparent' }}>
        {/* <StudentProfile student={this.props.route.params} /> */}
        <Text style={styles.header}>{Subject ? Subject.toUpperCase() : <Text style={styles.header}>Loading..</Text>}</Text>
        {/* <Text style={styles.header}>{Subject? Subject.toUpperCase(): <Text style={styles.header}>Loading..</Text>}</Text> */}
        <Table borderStyle={{ borderWidth: 0.5 }}>
          {/* <Row data={state.tableHeader} flexArr={[1]} style={styles.head} textStyle={styles.text} /> */}
          <Row data={state.tableHead} flexArr={[1]} style={styles.head} textStyle={styles.text} />
        </Table>
        <Content>
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 0.5 }}>
              <TableWrapper style={styles.wrapper}>
                <Rows data={state.tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.datatext} />
              </TableWrapper>
            </Table>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: { marginBottom: 0, backgroundColor: '#D9E1EA', fontWeight: '600', textAlign: 'center', padding: 10, borderWidth: 0 },
  container: { flex: 1, padding: 0, paddingTop: 0, backgroundColor: 'transparent' },
  head: { height: 35, backgroundColor: '#D9E1EA' },
  wrapper: { flexDirection: 'row', paddingTop: 0 },
  row: { height: 30, backgroundColor: '#fff' },
  text: { textAlign: 'center', fontSize: 9, color: '#000', fontWeight: '600' },
  datatext: { textAlign: 'center', fontSize: 8 },
  greenStatus: { textAlign: 'center', fontSize: 9, color: '#3cb043', fontWeight: '500' },
  redStatus: { textAlign: 'center', fontSize: 9, color: '#FF0000', fontWeight: '500' },
  yellowStatus: { textAlign: 'center', fontSize: 9, color: '#FFBF00', fontWeight: '500' },
  greyStatus: { textAlign: 'center', fontSize: 9, color: '#C0C0C0', fontWeight: '500' },
  blueStatus: { textAlign: 'center', fontSize: 9, color: '#2471a3', fontWeight: '500' },
  strikeStatus: { textAlign: 'center', fontSize: 9, color: '#FF0000', fontWeight: '500', textDecorationLine: 'line-through' }
});


