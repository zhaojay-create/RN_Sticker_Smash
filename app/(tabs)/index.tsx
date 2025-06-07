import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPickerModal from "@/components/EmojiPickerModal";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";

const placeholderImage = require("../../assets/images/background-image.png"); // RN 推荐使用 require 导入图片

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);

  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    // 这里可以添加保存图片的逻辑
    alert("Save image functionality is not implemented yet.");
  };

  // 关闭, 选择贴纸的模态框
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={placeholderImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
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
