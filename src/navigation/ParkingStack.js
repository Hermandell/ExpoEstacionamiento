import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParkingsScreen } from "../screens/Parkings/ParkingsScreen";
import { AddParkingScreen } from "../screens/Parkings/AddParkingScreen";
import { ParkingScreen } from "../screens/Parkings/ParkingScreen";
import { AddReviewParkingScreen } from "../screens/Parkings/AddReviewParkingScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function ParkingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.parking.parkings}
        component={ParkingsScreen}
        options={{ title: "Estacionamientos" }}
      />
      <Stack.Screen
        name={screen.parking.addParking}
        component={AddParkingScreen}
        options={{ title: "Nuevo parkinge" }}
      />
      <Stack.Screen
        name={screen.parking.parking}
        component={ParkingScreen}
        options={{ title: "Parkinge" }}
      />
      <Stack.Screen
        name={screen.parking.addReviewParking}
        component={AddReviewParkingScreen}
        options={{ title: "Nueva opinión" }}
      />
    </Stack.Navigator>
  );
}
