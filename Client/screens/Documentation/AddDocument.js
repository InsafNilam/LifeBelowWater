import { View, Text, SafeAreaView, TextInput ,Input} from "react-native";
import React, { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { RadioButton } from 'react-native-paper';

import { CircularButton, Button } from "../../components/Button";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { OtherHeader } from "../../components/Header";

import Arrow from "../../assets/images/arrow.png";

const AddDocument = ({ navigation }) => {

  const toast = useToast();
  const [values, setValues] = useState({
    resourceId: "",
    resourceTitle:"",
    resourceSubject:"",
    resourceLanguage:"",
    resourceLink:"",
  });

  const [selectedLanguage, setSelectedLanguage] = useState("");

  let LanguageData = [
    { key: "1", value: "English" },
    { key: "2", value: "Sinhala" },
    { key: "3", value: "Tamil" },
  ];

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      values.resourceId !== "" &&
      values.resourceTitle !== "" &&
      values.resourceSubject !== "" &&
      values.resourceLanguage !== "" &&
      values.resourceLink !== "" 
    ) {
      await axios
        .post("https://conserveblueapi.herokuapp.com/api/project/addProject",values)
        .then((res) => {
          toast.show("Project Details Added Successfully", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
          setValues({fullName:"",
          projectName:"",
          category:"",
          phone:"",
          email:"",
          description:"",});

          setTimeout(() => {
            navigation.navigate("Projects");
          }, 500);
        })
        .catch((e) => {
          console.log("Error:", e.message);
          toast.show("Details Adding Failed", {
            type: "danger",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        });
    } else {
      toast.show("Project Details Adding Failed", {
        type: "warning",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };
  
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
            top:30,
            right: 0,
            left: 0,
            color: "#FCCB06",
          }}
        >
          ADD RESOURCES
        </Text>
      </View>
      
      <View
        style={{
          height: "70%",
          backgroundColor: "#fff",
          margin: 8,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            height: 100,
            padding: 10,
            backgroundColor: "#fff",
            marginTop: 10,
            marginBottom: -95,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
        </View>
        
       
          <>
            <View style={{ marginBottom: 10 }}>
              <Text>Title</Text>
              <TextInput
                value={values.title}
                onChangeText={(text) => handleChange("title", text)}
                placeholder="Please Provide title"
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
            <View style={{ marginBottom: 8 }}>
              <Text>Subject</Text>
              <TextInput
                value={values.subject}
                onChangeText={(text) => handleChange("subject", text)}
                placeholder="Please Provide subject"
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
            <Text>Language</Text>
            <View style={{ marginBottom: 12 }}>
        <Text>Project Category</Text>
        <SelectList
            placeholder="Select Project Category"
            setSelected={setSelectedCategory}
            data={categoryData}
            style={{
              textAlign: "justify",
            justifyContent: "flex-start",
            padding: 10,
            paddingLeft: 20,
            borderWidth: 0.5,
            borderRadius: 10,
            }}
            onSelect={() =>
              handleChange("category", categoryData[selectedCategory - 1].value)
            }
          />
      </View>

            <View style={{ marginBottom: 8 }}>
              <Text>Upload</Text>
              <TextInput
              type={File}
                value={values.Upload}
                onChangeText={(text) => handleChange("Upload", text)}
                placeholder="Please Provide Upload"
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
            //   handlePress={handleChange}
              text={"ADD"}
              width={120}
            />
          </>
        
      </View>
    </SafeAreaView>
  );
};

export default AddDocument;
