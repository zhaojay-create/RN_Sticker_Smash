import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d", // tab 选中时的颜色
        headerStyle: {
          backgroundColor: "#25292e", // 导航栏背景颜色
        },
        headerShadowVisible: false, // 隐藏导航栏下方的阴影
        headerTintColor: "#fff", // 导航栏标题颜色
        tabBarStyle: {
          backgroundColor: "#25292e", // tab bar 背景颜色
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={`${focused ? "home-sharp" : "home-outline"}`}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={`${
                focused
                  ? "information-circle-sharp"
                  : "information-circle-outline"
              }`}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
