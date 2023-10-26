import { StyleSheet } from "react-native";
import React from "react";
import { Center, HStack, Heading, Spinner } from "native-base";
import { RootState, useAppSelector } from "../store";

const LoadingOverlay = () => {
  const loading = useAppSelector((state: RootState) => state.loading.isLoading);

  return (
    loading && (
      <Center flex={1} style={styles.container}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" color={"primary.Main"} />
          <Heading color={"primary.Main"} fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    )
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.15)",
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
});
