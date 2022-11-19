import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

import { CircularButton } from "../../components/Button";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { OtherHeader } from "../../components/Header";
import Data from "../../components/Data";

import Arrow from "../../assets/images/arrow.png";

const Community = ({ navigation }) => {
  const toast = useToast();
  const [values, setValues] = useState([]);
  useEffect(() => {
    axios
      .get("https://conserveblueapi.herokuapp.com/api/user")
      .then((res) => {
        setValues(res.data);
        toast.show("Successfully Fetched", {
          type: "success",
          placement: "top",
          duration: 1000,
          offset: 30,
          animationType: "slide-in",
        });
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
          Community
        </Text>
      </View>
      <View
        style={{
          height: "70%",
          backgroundColor: "#fff",
          margin: 8,
          borderRadius: 10,
        }}
      >
        <FlatList
          data={values.filter((val) => val.role === "Fisherman")}
          renderItem={({ item }) => (
            <Data icon={"store"} mainText={item.name} subText={item.address} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Community;
