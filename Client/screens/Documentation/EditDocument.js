import { View, Text, SafeAreaView, TextInput } from "react-native";
import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from "react";
import axios from "axios";

import { CircularButton, Button } from "../../components/Button";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { OtherHeader } from "../../components/Header";

import Arrow from "../../assets/images/arrow.png";

const EditDocument = ({ navigation }) => {

    const [values, setValues] = useState({});
    


  useEffect(() => {}, []);
  
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
          EDIT OR DELETE RESOURCES
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

          <SearchBar
          platform="ios"
        placeholder="Type Here..."
        onChangeText={(text) => handleChange("search", text)}
        value={values.search}
      />
      

            <View style={{ marginBottom: 10 }}>
              <Text>Title</Text>
              <TextInput
                value={values.title}
                onChangeText={(text) => handleChange("title", text)}
                placeholder="title"
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
                placeholder="subject"
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
              text={"Update"}
              width={120}
            />
            <Button
              fontSize={12}
            //   handlePress={handleChange}
              text={"Delete"}
              width={120}
            />
          </>
        
      </View>
    </SafeAreaView>
  );
};

export default EditDocument;
