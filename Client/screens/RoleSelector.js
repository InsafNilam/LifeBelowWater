import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Header } from "../components/Header";

import FishUtilities from "../assets/images/utilities.png";
import Donation from "../assets/images/donation.png";
import TakeAction from "../assets/images/action.png";
import Documentation from "../assets/images/documentation.png";
import { useEffect, useState } from "react";

const DATA = [
  {
    id: "R001",
    title: "Fish Utilities",
    image: FishUtilities,
    routeName: "FishHome",
  },
  {
    id: "R002",
    title: "Take Action",
    image: TakeAction,
    routeName: "ActionHome",
  },
  {
    id: "R003",
    title: "Documentation",
    image: Documentation,
    routeName: "DocumentHome",
  },
  {
    id: "R004",
    title: "Donations",
    image: Donation,
    routeName: "DonationHome",
  },
];

const RoleSelector = ({ navigation }) => {
  const [text, setText] = useState("");
  const hasUnsavedChanges = Boolean(true);
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          "Discard changes?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#A2BCFE" }}>
      <Header />
      <View
        style={{
          height: 200,
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "InterSemiBold", fontSize: 36 }}>
          Welcome User
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

export default RoleSelector;
