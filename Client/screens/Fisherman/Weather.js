import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import Icon from "react-native-dynamic-vector-icons";
import axios from "axios";

import FocusedStatusBar from "../../components/FocusedStatusBar";
import { CircularButton } from "../../components/Button";

import Arrow from "../../assets/images/arrow.png";
import Banner from "../../assets/images/Fisherman/banner.png";

const Weather = ({ navigation }) => {
  const weatheOptions = {
    headers: {
      "X-RapidAPI-Key": "c42ce7e357mshb39dd4de7c3a1fcp1551e3jsn6d4d9a04908d",
      "X-RapidAPI-Host": "stormglass.p.rapidapi.com",
    },
  };

  const [address, setAddress] = useState();
  const weatherAPI = "1610a7710663db69454a488a00ec5047";
  const [weatherData, setWeatherData] = useState({});
  const [seaData, setSeaData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  async function findCurrentLocationAsync() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);

      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${weatherAPI}`
        )
        .then((res) => setWeatherData(res.data))
        .then((e) => console.log(e));

      await axios
        .get(
          `https://stormglass.p.rapidapi.com/forecast?lng=${location.coords.longitude}&lat=${location.coords.latitude}`,
          weatheOptions
        )
        .then((res) => setSeaData(res.data.hours[0]))
        .catch((e) => console.log(e));

      setAddress(address);
    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        alert("Enable Location Services");
      }
    }
  }
  const getDirection = (windDirection) => {
    if (windDirection > 0 && windDirection < 90) {
      return "NE ";
    } else if (windDirection == 90) {
      return "E ";
    } else if (windDirection > 90 && windDirection < 180) {
      return "SE ";
    } else if (windDirection == 180) {
      return "S ";
    } else if (windDirection > 180 && windDirection < 270) {
      return "SW ";
    } else if (windDirection == 270) {
      return "W ";
    } else if (windDirection > 270 && windDirection < 360) {
      return "NW ";
    } else {
      return "N ";
    }
  };
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
            Weather
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 100,
          padding: 10,
          backgroundColor: "#fff",
          marginTop: 50,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "space-evenly" }}>
          <Text style={{ fontSize: 15 }}>Location</Text>
          <Text style={{ fontSize: 15 }}>Date</Text>
        </View>
        <View style={{ justifyContent: "space-evenly" }}>
          {address && (
            <>
              <Text style={{ fontSize: 15 }}>
                {address[0].city}, {address[0].country}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15 }}>
                  {new Date().getDate() +
                    " / " +
                    (new Date().getMonth() + 1) +
                    " / " +
                    new Date().getFullYear()}
                </Text>
                <Icon
                  type="FontAwesome5"
                  name="compass"
                  onPress={() => navigation.navigate("Compass")}
                />
              </View>
            </>
          )}
        </View>
      </View>
      <View
        style={{
          padding: 10,
          marginTop: 50,
          borderRadius: 10,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ justifyContent: "space-evenly" }}>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Temperature °C
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Wind Speed (meter/sec)
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Wind Gust (meter/sec)
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Wind Direction °
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Forcast</Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Pressure (hPa)
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Humidity %</Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Sunrise</Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Sunset</Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Wave Height (m)
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Wave Direction °
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Visibility (km)
            </Text>
          </View>
          <View style={{ justifyContent: "space-evenly" }}>
            {weatherData.main && seaData.waveDirection && (
              <>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {Math.round(weatherData.main.feels_like - 272.15)}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {weatherData.wind.speed}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {weatherData.wind.gust}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {weatherData.wind.deg + " "}
                  {getDirection(weatherData.wind.deg)}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {weatherData.weather[0].main}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {weatherData.main.pressure}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {weatherData.main.humidity}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {seaData.waveHeight[0].value}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {Math.round(seaData.waveDirection[0].value)}{" "}
                  {getDirection(seaData.waveDirection[0].value)}
                </Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>
                  {seaData.visibility[0].value}
                </Text>
              </>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              marginTop: 5,
              fontSize: 18,
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            Description
          </Text>
          {weatherData.main && (
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              {weatherData.weather[0].description}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Weather;
