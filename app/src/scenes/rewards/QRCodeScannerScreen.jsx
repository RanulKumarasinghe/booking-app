import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector } from "react-redux";
import { db, FieldValue } from "src/utils/firebase";
import { useIsFocused } from "@react-navigation/native";

const QRCodeScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //Redux to get user
  const auth = useSelector((state) => state.auth);
  //Current users uid taken from the redux state
  const uid = auth.uid;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    fetchPoints();
  }, [isFocused]);

  //db connections
  const rewards = db.collection("rewards");
  const user = db.collection("users");

  //Function loads user points on load
  function fetchPoints() {
    user
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          userPoints = doc.data().points ? doc.data().points : 0;
          setPointsFromUser(userPoints);
        });
      });
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    rewards
      .where("code", "==", data)
      .where("codeUsed", "==", false)
      .get()
      .then((querySnapshot) => {
        const rewardsDocs = querySnapshot.docs;
        if (rewardsDocs.length > 0) {
          rewardsDocs.forEach((doc, index) => {
            //(If a record is returned) the index start at 0
            if (index == 0) {
              rewards
                .doc(doc.id)
                .update({
                  codeUsed: true,
                  customerId: uid,
                })
                .then(() => {
                  console.log(doc.data().points);
                  return user.doc(uid).update({
                    points: FieldValue.increment(doc.data().points),
                  });
                })
                .then(() => fetchPoints())
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            } else {
              console.log("Code not found");
            }
          });
        }
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  barCodeView: {
    width: "100%",
    height: "50%",
    marginBottom: 40,
  },
});

export default QRCodeScannerScreen;
