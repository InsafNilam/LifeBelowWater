import { View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useToast } from "react-native-toast-notifications";
import axios from "axios";

import { Button } from "../../components/Button";

const Contact = () => {
  const [userID, setUserID] = useState("");
  const toast = useToast();
  const [values, setValues] = useState({
    name: "",
    subject: "",
    description: "",
    userId: "",
  });

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    values.userId = userID;
    if (
      values.name !== "" &&
      values.subject !== "" &&
      values.description !== 0 &&
      userID !== ""
    ) {
      axios
        .post(
          "https://conserveblueapi.herokuapp.com/api/feedback/addFeedback",
          values
        )
        .then((res) => {
          setValues({ name: "", subject: "", description: "", userId: "" });
          toast.show("Message Send Successful", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        })
        .catch((e) => console.log(e));
    } else {
      toast.show("Message Send Failed", {
        type: "warning",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("userID").then((val) => {
      setUserID(val);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, margin: 8 }}>
      <View style={{ marginBottom: 12 }}>
        <Text>Name</Text>
        <TextInput
          value={values.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder="Please Provide Name"
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
        <Text>Subject</Text>
        <TextInput
          value={values.subject}
          onChangeText={(text) => handleChange("subject", text)}
          placeholder="Please Provide Subject"
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
        <Text>Message</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={values.description}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Please Provide Description"
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
    </SafeAreaView>
  );
};

export default Contact;
