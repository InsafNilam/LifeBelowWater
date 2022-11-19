import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-dynamic-vector-icons";
import { useToast } from "react-native-toast-notifications";
import SelectList from "react-native-dropdown-select-list";
import axios from "axios";

import { CircularButton, Button } from "../components/Button";
import FocusedStatusBar from "../components/FocusedStatusBar";

import Arrow from "../assets/images/arrow.png";
import Background from "../assets/images/background.png";
import { ScrollView } from "react-native-gesture-handler";

const SignUp = ({ navigation }) => {
  const toast = useToast();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    address: "",
    gender: "",
    role: "",
  });

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  let genderData = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Other" },
  ];
  let roleData = [
    { key: "1", value: "Fisherman" },
    { key: "2", value: "Student" },
    { key: "3", value: "Other" },
  ];

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    if (
      values.email !== "" &&
      values.password !== "" &&
      values.address !== "" &&
      values.phone !== "" &&
      values.age != "" &&
      values.gender != "" &&
      values.name !== "" &&
      values.role != ""
    ) {
      await axios
        .post("https://conserveblueapi.herokuapp.com/api/user/", values)
        .then((res) => {
          toast.show("Login Successful", {
            type: "success",
            placement: "top",
            duration: 500,
            offset: 30,
            animationType: "slide-in",
          });
          setValues({
            email: "",
            password: "",
            address: "",
            phone: "",
            age: "",
            gender: "",
            name: "",
            role: "",
          });

          setTimeout(() => {
            navigation.navigate("SignIn");
          }, 500);
        })
        .catch((e) => {
          console.log("Error:", e.message);
          toast.show("Sign Up Failed", {
            type: "danger",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        });
    } else {
      toast.show("Please fill out the form", {
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
          Create
        </Text>
        <Text
          style={{ color: "#fff", fontSize: 24, fontFamily: "InterRegular" }}
        >
          Account
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginTop: 180,
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
              top: 24.5,
              left: 20,
              paddingRight: 6,
              borderRightWidth: 1,
            }}
          />
          <TextInput
            value={values.name}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Enter Name"
            style={{
              height: 45,
              margin: 12,
              padding: 10,
              paddingLeft: 40,
              borderWidth: 1,
              borderRadius: 22.5,
            }}
          />
        </View>
        <View>
          <Icon
            name="envelope"
            type="FontAwesome5"
            size={20}
            color="black"
            style={{
              position: "absolute",
              top: 24.5,
              left: 20,
              paddingRight: 6,
              borderRightWidth: 1,
            }}
          />
          <TextInput
            value={values.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter Email"
            style={{
              height: 45,
              margin: 12,
              padding: 10,
              paddingLeft: 40,
              borderWidth: 1,
              borderRadius: 22.5,
            }}
          />
        </View>
        <View>
          <Icon
            name="user"
            type="AntDesign"
            size={20}
            color="black"
            style={{
              position: "absolute",
              top: 24.5,
              left: 20,
              paddingRight: 6,
              borderRightWidth: 1,
            }}
          />
          <TextInput
            value={values.age}
            keyboardType="number-pad"
            maxLength={3}
            onChangeText={(text) => handleChange("age", text)}
            placeholder="Enter Age"
            style={{
              height: 45,
              margin: 12,
              padding: 10,
              paddingLeft: 40,
              borderWidth: 1,
              borderRadius: 22.5,
            }}
          />
        </View>
        <View>
          <Icon
            name="user"
            type="AntDesign"
            size={20}
            color="black"
            style={{
              position: "absolute",
              top: 24.5,
              left: 20,
              paddingRight: 6,
              borderRightWidth: 1,
            }}
          />
          <TextInput
            value={values.phone}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder="Enter Contact Number"
            style={{
              height: 45,
              margin: 12,
              padding: 10,
              paddingLeft: 40,
              borderWidth: 1,
              borderRadius: 22.5,
            }}
          />
        </View>
        <View>
          <Icon
            name="user"
            type="AntDesign"
            size={20}
            color="black"
            style={{
              position: "absolute",
              top: 24.5,
              left: 20,
              paddingRight: 6,
              borderRightWidth: 1,
            }}
          />
          <TextInput
            value={values.address}
            onChangeText={(text) => handleChange("address", text)}
            placeholder="Enter Address"
            style={{
              height: 45,
              margin: 12,
              padding: 10,
              paddingLeft: 40,
              borderWidth: 1,
              borderRadius: 22.5,
            }}
          />
        </View>
        <View>
          <Icon
            name="restroom"
            type="FontAwesome5"
            size={20}
            color="black"
            style={{
              position: "absolute",
              top: 22.5,
              left: 20,
              paddingRight: 2,
              borderRightWidth: 1,
            }}
          />
          <SelectList
            placeholder="Select Gender"
            setSelected={setSelectedGender}
            data={genderData}
            boxStyles={{
              height: 45,
              margin: 12,
              paddingLeft: 40,
              borderWidth: 1,
              borderRadius: 22.5,
            }}
            onSelect={() =>
              handleChange("gender", genderData[selectedGender - 1].value)
            }
          />
        </View>
        <View>
          <Icon
            name="user-tag"
            type="FontAwesome5"
            size={20}
            color="black"
            style={{
              position: "absolute",
              top: 22.5,
              left: 20,
              paddingRight: 2,
              borderRightWidth: 1,
            }}
          />
          <SelectList
            placeholder="Select Role"
            setSelected={setSelectedRole}
            data={roleData}
            boxStyles={{
              height: 45,
              margin: 12,
              paddingLeft: 40,
              borderWidth: 1,
              borderRadius: 22.5,
            }}
            onSelect={() =>
              handleChange("role", roleData[selectedRole - 1].value)
            }
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
              top: 24.5,
              left: 20,
              paddingRight: 6,
              borderRightWidth: 1,
            }}
          />
          <TextInput
            value={values.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={true}
            placeholder="Enter Password"
            style={{
              height: 45,
              margin: 12,
              padding: 10,
              paddingLeft: 40,
              borderWidth: 1,
              borderRadius: 22.5,
            }}
          />
        </View>
        <Button
          marginBottom={5}
          fontSize={15}
          text={"Register"}
          backgroundColor={"#74B72D"}
          width={Dimensions.get("window").width - 80}
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
          text={"Log In"}
          marginBottom={12}
          width={Dimensions.get("window").width - 80}
          backgroundColor={"#13236b"}
          handlePress={() => navigation.navigate("SignIn")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
