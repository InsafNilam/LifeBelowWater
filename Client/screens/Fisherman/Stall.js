import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-dynamic-vector-icons";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";

import { CircularButton } from "../../components/Button";
import { OtherHeader } from "../../components/Header";
import FocusedStatusBar from "../../components/FocusedStatusBar";

import Arrow from "../../assets/images/arrow.png";
import Data from "../../components/Data";

const Stall = ({ navigation }) => {
  const toast = useToast();
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get("https://conserveblueapi.herokuapp.com/api/stall/getStall")
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
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Icon
            type="FontAwesome5"
            name="map"
            color="black"
            size={24}
            style={{
              position: "absolute",
              right: 5,
              top: -30,
              padding: 5,
              borderRadius: 20,
              backgroundColor: "gray",
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "InterRegular",
            fontSize: 24,
            color: "#FCCB06",
            marginBottom: 20,
          }}
        >
          Stall List
        </Text>
        <View
          style={{
            margin: 8,
            marginBottom: 0,
            flex: 1,
          }}
        >
          <FlatList
            data={values}
            renderItem={({ item }) => (
              <Data
                icon={"store"}
                mainText={item.name}
                subText={item.address}
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

export default Stall;
