import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    // GestureHandlerRootView 是 react-native-gesture-handler 的根组件
    // 它需要包裹在最外层，以便处理手势事件
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
}

/* 
1. 安装 image 库
  npx expo install expo-image

2. 安装 image picker 库
  npx expo install expo-image-picker

3. 安装 view shot 保存图片
  npx expo install react-native-view-shot expo-media-library

*/
