import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { size, map } from "lodash";
import {
  UserNotLogged,
  NotFoundParkings,
  ParkingFavorite,
} from "../components/Favorites";
import { Loading } from "../components/Shared";
import { db } from "../utils";

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [parkings, setParkings] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (auth?.currentUser) {
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );
      onSnapshot(q, async (snapshot) => {
        let parkingArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "parkings", data.idParking);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
          parkingArray.push(newData);
        }
        setParkings(parkingArray);
      });
    }
  }, [auth]);

  if (!hasLogged) return <UserNotLogged />;

  if (!parkings) return <Loading show text="Cargando" />;

  if (size(parkings) === 0) return <NotFoundParkings />;

  return (
    <ScrollView>
      {map(parkings, (parking) => (
        <ParkingFavorite key={parking.id} parking={parking} />
      ))}
    </ScrollView>
  );
}
