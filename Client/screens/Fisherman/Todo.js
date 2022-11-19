import { View, Text, SafeAreaView, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-dynamic-vector-icons";

import { Button } from "../../components/Button";
import Data from "../../components/Data";

const Todo = () => {
  const toast = useToast();
  const [values, setValues] = useState({
    name: "",
    userId: "",
  });
  const [userID, setUserID] = useState("");

  const [todoData, setTodoData] = useState([]);
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    values.userId = userID;
    if (values.name !== "" && userID !== "") {
      axios
        .post("https://conserveblueapi.herokuapp.com/api/todo/addTodo", values)
        .then((res) => {
          setValues({ name: "", userId: "" });
          axios
            .get(
              `https://conserveblueapi.herokuapp.com/api/todo/getTodo/${userID}`
            )
            .then((res) => setTodoData(res.data))
            .catch((e) => console.log(e));
          toast.show("TODO Added Successful", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        })
        .catch((e) => console.log(e));
    } else {
      toast.show("Enter Something", {
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
      axios
        .get(`https://conserveblueapi.herokuapp.com/api/todo/getTodo/${val}`)
        .then((res) => setTodoData(res.data))
        .catch((e) => console.log(e));
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, margin: 8 }}>
      <View style={{ marginBottom: 8 }}>
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
      <Button
        fontSize={12}
        handlePress={handleSubmit}
        text={"ADD"}
        width={120}
      />
      <View
        style={{
          marginTop: 8,
          marginBottom: 0,
          flex: 1,
        }}
      >
        <FlatList
          data={todoData}
          renderItem={({ item }) => (
            <>
              <Data icon={"list-ul"} mainText={item.name} />
              <Icon
                name="trash"
                color="black"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 10,
                  padding: 8,
                  backgroundColor: "#fff",
                  zIndex: 5,
                }}
                type="FontAwesome5"
                size={20}
                onPress={() => {
                  let id = item._id;
                  axios
                    .delete(
                      `https://conserveblueapi.herokuapp.com/api/todo/deleteTodo/${id}`
                    )
                    .then((res) => {
                      toast.show("Successfully Deleted", {
                        type: "success",
                        placement: "top",
                        duration: 1000,
                        offset: 30,
                        animationType: "slide-in",
                      });
                      setTodoData(todoData.filter((val) => val._id !== id));
                    })
                    .catch((e) => console.log(e));
                }}
              />
            </>
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Todo;
