import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Birds from "../assets/icons/birds.svg";
import BirdsOutline from "../assets/icons/birds-outline.svg";
import Camera from "../assets/icons/camera.svg";
import CameraOutline from "../assets/icons/camera-outline.svg";
import Heart from "../assets/icons/heart.svg";
import HeartOutline from "../assets/icons/heart-outline.svg";
import Message from "../assets/icons/message.svg";
import MessageOutline from "../assets/icons/message-outline.svg";
import Planet from "../assets/icons/planet.svg";
import PlanetOutline from "../assets/icons/planet-outline.svg";
import colors from "../colors";
import TabBar from "../TabBar";
import Icon from "./Icon";
import {
  ListingEditScreen,
  ListingScreen,
  MessageScreen,
  PlanetScreen,
  ProfileScreen,
} from "./screens";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <TabBar {...props} />}
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.pink,
      tabBarInactiveTintColor: colors.gray,
      tabBarIcon: () => {
        let DefaultIcon = "";

        switch (route.name) {
          case "Planet":
            DefaultIcon = PlanetOutline;
            break;
          case "Listing":
            DefaultIcon = BirdsOutline;
            break;
          case "Listing Edit":
            DefaultIcon = CameraOutline;
            break;
          case "Message":
            DefaultIcon = MessageOutline;
            break;
          case "Profile":
            DefaultIcon = HeartOutline;
            break;

          default:
            DefaultIcon = PlanetOutline;
        }

        return <Icon IconName={DefaultIcon} />;
      },
      activeIcon: () => {
        let ActiveIcon;

        switch (route.name) {
          case "Planet":
            ActiveIcon = Planet;
            break;
          case "Listing":
            ActiveIcon = Birds;
            break;
          case "Listing Edit":
            ActiveIcon = Camera;
            break;
          case "Message":
            ActiveIcon = Message;
            break;
          case "Profile":
            ActiveIcon = Heart;
            break;

          default:
            ActiveIcon = Planet;
        }

        return <Icon IconName={ActiveIcon} />;
      },
    })}
  >
    <Tab.Screen
      name="Planet"
      component={PlanetScreen}
      options={{
        title: "星球",
      }}
    />
    <Tab.Screen
      name="Listing"
      component={ListingScreen}
      options={{
        title: "廣場",
      }}
    />
    <Tab.Screen
      name="Listing Edit"
      component={ListingEditScreen}
      options={{
        title: "發布",
      }}
    />
    <Tab.Screen
      name="Message"
      component={MessageScreen}
      options={{
        title: "消息",
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "自己",
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
