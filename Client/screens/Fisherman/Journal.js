import { View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { CircularButton, Button } from "../../components/Button";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { OtherHeader } from "../../components/Header";

import Arrow from "../../assets/images/arrow.png";
import { useToast } from "react-native-toast-notifications";

const Journal = ({ navigation }) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    income: 0,
    expense: 0,
  });

  const [formValues, setFormValues] = useState({
    _id: "",
    income: 0,
    expense: 0,
    savings: 0,
  });

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleWithdraw = async () => {
    if (formValues.savings !== 0) {
      axios
        .put(
          `https://conserveblueapi.herokuapp.com/api/journal/updateJournal/${formValues._id}`,
          {
            income: 0,
            expense: 0,
            savings: 0,
          }
        )
        .then((res) => {
          setFormValues(res.data);
          toast.show("Journal Withdraw Successful", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        })
        .catch((e) => console.log(e));
    } else {
      toast.show("Withdraw Failed Savings < 0", {
        type: "danger",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };

  const handleSubmit = async () => {
    if (
      values.income !== 0 &&
      values.expense !== 0 &&
      values.income > values.expense
    ) {
      formValues.savings += values.income - values.expense;
      formValues.income = values.income;
      formValues.expense = values.expense;
      axios
        .put(
          `https://conserveblueapi.herokuapp.com/api/journal/updateJournal/${formValues._id}`,
          {
            income: values.income,
            expense: values.expense,
            savings: formValues.savings,
          }
        )
        .then((res) => {
          setFormValues(res.data);
          toast.show("Journal Update Successful", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        })
        .catch((e) => console.log(e));
    } else {
      toast.show("Journal Update Failed", {
        type: "danger",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    AsyncStorage.getItem("userID").then((value) => {
      axios
        .get(
          `https://conserveblueapi.herokuapp.com/api/journal/getJournal/${value}`
        )
        .then(async (res) => {
          if (res.data.length === 0) {
            await axios
              .post(
                "https://conserveblueapi.herokuapp.com/api/journal/addJournal",
                { income: 0, expense: 0, savings: 0, userId: value }
              )
              .then((res) => {
                axios
                  .get(
                    `https://conserveblueapi.herokuapp.com/api/journal/getJournal/${value}`
                  )
                  .then(async (res) => {
                    toast.show("Journal Creation Successful", {
                      type: "success",
                      placement: "top",
                      duration: 500,
                      offset: 30,
                      animationType: "slide-in",
                    });
                    setFormValues({
                      _id: res.data[0]._id,
                      income: res.data[0].income,
                      expense: res.data[0].expense,
                      savings: res.data[0].savings,
                    });
                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          } else {
            setFormValues({
              _id: res.data[0]._id,
              income: res.data[0].income,
              expense: res.data[0].expense,
              savings: res.data[0].savings,
            });
          }
          toast.show("Successfully Fetched", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        })
        .catch((e) => console.log(e));
    });
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
            top: -25,
            right: 0,
            left: 0,
            color: "#FCCB06",
          }}
        >
          Daily Journal
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
            marginBottom: 50,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ justifyContent: "space-evenly" }}>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Income</Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Expense</Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Savings</Text>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>Total Savings</Text>
          </View>
          <View style={{ justifyContent: "space-evenly" }}>
            <Text style={{ fontSize: 18, marginBottom: 5, textAlign: "right" }}>
              {formValues.income}
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 5, textAlign: "right" }}>
              {formValues.expense}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 5,
                textAlign: "right",
              }}
            >
              {formValues.income - formValues.expense}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 5,
                textAlign: "right",
              }}
            >
              {formValues.savings}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            width={150}
            fontSize={12}
            backgroundColor={"#00ff7f"}
            text={"Income/Expense"}
            handlePress={() => setIsOpen(!isOpen)}
          />
          <Button
            width={120}
            fontSize={12}
            text={"Withdraw"}
            backgroundColor={"#E3242B"}
            handlePress={handleWithdraw}
          />
        </View>
        {isOpen && (
          <>
            <View style={{ marginBottom: 8 }}>
              <Text>Income</Text>
              <TextInput
                value={values.income}
                keyboardType="number-pad"
                onChangeText={(text) => handleChange("income", text)}
                placeholder="Please Provide Income"
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
              <Text>Expense</Text>
              <TextInput
                value={values.expense}
                keyboardType="number-pad"
                onChangeText={(text) => handleChange("expense", text)}
                placeholder="Please Provide Expense"
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Journal;
