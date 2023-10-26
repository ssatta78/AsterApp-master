import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Textarea, Button, Spinner } from "native-base";
import * as DocumentPicker from "expo-document-picker";
import config from "../../config/config.json";
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "axios";

const ApplyLeave = (props) => {
  const [studentId, setStudentId] = useState(props.route.params);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [dateFromPickerVisible, setDateFromPickerVisible] = useState(false);
  const [dateToPickerVisible, setDateToPickerVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [leaveDetails, setLeaveDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showFromDatePicker = () => {
    setDateFromPickerVisible(true);
  };

  const hideFromDatePicker = () => {
    setDateFromPickerVisible(false);
  };

  const showToDatePicker = () => {
    setDateToPickerVisible(true);
  };

  const hideToDatePicker = () => {
    setDateToPickerVisible(false);
  };

  const handleFromConfirm = (date) => {
    setSelectedFromDate(date.toDateString()); // You might want to format the date as needed
    hideFromDatePicker();
  };

  const handleToConfirm = (date) => {
    setSelectedToDate(date.toDateString()); // You might want to format the date as needed
    hideToDatePicker();
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: false,
      copyToCacheDirectory: false,
    });
    setSelectedFile(result);
    setSelectedFileName(result.name);
  };

  const applyLeave = async () => {
    setIsLoading(true);
    if (
      selectedFile != null &&
      selectedFromDate != null &&
      selectedToDate != null &&
      leaveDetails != null
    ) {
      const fileToUpload = selectedFile;
      const data = new FormData();
      data.append("file", {
        uri: fileToUpload.uri,
        name: fileToUpload.name,
        type: fileToUpload.type,
      });
      data.append("StudentId", studentId.Student_ID);
      data.append("From", selectedFromDate);
      data.append("To", selectedToDate);
      data.append("Reason", leaveDetails);

      try {
        const response = await axios.post(
          config.baseUrl + `Leaves/ApplyLeaveFromApp`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        showMessage({
          message: "Applied Successfully",
          type: "success",
          icon: "success",
        });

        setIsLoading(false);
        setLeaveDetails(null);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setSelectedFile(null);
        setSelectedFileName(null);
      } catch (error) {
        showMessage({
          message: error.message,
          type: "warning",
          icon: "warning",
        });

        setIsLoading(false);
      }
    } else {
      showMessage({
        message: "All fields are required",
        type: "warning",
        icon: "warning",
      });

      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 0, backgroundColor: "transparent" }}>
      <View style={styleSheet.container}>
        <KeyboardAwareScrollView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styleSheet.dateView}>
            <View style={styleSheet.dateRowView}>
              <Text style={{ color: "grey" }}>
                {selectedFromDate ? selectedFromDate : "Select from date*"}
              </Text>
            </View>
            <TouchableOpacity style={{ flex: 0 }} onPress={showFromDatePicker}>
              <Ionicons name="calendar" color="grey" size={30} />
            </TouchableOpacity>
          </View>

          <View style={styleSheet.dateView}>
            <View style={styleSheet.dateRowView}>
              <Text style={{ color: "grey" }}>
                {selectedToDate ? selectedToDate : "Select till date*"}
              </Text>
            </View>
            <TouchableOpacity style={{ flex: 0 }} onPress={showToDatePicker}>
              <Ionicons name="calendar" color="grey" size={30} />
            </TouchableOpacity>
          </View>

          <View style={styleSheet.mainView}>
            <Textarea
              style={styleSheet.textArea}
              rowSpan={5}
              onChangeText={(detail) => setLeaveDetails(detail)}
              value={leaveDetails}
              maxLength={240}
              bordered
              placeholder="Leave details here.."
              placeholderTextColor="lightgrey"
            />
            <Button
              style={{ marginTop: 10 }}
              block
              info
              onPress={pickDocument}
            >
              <Ionicons name="attach" size={25} color="grey" />
              <Text style={{ marginRight: 10, color: "grey" }}>
                {selectedFileName ? selectedFileName : "Choose File"}
              </Text>
            </Button>

            {isLoading ? (
              <Button style={{ marginTop: 10 }} block warning disabled>
                <Spinner size={24} color="white" />
              </Button>
            ) : (
              <Button style={{ marginTop: 10 }} block warning onPress={applyLeave}>
                <View style={styleSheet.buttonInnerView}>
                  <Text style={styleSheet.buttonText}>Submit</Text>
                  <Ionicons name="send" size={20} color="white" />
                </View>
              </Button>
            )}

            <DateTimePickerModal
              date={new Date()}
              isVisible={dateFromPickerVisible}
              mode="date"
              onConfirm={handleFromConfirm}
              onCancel={hideFromDatePicker}
              minimumDate={new Date()}
            />
            <DateTimePickerModal
              date={new Date()}
              isVisible={dateToPickerVisible}
              mode="date"
              onConfirm={handleToConfirm}
              onCancel={hideToDatePicker}
              minimumDate={new Date()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
      <FlashMessage
        position="center"
        animated={true}
        autoHide={true}
        floating={true}
        duration={3200}
      />
    </ScrollView>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 10,
  },
  dateView: {
    flexDirection: "row",
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "lightgrey",
    backgroundColor: "white",
  },
  dateRowView: {
    flex: 1,
    borderWidth: 0,
    borderColor: "white",
    borderRadius: 3,
    padding: 10,
    marginRight: 10,
  },
  mainView: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    width: "100%",
    borderColor: "lightgrey",
    borderRadius: 5,
    backgroundColor: "white",
    padding: 5,
  },
  buttonInnerView: {
    display: "flex",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    marginRight: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ApplyLeave;
