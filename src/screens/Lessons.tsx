import { Alert, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import LessonLayout from "../components/LessonLayout";
import { Box, Text, HStack, VStack, useTheme } from "native-base";
import { ArrowLeft3, ArrowRight3 } from "iconsax-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EFont, ELessonType } from "../types/utils";
import CustomBtn from "../components/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProps } from "../navigations/config";
import { lessons } from "../data/mockup";
import YoutubePlayer from "react-native-youtube-iframe";

type Props = {};

const Tick = () => {
  const { colors } = useTheme();
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={[
        colors.gradient.secondary.orange.color1,
        colors.gradient.secondary.orange.color2,
      ]}
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 18,
        height: 18,
        borderRadius: 18,
      }}
    >
      <Text fontSize={10} color={"#2b82e7"}>
        √
      </Text>
    </LinearGradient>
  );
};
const Lessons = (props: Props) => {
  const navigation = useNavigation<ScreenNavigationProps>();
  // const route = useRoute();
  const { colors } = useTheme();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [lessonIdx, setLessonIdx] = useState(0);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const navigateExamScreen = () => {
    const lessonType = lessons[lessonIdx].type;
    if (lessonType == ELessonType.OBJECTIVE_TEST) {
      navigation.navigate("ObjectiveTest", {
        idx: lessonIdx,
      });
    } else if (lessonType == ELessonType.PICK_NUMBER) {
      navigation.navigate("Examination", {
        idx: lessonIdx,
      });
    }
  };

  return (
    <LessonLayout iconSource={require("../../assets/images/bg-21.png")}>
      <Box flex={1}>
        <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
          <HStack alignItems={"center"} justifyContent={"space-between"} px={5}>
            <TouchableOpacity>
              <ArrowLeft3
                size="36"
                color={lessonIdx <= 0 ? "#cecece" : "#fff"}
                variant="Bold"
                onPress={() => setLessonIdx(lessonIdx - 1)}
                disabled={lessonIdx <= 0}
              />
            </TouchableOpacity>
            <Box flex={1} borderRadius={12} alignItems={"center"} px={2}>
              <YoutubePlayer
                height={180}
                width={280}
                play={playing}
                videoId={lessons[lessonIdx].video}
                onChangeState={onStateChange}
              />
            </Box>
            <TouchableOpacity>
              <ArrowRight3
                size="36"
                color={
                  lessonIdx >= Object.keys(lessons).length - 1
                    ? "#cecece"
                    : "#fff"
                }
                variant="Bold"
                onPress={() => setLessonIdx(lessonIdx + 1)}
                disabled={lessonIdx >= Object.keys(lessons).length - 1}
              />
            </TouchableOpacity>
          </HStack>
          <HStack
            width="60%"
            mt={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <VStack>
              <Text
                fontFamily={EFont.Quicksand_700Bold}
                color="white"
                fontSize={20}
              >
                Bài {lessonIdx + 1}:
              </Text>
              <HStack alignItems={"center"} space={1}>
                <Box width={"80%"}>
                  <Text
                    fontFamily={EFont.Quicksand_700Bold}
                    color="white"
                    fontSize={16}
                    ellipsizeMode="tail"
                    numberOfLines={2}
                  >
                    {lessons[lessonIdx].title}
                  </Text>
                </Box>
                {/* <Tick /> */}
              </HStack>
            </VStack>
            <CustomBtn
              btnColor={colors.gradient.secondary.orange}
              size="SM"
              text="Bài kiểm tra"
              handleBtn={navigateExamScreen}
              disabled={lessons[lessonIdx].exams.length <= 0}
            />
          </HStack>
        </VStack>
      </Box>
    </LessonLayout>
  );
};

export default Lessons;

const styles = StyleSheet.create({});
