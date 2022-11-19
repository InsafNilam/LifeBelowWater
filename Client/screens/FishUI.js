import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

import FocusedStatusBar from "../components/FocusedStatusBar";
import { CircularButton } from "../components/Button";
import { Header } from "../components/Header";

import Community from "../assets/images/Fisherman/community.png";
import Journal from "../assets/images/Fisherman/journal.png";
import FishStall from "../assets/images/Fisherman/stall.png";
import WeatherInfo from "../assets/images/Fisherman/weather.png";
import Emergency from "../assets/images/Fisherman/emergency.png";
import Support from "../assets/images/Fisherman/support.png";

import User from "../assets/images/user.png";

const DATA = [
  {
    id: "F001",
    title: "Weather",
    image: WeatherInfo,
    routeName: "Weather",
  },
  {
    id: "F002",
    title: "Stalls",
    image: FishStall,
    routeName: "Stall",
  },
  {
    id: "F003",
    title: "Community",
    image: Community,
    routeName: "Community",
  },
  {
    id: "F004",
    title: "Daily Journal",
    image: Journal,
    routeName: "Journal",
  },
  {
    id: "F005",
    title: "Emergency",
    image: Emergency,
    routeName: "Emergency",
  },
  {
    id: "F006",
    title: "Support",
    image: Support,
    routeName: "Support",
  },
];

const FishUI = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#A2BCFE" }}>
      <FocusedStatusBar />
      <Header />
      <CircularButton
        size={40}
        imgSize={30}
        right={8}
        top={8}
        imgUrl={User}
        handlePress={() => navigation.navigate("Profile")}
      />
      <View
        style={{
          marginTop: 20,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          flex: 1,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#fff",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: "45%",
                height: 160,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                margin: 2,
              }}
              onPress={() => navigation.navigate(item.routeName)}
            >
              <Image
                source={item.image}
                resizeMode="contain"
                style={{ height: "75%", width: "90%" }}
              />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default FishUI;
