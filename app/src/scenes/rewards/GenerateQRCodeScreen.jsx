import React from "react";
import QRCode from "react-native-qrcode-svg";

const GenerateQRCodeScreen = (props) => {
  let base64Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..";
  return (
    <QRCode
      value="Just some string value"
      logo={{ uri: base64Logo }}
      logoSize={30}
      logoBackgroundColor="transparent"
    />
  );
};

export default GenerateQRCodeScreen;
