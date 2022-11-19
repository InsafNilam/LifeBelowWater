import { View, Text, Image } from "react-native";

import Background from "../assets/images/background.png";
import Logo from "../assets/images/logo.png";

export const Header = () => {
  return (
    <View style={{ marginTop: 24 }}>
      <Text
        style={{
          paddingLeft: 40,
          color: "#1C0C4F",
          fontFamily: "InterBold",
          fontSize: 48,
          fontStyle: "italic",
        }}
      >
        Conserve
      </Text>
      <Text
        style={{
          marginTop: -24,
          paddingLeft: 120,
          color: "#1464F6",
          fontFamily: "InterSemiBold",
          fontSize: 48,
          fontStyle: "italic",
        }}
      >
        The Blue
      </Text>
      <Text
        style={{
          marginTop: -12,
          paddingLeft: 160,
          color: "#606060",
          fontFamily: "InterLight",
          fontSize: 20,
        }}
      >
        Life Below Water
      </Text>
    </View>
  );
};

export const OtherHeader = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 180,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
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
      <Image
        source={Logo}
        resizeMode="contain"
        style={{ width: 90, height: 90, top: 30 }}
      />
      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            paddingLeft: 20,
            color: "#1C0C4F",
            fontFamily: "InterBold",
            fontSize: 36,
            fontStyle: "italic",
          }}
        >
          Conserve
        </Text>
        <Text
          style={{
            marginTop: -12,
            paddingLeft: 80,
            color: "#1464F6",
            fontFamily: "InterSemiBold",
            fontSize: 24,
            fontStyle: "italic",
          }}
        >
          The Blue
        </Text>
        <Text
          style={{
            marginTop: -8,
            paddingLeft: 120,
            color: "#606060",
            fontFamily: "InterLight",
            fontSize: 18,
          }}
        >
          Life Below Water
        </Text>
      </View>
    </View>
  );
};

export const VHeader = () => {
  return (
    <Text style={{ fontFamily: "InterSemiBold", 
          fontSize: 24, 
          color:"#021F54",
          textAlign: "center",
          marginTop: 30}}>
          Ocean Conservation Projects
        </Text>
  );
};
