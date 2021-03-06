import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import watering from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { hasName } from "../libs/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function Welcome() {
  const navigation = useNavigation();

  async function handleStart() {
      const  name = await hasName();
    if (name ) navigation.navigate("PlantSelect");
    else navigation.navigate("UserIdentification");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {"\n"}
          suas plantas de{"\n"}
          forma fácil
        </Text>

        <Image
          source={watering}
          style={styles.image}
          resizeMode="contain"
        ></Image>

        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonArrow} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34,
    marginTop: 40,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 20,
    height: 56,
    width: 56,
  },
  buttonArrow: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "bold",
  },
});
