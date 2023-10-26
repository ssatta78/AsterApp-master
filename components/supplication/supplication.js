import React, { Component } from "react";
import { Container } from "native-base";
import PDFReader from "rn-pdf-reader-js";
import axios from "axios";
import config from "./../../config/config.json";

export default class Supplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // GET request using axios with error handling
    axios
      .get(config.baseUrl + "Extras/MasnoonDuaain")
      .then((response) => {
        this.setState({ data: response.data.Data.Path });
        // console.log(response.data.Data.Path);
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  }
  render() {
    // console.log(this.state.data);
    const pdfUrl = config.url + `${this.state.data}`;
    console.log(pdfUrl);
    return (
      <Container>
        <PDFReader
          source={{
            uri: pdfUrl,
          }}
          webviewProps={{
            startInLoadingState: true,
          }}
          style={{ height: 500, width: "100%" }}
        />
      </Container>
    );
  }
}
