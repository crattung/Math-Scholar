import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, IBoxProps, Text } from "native-base";
import { EFont, IGradientColor } from "../types/utils";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  size?: "MD" | "XS" | "SM";
  btnColor: IGradientColor;
  text: string;
  handleBtn: () => void;
  disabled?: boolean;
} & IBoxProps;

const CustomBtn = (props: Props) => {
  const { text, size, btnColor, handleBtn, disabled = false,...boxProps } = props;
  let width, height, fontSize;
  if (size == "MD") {
    width = 220;
    height = 40;
    fontSize = 16;
  } else if (size == "XS") {
    width = 160;
    height = 32;
    fontSize = 14;
  } else if (size == "SM") {
    width = 110;
    height = 40;
    fontSize = 16;
  }
  else{
    height = 32;
  }
  return (
    <TouchableOpacity onPress={handleBtn} disabled={disabled}>
      <Box shadow={2} {...boxProps} style={[styles.button, { width, height }]} >
        <LinearGradient
          // Button Linear Gradient
          colors={
            disabled ? ["#fff", "#cecece"] : [btnColor.color1, btnColor.color2]
          }
          style={styles.gradientColor}
        >
          <Text
            fontSize={fontSize}
            color="white"
            fontFamily={EFont.Quicksand_700Bold}
          >
            {text}
          </Text>
        </LinearGradient>
      </Box>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 100,
    padding: 1,
    backgroundColor: "#fff",
  },
  gradientColor: {
    borderRadius: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
