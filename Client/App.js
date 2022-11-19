import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Home from "./screens/Home";
import RoleSelector from "./screens/RoleSelector";
import { useFonts } from "expo-font";
import { ToastProvider } from "react-native-toast-notifications";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

import FishUI from "./screens/FishUI";
import ActionHome from "./screens/TakeAction/ActionHome";
import DocumentationUI from "./screens/DocumentationUI";
import DonationUI from "./screens/DonationUI";

// Insaf N. M. Routes
import Weather from "./screens/Fisherman/Weather";
import Compass from "./screens/Fisherman/Compass";
import Emergency from "./screens/Fisherman/Emergency";
import Support from "./screens/Fisherman/Support";
import Journal from "./screens/Fisherman/Journal";
import Stall from "./screens/Fisherman/Stall";
import Community from "./screens/Fisherman/Community";
import Profile from "./screens/Profile";
import Map from "./screens/Fisherman/Map";

// Perera W. A. M. K. Routes
import Course from "./screens/TakeAction/Course";
import Equipment from "./screens/TakeAction/Equipment";
import Experience from "./screens/TakeAction/Experience";
import OrganizeProject from "./screens/TakeAction/OrganizeProject";
import Volunteer from "./screens/TakeAction/Volunteer";
import VolunteerApply from "./screens/TakeAction/VolunteerApply";
import Projects from "./screens/TakeAction/Projects";
import AddDocument from "./screens/Documentation/AddDocument";
import EditDocument from "./screens/Documentation/EditDocument";


const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;
  return (
    <ToastProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RoleSelector" component={RoleSelector} />

        <Stack.Screen name="FishHome" component={FishUI} />
        <Stack.Screen name="ActionHome" component={ActionHome} />
        <Stack.Screen name="DocumentHome" component={DocumentationUI} />
        <Stack.Screen name="DonationHome" component={DonationUI} />

          {/* Insaf N. M. Routes */}
          <Stack.Screen name="Weather" component={Weather} />
          <Stack.Screen name="Compass" component={Compass} />
          <Stack.Screen name="Stall" component={Stall} />
          <Stack.Screen name="Community" component={Community} />
          <Stack.Screen name="Journal" component={Journal} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="Emergency" component={Emergency} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Map" component={Map} />

          {/* Perera W. M. A. K. Routes */}
          <Stack.Screen name="OrganizeProject" component={OrganizeProject} />
          <Stack.Screen name="VolunteerApply" component={VolunteerApply} />
          <Stack.Screen name="Equipment" component={Equipment} />
          <Stack.Screen name="Volunteers" component={Volunteer} />
          <Stack.Screen name="Courses" component={Course} />
          <Stack.Screen name="Experience" component={Experience} />
          <Stack.Screen name="Projects" component={Projects} />

          {/*Jayasekara N.S. Routes*/}
          <Stack.Screen name="addDocument" component={AddDocument} />
          <Stack.Screen name="editDocument" component={EditDocument} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
