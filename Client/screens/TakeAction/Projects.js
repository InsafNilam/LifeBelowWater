import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Icon from "react-native-dynamic-vector-icons";
  import axios from "axios";
  import { useToast } from "react-native-toast-notifications";
  
  import { CircularButton, ApplyButton } from "../../components/Button";
  import { OtherHeader } from "../../components/Header";
  import FocusedStatusBar from "../../components/FocusedStatusBar";
  
import { VHeader } from "../../components/Header";
  
  import Arrow from "../../assets/images/arrow.png";
  import Data from "../../components/Data";
  import{VData} from "../../components/Data"
  
  const Projects = ({ navigation }) => {
    const toast = useToast();
    const [values, setValues] = useState([]);
  
    useEffect(() => {
      axios
        .get("https://conserveblueapi.herokuapp.com/api/project/getProjects")
        .then((res) => {
          setValues(res.data);
          toast.show("Successfully Fetched", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        })
        .catch((e) => console.log(e));
    }, []);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#A2BCFE" }}>
        <VHeader/>
        <ApplyButton
        fontSize={15}
        text={"APPLY FOR VOLUNTEERING"}
        width={350}
        backgroundColor={"#021F54"}
        handlePress={() => navigation.navigate("VolunteerApply")}
        />
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
            flex: 1,
          }}
        >

          <View
            style={{
              margin: 8,
              marginBottom: 0,
              flex: 1,
            }}
          >
            <FlatList
              data={values}
              renderItem={({ item }) => (
                <VData
                  mainText={item.projectName}
                  subText={item.category}
                  subText2={item.fullName}
                  subText3={item.phone}
                  subText4={item.email}
                  subText5={item.description}
                />
              )}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Projects;
  