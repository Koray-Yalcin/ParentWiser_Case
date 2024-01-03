import "react-native-gesture-handler";
import { View, Text, Image } from "react-native";
import {
  SimpleLineIcons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/Home";
import Course from "./screens/Course";
import Report from "./screens/Report";
import Students from "./screens/Students";
import Payment from "./screens/Payment";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={
          (props) => {
            return (
              <SafeAreaView>
                <View
                  style={{
                    height: 200,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1
                  }}
                >
                  <Image
                    source={require('./assets/spider_avatar.jpeg')}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 65
                    }}
                  />
                  <View style={{
                    marginLeft: 10
                  }}>
                    <Text
                      style={{
                        fontSize: 16,
                        marginVertical: 6,
                        fontWeight: "600",
                        color: "#000000"
                      }}
                    >Koray Yalçın</Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#111"
                      }}
                    >Admin</Text>
                  </View>
                </View>
                <DrawerItemList {...props} />
              </SafeAreaView>
            )
          }
        }
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitle: 'CRUD OPERATIONS',
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          drawerLabelStyle: {
            color: "#111"
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            )
          }}
          component={Home}
        />
        <Drawer.Screen
          name="Course"
          options={{
            drawerLabel: "Course",
            title: "Course",
            drawerIcon: () => (
              <MaterialCommunityIcons name="file-document-multiple-outline" size={24} color="#808080" />
            )
          }}
          component={Course}
        />
        <Drawer.Screen
          name="Students"
          options={{
            drawerLabel: "Students",
            title: "Students",
            drawerIcon: () => (
              <FontAwesome5 name="user-graduate" size={20} color="#808080" />
            )
          }}
          component={Students}
        />
        <Drawer.Screen
          name="Payment"
          options={{
            drawerLabel: "Payment",
            title: "Payment",
            drawerIcon: () => (
              <MaterialIcons name="payment" size={20} color="#808080" />
            )
          }}
          component={Payment}
        />
        <Drawer.Screen
          name="Report"
          options={{
            drawerLabel: "Report",
            title: "Report",
            drawerIcon: () => (
              <MaterialCommunityIcons name="file-document" size={20} color="#808080" />
            )
          }}
          component={Report}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}