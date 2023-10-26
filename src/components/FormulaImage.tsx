import { StyleSheet } from "react-native";
import React from "react";
import { Box, HStack, Text } from "native-base";
import { EFont } from "../types/utils";
import BoxQuestion from "./BoxQuestion";
import { Image } from "expo-image";

type Props = {
  imageSlot: number;
  answerTag?: ChildNode | null;
};

const handleRenderImageQuiz = (imageSlot: number, imageSource?: string) => {
  const arrImage = [...Array(imageSlot)];
  return (
    <>
      {arrImage.map((value, idx) => (
        <Box
          key={idx}
          style={{ alignSelf: idx % 2 == 0 ? "flex-start" : "flex-end" }}
        >
          <Image
            style={{ height: 80, width: 75 }}
            source={imageSource || require("../../assets/quiz/elephant.png")}
          />
        </Box>
      ))}
    </>
  );
};

const FormulaImage = (props: Props) => {
  const { imageSlot } = props;
  return (
    <HStack space={8} alignItems={"center"}>
      {/* Formula */}
      <HStack height={160} space={2}>
        {handleRenderImageQuiz(imageSlot)}
      </HStack  >
      <Text color={"white"} fontSize={48} fontFamily={EFont.Quicksand_700Bold}>
        =
      </Text>
      {/* Box Ques */}
      {props.answerTag ? props.answerTag : <BoxQuestion size={"M"} />}
      {/* Box Ans */}
    </HStack>
  );
};

export default FormulaImage;

const styles = StyleSheet.create({});
