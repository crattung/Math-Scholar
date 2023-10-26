import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ErrorOverlay from "../components/ErrorOverlay";
import LoadingOverlay from "../components/LoadingOverlay";
import { RootStackParams } from "./config";
import Home from "../screens/Home";
import Lessons from "../screens/Lessons";
import Examination from "../screens/Exam/Examination";
import Quiz from "../screens/Quiz";
import Collection from "../screens/Collection";
import QuizImage from "../screens/QuizImage";
import * as SQLite from "expo-sqlite";
import { createTables, deleteTable, getDBConnection } from "../db/db-service";
import { models } from "../db/models";
import ObjectiveTest from "../screens/Exam/ObjectiveTest";
import PickImage from "../screens/Exam/PickImage";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { LogBox } from 'react-native';

//Ignore all log notifications
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator<RootStackParams>();

const Root = () => {
  const [db, setDb] = useState<SQLite.Database>();

  useEffect(() => {
    const loadDb = () => {
      try {
        const db = getDBConnection();
        // deleteTable(db, "badges");
        // create Tables
        Object.keys(models).map((tableName) =>
          createTables(db, tableName, models[tableName])
        );
      } catch (error: any) {
        throw new Error(error);
      }
    };
    loadDb();
    const loadingSound = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
      });
    };
    loadingSound();
  }, []);
  return (
    <>
      <LoadingOverlay />
      <ErrorOverlay />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PickImage" component={PickImage} />
          <Stack.Screen name="ObjectiveTest" component={ObjectiveTest} />
          <Stack.Screen name="QuizImage" component={QuizImage} />
          <Stack.Screen name="Collection" component={Collection} />
          <Stack.Screen name="Lessons" component={Lessons} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Examination" component={Examination} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Root;

const styles = StyleSheet.create({});
