import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { ImageSourcePropType, Platform, StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";

import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPickerModal from "@/components/EmojiPickerModal";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";

const placeholderImage = require("../../assets/images/background-image.png"); // RN 推荐使用 require 导入图片

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);

  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [status, requestPermission] = MediaLibrary.usePermissions(); // 获取媒体库权限
  const imageRef = useRef<View>(null);

  useEffect(() => {
    if (!status?.granted) {
      requestPermission();
    }
  }, [status, requestPermission]);

  // 上传图片
  const handlePickImage = async () => {
    // 打开图片选择器
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // console.log(result.assets[0].uri);
      // 这里可以将选中的图片 URI 存储到状态中，或者进行其他处理
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  // 重置图片
  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
  };

  // 添加贴纸
  const onAddSticker = () => {
    // 这里可以添加贴纸的逻辑
    setIsModalVisible(true);
  };

  // 保存图片
  const onSaveImageAsync = async () => {
    try {
      if (Platform.OS === "web") {
        // @ts-ignore
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } else {
        // captureRef 用于捕获指定组件的视图，并将其保存为图片
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        // 保存到媒体库
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 关闭, 选择贴纸的模态框
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          {/* 当 collapsable={false} 时，即使这个 <View> 没有样式或事件，也会强制保留在原生视图树中。 */}
          <ImageViewer
            imgSource={placeholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={handlePickImage}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <EmojiPickerModal isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPickerModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
