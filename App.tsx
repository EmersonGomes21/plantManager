import React, { useEffect } from "react";
import AppLoadinng from "expo-app-loading";
import * as Notifications from "expo-notifications";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";

import Routes from "./src/routes";
import { PlantProps } from "./src/libs/storage";

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async (notification) => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      }
    );
    return () => subscription.remove();

    // async function notification() {
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log("NOTIFICAÇÔES AGENDADAS");
    //   console.log(data);
    // }
    // notification();
  }, []);

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoadinng />;

  return <Routes />;
}
