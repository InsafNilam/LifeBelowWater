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

import Add from "../assets/images/Document/add.png";
import Edit from "../assets/images/Document/read.png";

import User from "../assets/images/user.png";

const DATA = [
  {
    id: "S001",
    title: "Add Document",
    image: Add,
    routeName: "addDocument",
  },
  {
    id: "S002",
    title: "Edit Document",
    image: Edit,
    routeName: "editDocument",
  },
 
];

const DocumentationUI = ({ navigation }) => {
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
          paddingTop: 50,
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
                style={{ height: "90%", width: "90%" }}
              />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          numColumns={1}
          horizontal={false}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default DocumentationUI;
