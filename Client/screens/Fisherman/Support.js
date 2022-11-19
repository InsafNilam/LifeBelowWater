import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { CircularButton } from "../../components/Button";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { OtherHeader } from "../../components/Header";

import Todo from "./Todo";
import Contact from "./Contact";

import Arrow from "../../assets/images/arrow.png";

const Tab = createMaterialTopTabNavigator();

const Support = ({ navigation }) => {
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
          Support
        </Text>
      </View>
      <View
        style={{
          height: "70%",
          backgroundColor: "#F0F8FF",
          margin: 8,
          borderRadius: 10,
        }}
      >
        <Tab.Navigator
          initialRouteName="Todo"
          screenOptions={{
            tabBarActiveTintColor: "#e91e63",
            tabBarLabelStyle: { fontSize: 12 },
            tabBarIndicatorStyle: {
              width: "40%",
              marginLeft: 20,
            },
            tabBarStyle: {
              backgroundColor: "powderblue",
              borderRadius: 25,
            },
          }}
        >
          <Tab.Screen
            name="Todo"
            component={Todo}
            options={{ tabBarLabel: "TODO" }}
          />
          <Tab.Screen
            name="Contact"
            component={Contact}
            options={{ tabBarLabel: "Contact" }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Support;
