import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* 就是手机上方，电池和 wifi bar */}
      <StatusBar barStyle={"light-content"} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false, // 隐藏导航栏
            // title: "Home",
            // headerStyle: { backgroundColor: "#fff" },
            // headerTintColor: "#25292e",
            // headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack>
    </>
  );
}
