import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { ListParkings } from "../../../components/Parkings";
import { screen, db } from "../../../utils";
import { styles } from "./ParkingsScreen.styles";

export function ParkingsScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [parkings, setParkings] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "parkings"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setParkings(snapshot.docs);
    });
  }, []);

  const goToAddParking = () => {
    navigation.navigate(screen.parking.addParking);
  };

  return (
    <View style={styles.content}>
      {!parkings ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListParkings parkings={parkings} />
      )}

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddParking}
        />
      )}
    </View>
  );
}
