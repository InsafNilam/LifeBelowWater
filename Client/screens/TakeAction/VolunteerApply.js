import { View, Text, SafeAreaView, TextInput,TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Header } from "../../components/Header";
import { CircularButton,Button } from "../../components/Button";
import { OtherHeader } from "../../components/Header";
import FocusedStatusBar from "../../components/FocusedStatusBar";

import Arrow from "../../assets/images/arrow.png";

const VolunteerApply = ({ navigation }) =>  {
  const toast = useToast();
  const [values, setValues] = useState({
    fullName: "",
    projectName:"",
    dob:"",
    phone:"",
    address:"",
    email:"",
    description: "",
  });

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    if (
      values.fullName !== "" &&
      values.projectName !== "" &&
      values.dob !== "" &&
      values.phone !== "" &&
      values.address !== "" &&
      values.email !== "" &&
      values.description !== ""
    ) {
      await axios
        .post("https://conserveblueapi.herokuapp.com/api/volunteer/addVolunteer",values)
        .then((res) => {
          toast.show("Voulunteer Apply Successful", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
          setValues({fullName:"",
          projectName:"",
          dob:"",
          phone:"",
          address:"",
          email:"",
          description:"",});

          setTimeout(() => {
            navigation.navigate("ActionHome");
          }, 500);
        })
        .catch((e) => {
          console.log("Error:", e.message);
          toast.show("Fill All The Fields", {
            type: "danger",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        });
    } else {
      toast.show("Voulunteer Apply Failed", {
        type: "warning",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#A2BCFE"}}>
      <FocusedStatusBar />
      <Header />
      <CircularButton
        backgroundColor={"#A2BCFE"}
        size={40}
        imgSize={50}
        imgUrl={Arrow}
        top={5}
        left={8}
        handlePress={() => navigation.navigate("ActionHome")}
      />
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
        <View style={{marginBottom: 12, }}>
        <Text>Full Name</Text>
        <TextInput
          value={values.fullName}
          onChangeText={(text) => handleChange("fullName", text)}
          placeholder="Full Name of the Project Organizer"
          style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            padding: 10,
            paddingLeft: 20,
            borderWidth: 0.5,
            borderRadius: 10,
            
          }}
        />
      </View>
      <View style={{  marginBottom: 12}}>
        <Text>Project Name</Text>
        <TextInput
          value={values.projectName}
          onChangeText={(text) => handleChange("projectName", text)}
          placeholder="Name of the Project"
          style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            padding: 10,
            paddingLeft: 20,
            borderWidth: 0.5,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Date of Birth</Text>
        <TextInput
          value={values.dob}
          onChangeText={(text) => handleChange("dob", text)}
          placeholder="02-02-1999"
          style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            padding: 10,
            paddingLeft: 20,
            borderWidth: 0.5,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Phone Number</Text>
        <TextInput
          value={values.phone}
          onChangeText={(text) => handleChange("phone", text)}
          placeholder="0769979232"
          style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            padding: 10,
            paddingLeft: 20,
            borderWidth: 0.5,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Address</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={values.address}
          onChangeText={(text) => handleChange("address", text)}
          placeholder="Tupe Your Residential Address"
          style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            padding: 10,
            paddingLeft: 20,
            borderWidth: 0.5,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>Email</Text>
        <TextInput
          value={values.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="conservertheblue@gmail.com"
          style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            padding: 10,
            paddingLeft: 20,
            borderWidth: 0.5,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Text>About Me</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={values.description}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Describe Yourself in Relation to Volunteering (Eg: Your Skills, Strengths)"
          style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            padding: 10,
            paddingLeft: 20,
            borderWidth: 0.5,
            borderRadius: 10,
          }}
        />
      </View>
      <Button
        fontSize={12}
        handlePress={handleSubmit}
        text={"Submit"}
        width={120}
        backgroundColor={"#74B72D"}
      />
        
        
      </View>
    </SafeAreaView>
  );
};

export default VolunteerApply;
