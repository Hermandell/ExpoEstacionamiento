import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { Carousel, Loading } from "../../../components/Shared";
import {
  Header,
  Info,
  BtnReviewForm,
  Reviews,
  BtnFavorite,
} from "../../../components/Parking";
import { db } from "../../../utils";
import { styles } from "./ParkingScreen.styles";

const { width } = Dimensions.get("window");

export function ParkingScreen(props) {
  const { route } = props;
  const [parking, setParking] = useState(null);

  useEffect(() => {
    setParking(null);
    onSnapshot(doc(db, "parkings", route.params.id), (doc) => {
      setParking(doc.data());
    });
  }, [route.params.id]);

  if (!parking) return <Loading show text="Cargando estacionamientos" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={parking.images} height={250} width={width} />
      <Header parking={parking} />
      <Info parking={parking} />
      <BtnReviewForm idParking={route.params.id} />
      <Reviews idParking={route.params.id} />
      <BtnFavorite idParking={route.params.id} />
    </ScrollView>
  );
}
