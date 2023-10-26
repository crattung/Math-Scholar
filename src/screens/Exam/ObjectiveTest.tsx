import { StyleSheet } from "react-native";
import React, { useState } from "react";
import LessonLayout from "../../components/LessonLayout";
import { Box, Center, HStack, Text, VStack, useTheme } from "native-base";
import { Image } from "expo-image";
import CustomBtn from "../../components/CustomBtn";
import PopupRightAnswer from "../../components/PopupRightAnswer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { lessons } from "../../data/mockup";
import { loadSound, randomNumberToN } from "../../utils/func";
import { Audio } from "expo-av";

type Props = {} & NativeStackScreenProps<RootStackParams, "ObjectiveTest">;

const ObjectiveTest = (props: Props) => {
  const { navigation, route } = props;
  const { idx } = route.params;
  const exams = lessons[idx].exams;
  const [randomNum] = useState(randomNumberToN(exams.length));
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [infoModal, setInfoModal] = useState({
    status: false,
    title: "",
    text: "",
  });

  const handleModalBtn = () => {
    setShowModal(false);
    if (infoModal.status) {
      navigation.navigate("Collection");
    } else {
      navigation.navigate("Home");
    }
  };

  const handleBtn = (idx: number) => {
    const playSound = new Audio.Sound();
    if (idx == exams[randomNum].answer) {
      loadSound(playSound, require("../../../assets/sound/correct.mp3"));
      setInfoModal({
        title: "Yeah!",
        text: "Bạn đã trả lời đúng",
        status: true,
      });
    } else {
      loadSound(playSound, require("../../../assets/sound/wrong.mp3"));
      setInfoModal({
        title: "Oh no!",
        text: "Bạn trả lời chưa chính xác",
        status: false,
      });
    }
    setShowModal(true);
  };

  return (
    <LessonLayout iconSource={require("../../../assets/images/bg-21.png")}>
      <PopupRightAnswer
        showModal={showModal}
        setShowModal={setShowModal}
        handleBtn={handleModalBtn}
        title={infoModal.title}
        text={infoModal.text}
      />
      <Center flex={1}>
        {/* Question Info */}
        <VStack>
          <Center px={4}>
            <Center width="100%">
              <Image
                source={exams[randomNum].imageSource}
                style={{
                  width: 300,
                  height: 180,
                  borderRadius: 8,
                  marginBottom: 2,
                  borderWidth: 2,
                  borderColor: "#cecece",
                  backgroundColor: "#fff",
                }}
                contentFit="contain"
              />
            </Center>
            <Box>
              <Text
                color={"#fff"}
                fontWeight={600}
                fontSize={16}
                textAlign={"center"}
              >
                {exams[randomNum].question}
              </Text>
            </Box>
          </Center>
        </VStack>
        {/* Answer Group */}
        <HStack flexWrap={"wrap"} justifyContent={"center"} px={16}>
          {exams[randomNum].choices.map((choice: string, idx: number) => (
            <Box margin={2} key={choice} width={"40%"}>
              <CustomBtn
                btnColor={colors.gradient.primary}
                text={choice}
                // size="XS"
                handleBtn={() => handleBtn(idx)}
              />
            </Box>
          ))}
        </HStack>
      </Center>
    </LessonLayout>
  );
};

export default ObjectiveTest;

const styles = StyleSheet.create({});
