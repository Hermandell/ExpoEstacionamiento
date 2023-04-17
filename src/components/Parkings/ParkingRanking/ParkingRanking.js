import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Rating, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./ParkingRanking.styles";

export function ParkingRanking(props) {
  const { parking, index } = props;
  const navigation = useNavigation();

  const goToParking = () => {
    navigation.navigate(screen.parking.tab, {
      screen: screen.parking.parking,
      params: {
        id: parking.id,
      },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goToParking}>
      <View style={styles.content}>
        <Image source={{ uri: parking.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{parking.name}</Text>
          </View>
          <Rating
            imageSize={15}
            readonly
            startingValue={parking.ratingMedia}
          />
        </View>
        <Text style={styles.description}>{parking.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
