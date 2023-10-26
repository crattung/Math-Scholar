import React from "react";
import { StyleSheet } from "react-native";
import { AlertDialog, Button, Center } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeError } from "../store/error.reducer";

const ErrorOverlay = () => {
  const error = useSelector((state: RootState) => state.error.error);
  const dispatch = useDispatch();
  const cancelRef = React.useRef(null);
  const onClose = () => dispatch(removeError());

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={!!error}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.Header color="danger" alignItems={"center"}>
          {error?.title}
        </AlertDialog.Header>
        <AlertDialog.Body alignItems={"center"}>
          {error?.message}
        </AlertDialog.Body>
        <AlertDialog.Footer justifyContent={"center"}>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}
              borderWidth={1}
            >
              Close
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({});
