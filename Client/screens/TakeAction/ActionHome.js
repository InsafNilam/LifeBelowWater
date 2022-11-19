import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

import FocusedStatusBar from "../../components/FocusedStatusBar";
import { Header } from "../../components/Header";
import { CircularButton, Button } from "../../components/Button";

import Arrow from "../../assets/images/arrow.png";

import { useNavigation } from "@react-navigation/native";

import OrganizeProject from "../../assets/images/TakeAction/OrganizeProjects.png";
import VolunteerApply from "../../assets/images/TakeAction/VolunteerApply.png";
import Equipment from "../../assets/images/TakeAction/Equipment.png";
import Volunteers from "../../assets/images/TakeAction/Volunteers.png";
import Courses from "../../assets/images/TakeAction/Courses.png";
import Experience from "../../assets/images/TakeAction/Experience.png";

const DATA = [
  {
    id: "D001",
    title: "Organize Project",
    image: OrganizeProject,
    routeName: "OrganizeProject",
    
  },
  {
    id: "D002",
    title: "Volunteer Apply",
    image: VolunteerApply,
    routeName: "Projects",
  },
  {
    id: "D003",
    title: "Request Equipment",
    image: Equipment,
    routeName: "Equipment",
  },
  {
    id: "D004",
    title: "Volunteers",
    image: Volunteers,
    routeName: "Volunteers",
  },
  {
    id: "D005",
    title: "Dive Courses",
    image: Courses,
    routeName: "Courses",
  },
  {
    id: "D006",
    title: "Sharing Experience",
    image: Experience,
    routeName: "Experience",
  },
];

const ActionHome = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#A2BCFE" }}>
      <FocusedStatusBar />
      <Header />
      <CircularButton
        backgroundColor={"#A2BCFE"}
        size={40}
        imgSize={50}
        imgUrl={Arrow}
        top={5}
        left={8}
        handlePress={() => navigation.goBack()}
      />
      <View
        style={{
          height: 200,
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "InterSemiBold", fontSize: 36 }}>
          Take Action
        </Text>
        <Text style={{ fontFamily: "InterRegular", fontSize: 24 }}>
          Select Option
        </Text>
      </View>
      <View
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          alignContent: "center",
          justifyContent: "center",
          paddingTop: 24,
          paddingBottom: 12,
          flex: 1,
          backgroundColor: "#fff",
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

export default ActionHome;
