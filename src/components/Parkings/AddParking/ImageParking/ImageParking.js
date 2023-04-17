import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "./ImageParking.styles";

export function ImageParking(props) {
  const { formik } = props;

  const primaryImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/img/image-not-found.jpg")
        }
        style={styles.image}
      />
    </View>
  );
}
