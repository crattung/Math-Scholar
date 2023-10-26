import { StyleSheet, Text } from "react-native";
import React, { ReactNode } from "react";
import BackgroundLayout from "./BackgroundLayout";
import { Box, HStack } from "native-base";
import CloseBtn from "./CloseBtn";
import { useNavigation } from "@react-navigation/native";

type Props = {
  iconSource: string;
  children: ReactNode;
  handleBack?: () => void;
};

const LessonLayout = (props: Props) => {
  const navigation = useNavigation();
  const { handleBack = () => navigation.goBack() } = props;
  return (
    <BackgroundLayout
      imageSource={props.iconSource || require("../../assets/images/bg-21.png")}
    >
      <Box flex={1} py={8}>
        <HStack flex={1} justifyContent={"flex-end"}>
          <Box height="100%" width="55%">
            <BackgroundLayout
              imageSource={require("../../assets/images/table1.png")}
            >
              {props.children}
            </BackgroundLayout>
          </Box>
          <Box mx={6} mt={"-2"}>
            <CloseBtn handleBtn={handleBack} />
          </Box>
        </HStack>
      </Box>
    </BackgroundLayout>
  );
};

export default LessonLayout;

const styles = StyleSheet.create({
  image: {
    height: 250,
  },
});
