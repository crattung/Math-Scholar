import { StyleSheet } from "react-native";
import React from "react";
import { HStack, useTheme } from "native-base";
import BoxAnswer from "./BoxAnswer";
import { IQuizAnswer } from "../types/utils";
import { Audio } from "expo-av";
import { loadSound } from "../utils/func";

type Props = {
  size: "M" | "S";
  dataAnswer: IQuizAnswer;
  answerTag: any;
  setAnswerTag: any;
};
const GroupAnswer = (props: Props) => {
  const { colors } = useTheme();

  const btnColorOption: any = {
    0: colors.gradient.secondary.green,
    1: colors.gradient.secondary.red,
    2: colors.gradient.secondary.orange,
  };
  const handleChoice = async (choice: number, index: number) => {
    const playSound = new Audio.Sound();
    if (index == props.dataAnswer.answer) {
      loadSound(playSound, require("../../assets/sound/correct.mp3"));
      props.setAnswerTag(
        <BoxAnswer
          size={props.size}
          btnColor={btnColorOption[index]}
          key={`${choice}-${index}`}
          boxText={choice}
          handleBtn={() => {}}
        />
      );
    } else {
      loadSound(playSound, require("../../assets/sound/wrong.mp3"));
    }
  };

  // Styling
  let spacing;
  if (props.size == "M") {
    spacing = 8;
  } else if (props.size == "S") {
    spacing = 4;
  }
  return (
    <HStack justifyContent={"center"} space={spacing}>
      {/* Delete choice when pick right */}
      {props.dataAnswer.choices.map((choice, index) =>
        props.answerTag && choice == props.dataAnswer.answer ? null : (
          <BoxAnswer
            size={props.size}
            btnColor={btnColorOption[index]}
            key={`${choice}-${index}`}
            boxText={choice}
            handleBtn={() => handleChoice(choice, index)}
          />
        )
      )}
    </HStack>
  );
};

export default GroupAnswer;

const styles = StyleSheet.create({});
