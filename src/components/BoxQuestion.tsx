import { StyleSheet } from "react-native";
import React from "react";
import { Box, Text } from "native-base";
import { EFont, EQuizStatus } from "../types/utils";

type Props = {
  size: "M" | "S";
  status?: string;
};

const BoxQuestion = (props: Props) => {
  const { size, status = EQuizStatus.ANSWER } = props;
  let width, height, fontSize;
  if (size == "M") {
    width = 60;
    height = 60;
    fontSize = 40;
  } else if (size == "S") {
    width = 40;
    height = 40;
    fontSize = 28;
  }
  return (
    <Box
      style={{ width, height }}
      bgColor={"primary.blue"}
      borderRadius={8}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text
        fontFamily={EFont.Quicksand_700Bold}
        fontSize={fontSize}
        color={status == EQuizStatus.HIDDEN ? "#76c0f5" : "#fff"}
      >
        ?
      </Text>
    </Box>
  );
};

export default BoxQuestion;

const styles = StyleSheet.create({});
