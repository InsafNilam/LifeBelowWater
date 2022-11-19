import { useCallback, useEffect, useState } from "react";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Header } from "../components/Header";

import Art from "../assets/images/art.png";
import { Button } from "../components/Button";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Home = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1, padding: 8 }} onLayout={onLayoutRootView}>
      <Header />
      <View style={{ height: 250, width: "100%" }}>
        <Image
          source={Art}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
            alignSelf: "center",
          }}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "InterLight",
            fontSize: 15,
          }}
        >
          Let's Save The Ocean{" "}
          <Text style={{ fontFamily: "InterSemiBold" }}>Conserve The Blue</Text>
        </Text>
        <Text style={{ marginTop: 15, textAlign: "center", fontSize: 15 }}>
          Committed to Caring and Appreciating
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
          }}
        >
          Our Blue Planet
        </Text>
      </View>
      <Button
        width={100}
        fontSize={12}
        text={"Get Started"}
        handlePress={() => navigation.navigate("SignUp")}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "InterRegular" }}>
          Have an Account?{" "}
          <Text
            style={{ fontFamily: "InterBold" }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
