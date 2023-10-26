import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Center, HStack, VStack, useTheme } from "native-base";
import BackgroundLayout from "../components/BackgroundLayout";
import CustomBtn from "../components/CustomBtn";
import PopupParent from "../components/PopupParent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScreenNavigationProps } from "../navigations/config";
import { Audio } from "expo-av";
import { loadSound } from "../utils/func";
import { EOperation } from "../types/utils";
type Props = {};

const Home = (props: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation<ScreenNavigationProps>();
  const [showModal, setShowModal] = useState(false);

  const navigateLessonsScreen = async () => {
    navigation.navigate("Lessons");
  };
  const navigateCountScreen = async () => {
    navigation.navigate("QuizImage");
  };
  const navigateAddScreen = async () => {
    navigation.navigate("Quiz", {
      operation: EOperation.AddOperation,
    });
  };
  const navigateSubtractScreen = async () => {
    navigation.navigate("Quiz", {
      operation: EOperation.SubtractOperation,
    });
  };

  useFocusEffect(() => {
    const playSound = new Audio.Sound();
    loadSound(playSound, require("../../assets/sound/music.mp3"));
    const unsubscribe = async () => {
      await playSound.stopAsync();
    };

    return () => unsubscribe();
  });

  return (
    <BackgroundLayout imageSource={require("../../assets/images/bg-11.png")}>
      {/* Popup */}
      <PopupParent showModal={showModal} setShowModal={setShowModal} />
      <Box flex={1} justifyContent={"center"}>
        <Center>
          <VStack width={"80%"} space={4}>
            <HStack justifyContent={"space-between"}>
              <CustomBtn
                btnColor={colors.gradient.primary}
                text="Bài giảng"
                size="MD"
                handleBtn={navigateLessonsScreen}
              />
              <CustomBtn
                btnColor={colors.gradient.primary}
                text="Đếm số"
                size="MD"
                handleBtn={navigateCountScreen}
              />
            </HStack>
            <HStack justifyContent={"space-between"}>
              <CustomBtn
                btnColor={colors.gradient.primary}
                text="Trắc nghiệm phép cộng"
                size="MD"
                handleBtn={navigateAddScreen}
              />
              <CustomBtn
                btnColor={colors.gradient.primary}
                text="Trắc nghiệm phép trừ"
                size="MD"
                handleBtn={navigateSubtractScreen}
              />
            </HStack>
          </VStack>
        </Center>
      </Box>
      <Box
        position={"absolute"}
        bottom={8}
        width={"100%"}
        alignItems={"center"}
      >
        <CustomBtn
          btnColor={colors.gradient.secondary.orange}
          text="Dành cho phụ huynh"
          size="XS"
          handleBtn={() => setShowModal(true)}
        />
      </Box>
    </BackgroundLayout>
  );
};

export default Home;

const styles = StyleSheet.create({});
