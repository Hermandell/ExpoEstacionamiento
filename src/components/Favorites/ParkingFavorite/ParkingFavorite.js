import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { db, screen } from "../../../utils";
import { styles } from "./ParkingFavorite.styles";

export function ParkingFavorite(props) {
  const { parking } = props;
  const navigation = useNavigation();

  const goToParking = () => {
    navigation.navigate(screen.parking.tab, {
      screen: screen.parking.parking,
      params: {
        id: parking.id,
      },
    });
  };

  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", parking.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToParking}>
      <View style={styles.content}>
        <Image source={{ uri: parking.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{parking.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
