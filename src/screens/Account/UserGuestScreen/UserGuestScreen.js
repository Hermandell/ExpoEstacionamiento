import React from "react";
import { ScrollView } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./UserGuestScreen.styles";

export function UserGuestScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require("../../../../assets/img/user-guest.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar tu perfil de Estacionamiento HD</Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor parkinge? Busca y visualiza los mejores
        estacionamientos de una forma sencilla, vota cual te ha gustado más y
        comenta como ha sito tu experiencia.
      </Text>

      <Button
        title="Ver tu perfil"
        onPress={goToLogin}
        buttonStyle={styles.btnStyle}
      />
    </ScrollView>
  );
}
