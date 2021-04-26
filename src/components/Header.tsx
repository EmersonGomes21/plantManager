import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import colors from "../styles/colors";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import userImg from "../assets/emerson.jpeg";
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation} from "@react-navigation/core";

interface headerProps{
  title?: string;
  subtitle?: string;
  userImage?: string;
 

}
export function Header({ title, subtitle} : headerProps ){
  const [userName, setUserName] = useState<string>();
  const navigation = useNavigation();

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUserName(user || "");
    }
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title ? title : 'Olá'}</Text>
        <Text style={styles.subtitle}>{subtitle ? subtitle : userName}</Text>
      </View>
      <Image source={userImg} style={styles.userImage} /> 
      <Text onPress={()=>  navigation.navigate("UserIdentification") } style={{position: 'absolute', width: 80, height: 80, backgroundColor: colors.red, right: 0, zIndex: 9, opacity: 0}}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
     marginTop:  getStatusBarHeight(),
    
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  title: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
    marginTop: 20
  },
  subtitle: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
});
