import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import LessonLayout from "../../components/LessonLayout";
import { Box, Center, HStack, Text, VStack, useTheme } from "native-base";
import Formula from "../../components/Formula";
import GroupAnswer from "../../components/GroupAnswer";
import { EOperation, EQuizStatus, IAnserTag, IQuiz } from "../../types/utils";
import PopupRightAnswer from "../../components/PopupRightAnswer";
import CustomBtn from "../../components/CustomBtn";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  RootStackParams,
  ScreenNavigationProps,
} from "../../navigations/config";
import { lessons } from "../../data/mockup";

type Props = {};

type IAnserTagList = { [key: number]: IAnserTag };

const Examination = (props: Props) => {
  const { colors } = useTheme();
  const route = useRoute<any>();
  const { idx } = route.params;
  const exams = lessons[idx].exams;
  const navigation = useNavigation<ScreenNavigationProps>();
  const [quizIndex, setQuizIndex] = useState(0);
  const [finishQuiz, setFinishQuiz] = useState(false);
  const [answerTagList, setAnswerTagList] = useState<IAnserTagList>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });
  const [showModal, setShowModal] = useState(false);
  const handleChoice = (childNode: ChildNode) => {
    setAnswerTagList({ ...answerTagList, [quizIndex]: childNode });
    // Set limit when get last question
    if (quizIndex < 5) {
      setQuizIndex(quizIndex + 1);
    } else {
      setShowModal(true);
    }
  };

  const handleModalBtn = () => {
    setShowModal(false);
    setFinishQuiz(true);
  };

  const handleNextBtn = () => {
    navigation.navigate("Collection");
  };

  useEffect(() => {}, [answerTagList]);
  return (
    <LessonLayout iconSource={require("../../../assets/images/bg-21.png")}>
      <PopupRightAnswer
        showModal={showModal}
        setShowModal={setShowModal}
        handleBtn={handleModalBtn}
      />
      <Center flex={1} padding={4}>
        <VStack>
          <VStack flex={7} flexWrap={"wrap"} justifyContent={"center"}>
            {exams.map((elm, idx) => (
              <HStack key={`${elm}-${idx}`} flexBasis={`26%`}>
                <Formula
                  size="S"
                  status={
                    quizIndex >= idx ? EQuizStatus.ANSWER : EQuizStatus.HIDDEN
                  }
                  answerTag={answerTagList[idx]}
                  data={elm}
                />
                {idx < 3 && <Box mx={2} width={0.4} bgColor={"#fff"}></Box>}
              </HStack>
            ))}
          </VStack>
          <Box flex={2} alignItems={finishQuiz ? "flex-end" : "center"}>
            {finishQuiz ? (
              <CustomBtn
                btnColor={colors.gradient.primary}
                size="SM"
                text="Tiếp tục →"
                handleBtn={handleNextBtn}
              />
            ) : (
              <GroupAnswer
                size="S"
                dataAnswer={{
                  choices: exams[quizIndex].choices,
                  answer: exams[quizIndex].answer,
                }}
                answerTag={answerTagList[quizIndex]}
                setAnswerTag={handleChoice}
              />
            )}
          </Box>
        </VStack>
      </Center>
    </LessonLayout>
  );
};

export default Examination;

const styles = StyleSheet.create({});
