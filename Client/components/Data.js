import { View, Text } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import React from "react";

const Data = ({ mainText, subText, icon }) => {
  return (
    <View
      style={{
        height: 60,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "gray",
        flexDirection: "row",
        paddingLeft: 10,
      }}
    >
      <View
        style={{
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5,
        }}
      >
        <Icon name={icon} type="FontAwesome5" size={30} color="black" />
      </View>
      <View
        style={{
          flex: 1,
          height: 60,
          padding: 5,
          justifyContent: "center",
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "left",
              fontFamily: "InterRegular",
              fontSize: 18,
            }}
          >
            {mainText}{" "}
          </Text>
        </View>
        {subText !== "" && (
          <View>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "InterLight",
                fontSize: 14,
              }}
            >
              {subText}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export const VData = ({ mainText, subText, subText2,subText3,subText4, subText5, icon }) => {
  return (
    <View
      style={{
        height: 240,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "white",
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 70,
      }}
    >
      <View
        style={{
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5,
        }}
      >
        <Icon name={icon} type="FontAwesome5" size={30} color="black" />
      </View>
      <View
        style={{
          flex: 1,
          height: 60,
          padding: 5,
          justifyContent: "center",
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "left",
              fontFamily: "InterSemiBold",
              fontSize: 20,
              color:"#021F54"
            }}
          >
            {mainText}{" "}
          </Text>
        </View>
        {subText !== "" && (
          <View>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "InterLight",
                fontSize: 14,
                marginTop:15,
                color:"#021F54",
              }}
            >
              <Text style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            color:"#021F54",
            fontFamily: "InterMedium",
          }}>Project Category: </Text>
              {subText}
            </Text>
          </View>
        )}
        {subText2 !== "" && (
          <View>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "InterLight",
                fontSize: 14,
                marginTop:5,
                color:"#021F54",
              }}
            >
              <Text style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            color:"#021F54",
            fontFamily: "InterMedium",
          }}>Organizer's Name: </Text>
              {subText2}
            </Text>
          </View>
        )}
        {subText3 !== "" && (
          <View>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "InterLight",
                fontSize: 14,
                marginTop:5,
                color:"#021F54",
              }}
            >
              <Text style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            color:"#021F54",
            fontFamily: "InterMedium",
          }}>Phone Number: </Text>
              {subText3}
            </Text>
          </View>
        )}
        {subText4 !== "" && (
          <View>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "InterLight",
                fontSize: 14,
                marginTop:5,
                color:"#021F54",
              }}
            >
              <Text style={{
            textAlign: "justify",
            justifyContent: "flex-start",
            color:"#021F54",
            fontFamily: "InterMedium",
          }}>Email: </Text>
              {subText4}
            </Text>
          </View>
        )}
        {subText5 !== "" && (
          <View>
            <Text
              style={{
                textAlign: "left",
                fontFamily: "InterLight",
                fontSize: 14,
                marginTop:10,
                color:"#006E8C",
              }}
            >
              {subText5}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default Data;
