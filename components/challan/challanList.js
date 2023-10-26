import React, { Component } from "react";
import {
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Text,
  View,
  Button,
} from "native-base";
import { Linking } from "react-native";
class ChallanList extends Component {
  renderChallanList = () => {
    const { FeeVoucher } = this.props.student;
    if (FeeVoucher.length) {
      return FeeVoucher.map((feeVoucher, i) => {
        return (
          <Card transparent>
            <CardItem bordered style={{ backgroundColor: "lightgrey" }}>
              <Left>
                <Text>{feeVoucher.FeeDescription}</Text>
              </Left>
              <Right>
                <Text note>Voucher #</Text>
                <Text key={i} note>
                  {feeVoucher.Voucher_No}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Due Date</Text>
              </Left>
              <Right>
                <Text key={i} note>
                  {feeVoucher.DueDate.slice(0, 10)}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Arrears</Text>
              </Left>
              <Right>
                <Text key={i} note>
                  {feeVoucher.Arrears ? feeVoucher.Arrears : "0.00"}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Current Amount</Text>
              </Left>
              <Right>
                <Text key={i} note>
                  {feeVoucher.VoucherAmount ? feeVoucher.VoucherAmount : null}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Status</Text>
              </Left>
              <Right>
                <Text
                  key={i}
                  style={[
                    feeVoucher.status == "UNPAID" ? styles.red : styles.green,
                  ]}
                  note
                >
                  {feeVoucher.status ? feeVoucher.status : null}
                </Text>
                {/* feeVoucher.status=='UNPAID'? ( <Text>
                  {feeVoucher.status}</Text>): feeVoucher.status ? (
            <Text style={styles.redStatus}>{i.status}</Text>
          ) : null */}
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Scholarship</Text>
              </Left>
              <Right>
                <Text key={i} style={{ color: "green" }} note>
                  {feeVoucher.FeeScholarship ? feeVoucher.FeeScholarship : null}
                </Text>
              </Right>
            </CardItem>
            <CardItem bordered style={{ backgroundColor: "lightgrey" }}>
              <Left>
                <Text>Total Payable</Text>
              </Left>
              <Right>
                <Text key={i} style={{ color: "black" }} note>
                  {Number(
                    feeVoucher.VoucherAmount ? feeVoucher.VoucherAmount : null
                  ) +
                    Number(feeVoucher.Arrears ? feeVoucher.Arrears : null) -
                    Number(
                      feeVoucher.FeeScholarship
                        ? feeVoucher.FeeScholarship
                        : null
                    )}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <View>
                <Text note style={{ fontSize: 10 }}>
                  Fee voucher can be dowloaded from our{" "}
                  <Text
                    onPress={() => {
                      Linking.openURL("http://erp.aster.edu.pk");
                    }}
                    note
                    style={{ fontSize: 10, color: "green" }}
                  >
                    Web Portal.
                  </Text>
                </Text>
              </View>
            </CardItem>
            {/* <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Text>Download fee voucher from web portal</Text>
                  <Icon name="document-text" />
                </Button>
              </Left>
            </CardItem> */}
          </Card>
        );
      });
    }
    return (
      <View style={styles.header}>
        <Text style={styles.emptyMessageStyle}>
          There is no outstanding fee voucher
        </Text>
      </View>
    );
  };
  render() {
    return <Content padder>{this.renderChallanList()}</Content>;
  }
}

const styles = {
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyMessageStyle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "50%",
  },
  red: {
    backgroundColor: "#ff8886",
    padding: 5,
    color: "#fff",
  },
  green: {
    backgroundColor: "#90ee90",
    padding: 5,
    color: "#fff",
  },
};

export default ChallanList;
