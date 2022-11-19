import { View, Text, SafeAreaView, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { CircularButton } from "../../components/Button";
import { OtherHeader } from "../../components/Header";
import FocusedStatusBar from "../../components/FocusedStatusBar";

import Arrow from "../../assets/images/arrow.png";

const Map = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const googleAPI = "AIzaSyAPuOYoM8S7x3bdZ0DWfz_CC99_8_Y2SNM";
  const [mapRegion, setMapRegion] = useState({
    latitude: 6.937585,
    longitude: 79.8653137,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  async function findCurrentLocationAsync() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
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
            top: -40,
            right: 0,
            left: 0,
            color: "#000",
          }}
        >
          Map
        </Text>

        <MapView
          region={mapRegion}
          style={{
            position: "absolute",
            top: -45,
            zIndex: -2,
            width: Dimensions.get("window").width,
            height: "110%",
          }}
        >
          <Marker coordinate={mapRegion} title="Marker" />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default Map;
