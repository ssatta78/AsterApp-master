import React, { Component } from "react";
import { Container } from "native-base";
import PDFReader from "rn-pdf-reader-js";

export default class PdfView extends Component {
  render() {
    const pdfUrl = `http://194.233.80.159:75/${this.props.route.params}`;
    return (
      <Container>
        <PDFReader
          source={{
            uri: pdfUrl,
          }}
        />
      </Container>
    );
  }
}
