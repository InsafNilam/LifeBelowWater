import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-dynamic-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";

import { CircularButton, Button } from "../components/Button";
import FocusedStatusBar from "../components/FocusedStatusBar";

import Arrow from "../assets/images/arrow.png";
import Background from "../assets/images/background.png";

const SignIn = ({ navigation }) => {
  const toast = useToast();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    if (values.email !== "" && values.password !== "") {
      await axios
        .post("https://conserveblueapi.herokuapp.com/api/user/login", values)
        .then(async (res) => {
          let userToken = res.data.token;
          let userID = res.data._id;
          let userName = res.data.name;
          let userRole = res.data.role;
          let userEmail = res.data.email;
          let userPhone = res.data.phone;
          let userDate = res.data.date.split("T")[0];

          if (userToken !== null) {
            await AsyncStorage.setItem("userID", userID);
            await AsyncStorage.setItem("userName", userName);
            await AsyncStorage.setItem("userRole", userRole);
            await AsyncStorage.setItem("userEmail", userEmail);
            await AsyncStorage.setItem("userPhone", userPhone);
            await AsyncStorage.setItem("userDate", userDate);

            toast.show("Login Successful", {
              type: "success",
              placement: "top",
              duration: 500,
              offset: 30,
              animationType: "slide-in",
            });
            setValues({ name: "", password: "" });

            setTimeout(() => {
              navigation.navigate("RoleSelector");
            }, 500);
          }
        })
        .catch((e) => {
          console.log("Error:", e.message);
          toast.show("Invalid credentials", {
            type: "danger",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        });
    } else {
      toast.show("Enter username and password", {
        type: "warning",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FocusedStatusBar backgroundColor={"#13236b"} />
      <CircularButton
        size={40}
        imgSize={40}
        imgUrl={Arrow}
        top={8}
        left={8}
        handlePress={() => navigation.goBack()}
      />
      <Image
        source={Background}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 180,
          width: "100%",
        }}
      />
      <View
        style={{
          height: 40,
          position: "absolute",
          top: 60,
          left: 20,
        }}
      >
        <Text
          style={{ color: "#fff", fontSize: 24, fontFamily: "InterRegular" }}
        >
          Welcome
        </Text>
        <Text
          style={{ color: "#fff", fontSize: 24, fontFamily: "InterRegular" }}
        >
          Back
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 300,
          left: 8,
          right: 8,
        }}
      >
        <View>
          <Icon
            name="user"
            type="AntDesign"
            size={20}
            color="black"
            style={{
              position: "absolute",
              top: 22,
              left: 20,
              borderRightWidth: 1,
            }}
          />
          <TextInput
            value={values.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter Email"
            style={{
              height: 40,
              margin: 12,
              padding: 10,
              paddingLeft: 35,
              borderWidth: 1,
              borderRadius: 20,
            }}
          />
        </View>
        <View>
          <Icon
            name="lock"
            type="AntDesign"
            size={20}
            color="black"
            style={{
              position: "absolute",
              top: 22,
              left: 20,
              borderRightWidth: 1,
            }}
          />
          <TextInput
            value={values.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={true}
            placeholder="Enter Password"
            style={{
              height: 40,
              margin: 12,
              padding: 10,
              paddingLeft: 35,
              borderWidth: 1,
              borderRadius: 20,
            }}
          />
        </View>
        <Button
          fontSize={15}
          marginBottom={5}
          text={"Log In"}
          width={Dimensions.get("window").width - 80}
          backgroundColor={"#74B72D"}
          handlePress={handleSubmit}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: "InterRegular",
          }}
        >
          -------------- or --------------
        </Text>
        <Button
          fontSize={15}
          backgroundColor={"#13236b"}
          text={"Sign Up"}
          width={Dimensions.get("window").width - 80}
          handlePress={() => navigation.navigate("SignUp")}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
