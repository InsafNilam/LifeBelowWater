import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

import { CircularButton } from "../../components/Button";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { OtherHeader } from "../../components/Header";
import Data from "../../components/Data";

import Arrow from "../../assets/images/arrow.png";

const Emergency = ({ navigation }) => {
  const toast = useToast();
  const [values, setValues] = useState([]);
  useEffect(() => {
    axios
      .get("https://conserveblueapi.herokuapp.com/api/emergency/getEmergency")
      .then((res) => {
        toast.show("Fetch Successful", {
          type: "success",
          placement: "top",
          duration: 1000,
          offset: 30,
          animationType: "slide-in",
        });
        setValues(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F8FF" }}>
      <FocusedStatusBar backgroundColor={"#13236b"} />
      <OtherHeader />
      <CircularButton
        backgroundColor={"#13236b"}
        size={40}
        imgSize={50}
        imgUrl={Arrow}
        top={5}
        left={8}
        handlePress={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "InterRegular",
            fontSize: 24,
            position: "absolute",
            top: -25,
            right: 0,
            left: 0,
            color: "#FCCB06",
          }}
        >
          Emergency
        </Text>
        <View
          style={{
            margin: 12,
            marginBottom: 0,
            flex: 1,
          }}
        >
          <FlatList
            data={values}
            renderItem={({ item }) => (
              <Data
                icon={"exclamation-triangle"}
                mainText={item.name}
                subText={item.phone}
              />
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Emergency;
