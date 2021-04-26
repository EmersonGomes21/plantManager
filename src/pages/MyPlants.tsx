import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import { Header } from "../components/Header";
import waterdrop from "../assets/waterdrop.png";
import colors from "../styles/colors";
import { FlatList } from "react-native-gesture-handler";
import { loadPlant, PlantProps, removePlant } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import fonts from "../styles/fonts";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import { Load } from "../components/Load";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setloading] = useState(true);
  const [nextWared, setNextWared] = useState<string>();


  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😪",
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );

          
            
          } catch (error) {
            Alert.alert("Não foi possível remover! 😪");
          }
        },
      },
    ]);
  }

  useEffect(() => {

   

    async function loadStorageData() {

      const plantsStoraged = await loadPlant();
      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

    setNextWared( `Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}` );

      setMyPlants(plantsStoraged);
      setloading(false);
    }
    loadStorageData();
  }, []);
  //if (loading) return <Load />;
  return (
    <View style={styles.container}>
      <Header subtitle="Plantinhas" title="Minhas" />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.warningNextWared}>{  nextWared }</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecundary
                data={item}
                handleRemove={() => {
                  handleRemove(item);
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: 30,
   
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  warningNextWared: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: "left",
    fontFamily: fonts.text,
    lineHeight: 25,
    fontSize: 15,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 15,
    marginTop: 40
  },
});
