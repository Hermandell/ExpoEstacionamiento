import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./ListParkings.styles";

export function ListParkings(props) {
  const { parkings } = props;
  const navigation = useNavigation();

  const goToParking = (parking) => {
    navigation.navigate(screen.parking.parking, { id: parking.id });
  };

  return (
    <FlatList
      data={parkings}
      renderItem={(doc) => {
        const parking = doc.item.data();

        return (
          <TouchableOpacity onPress={() => goToParking(parking)}>
            <View style={styles.parking}>
              <Image
                source={{ uri: parking.images[0] }}
                style={styles.image}
              />

              <View>
                <Text style={styles.name}>{parking.name}</Text>
                <Text style={styles.info}>{parking.address}</Text>
                <Text style={styles.info}>{parking.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
