import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { map } from "lodash";
import { ParkingRanking } from "../components/Parkings";
import { db } from "../utils";

export function RankingScreen() {
  const [parkings, setParkings] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "parkings"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    onSnapshot(q, (snapshot) => {
      setParkings(snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(parkings, (resaturant, index) => (
        <ParkingRanking
          key={index}
          index={index}
          parking={resaturant.data()}
        />
      ))}
    </ScrollView>
  );
}
