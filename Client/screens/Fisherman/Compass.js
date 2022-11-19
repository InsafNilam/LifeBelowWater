import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import FocusedStatusBar from "../../components/FocusedStatusBar";
import { CircularButton } from "../../components/Button";

import CompassWheel from "../../assets/images/Fisherman/compassWheel.png";
import BackImg from "../../assets/images/Fisherman/background.png";
import Arrow from "../../assets/images/arrow.png";
import Banner from "../../assets/images/Fisherman/banner.png";

const Weather = ({ navigation }) => {
  const [compassHeading, setCompassHeading] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  async function findCurrentLocationAsync() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      await Location.watchHeadingAsync((obj) =>
        setCompassHeading(Math.floor(obj.magHeading))
      );
    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        alert("Enable Location Services");
      }
    }
  }
  useEffect(() => {
    findCurrentLocationAsync();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 8, backgroundColor: "#806354" }}>
      <FocusedStatusBar backgroundColor={"#806354"} />
      <Image
        source={Banner}
        resizeMode="contain"
        style={{
          width: "100%",
          zIndex: -1,
          position: "absolute",
          top: -40,
          right: 0,
          marginRight: 8,
        }}
      />
      <Image
        source={BackImg}
        resizeMode="contain"
        style={{
          width: "100%",
          zIndex: -1,
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      <View>
        <CircularButton
          size={40}
          imgSize={40}
          imgUrl={Arrow}
          backgroundColor={"transparent"}
          handlePress={() => navigation.goBack()}
        />
        <View
          style={{
            height: 40,
            position: "absolute",
            top: -8,
            left: 50,
            right: 0,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "InterMedium",
              fontSize: 24,
            }}
          >
            Compass
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          padding: 12,
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
            alignSelf: "center",
            transform: [{ rotate: `${360 - compassHeading}deg` }],
          }}
          resizeMode="contain"
          source={CompassWheel}
        />
        <View
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: 10,
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {(() => {
              if (compassHeading > 0 && compassHeading < 90) {
                return "NE ";
              } else if (compassHeading == 90) {
                return "E ";
              } else if (compassHeading > 90 && compassHeading < 180) {
                return "SE ";
              } else if (compassHeading == 180) {
                return "S ";
              } else if (compassHeading > 180 && compassHeading < 270) {
                return "SW ";
              } else if (compassHeading == 270) {
                return "W ";
              } else if (compassHeading > 270 && compassHeading < 360) {
                return "NW ";
              } else {
                return "N ";
              }
            })()}
            {compassHeading + "°"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Weather;
