import React, { Component } from 'react';
import StudentProfile from "./studentProfile";
import { Container, Content } from 'native-base';
import StudentMaterialLiSt from './studentMaterialList';
class StudentDetail extends Component {

    render() {
        return (
            <Container style={{ backgroundColor: '#f3f7fa' }}>
                <StudentProfile student={this.props.route.params} />
                <Content>
                    <StudentMaterialLiSt navigation={this.props.navigation} student={this.props.route.params} />
                </Content>
            </Container>
        );
    }
}


export default StudentDetail;
