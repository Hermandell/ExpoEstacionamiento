import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  InfoForm,
  UploadImagesForm,
  ImageParking,
} from "../../../components/Parkings/AddParking";
import { db } from "../../../utils";
import { initialVales, validationSchema } from "./AddParkingScreen.data";
import { styles } from "./AddParkingScreen.styles";

export function AddParkingScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialVales(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();

        await setDoc(doc(db, "parkings", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageParking formik={formik} />

      <InfoForm formik={formik} />

      <UploadImagesForm formik={formik} />

      <Button
        title="Crear parkinge"
        buttonStyle={styles.addParking}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
