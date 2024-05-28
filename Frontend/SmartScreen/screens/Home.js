// Home.js
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Border, FontFamily, Color, FontSize } from "./GlobalStyles";
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  return (
    <View style={[styles.view, styles.viewLayout]}>
      <Image
        style={styles.adaee0ecdde0cd3ef4995fb04dfda7Icon}
        contentFit="cover"
        source={require("../assets/4adaee0ecdde0cd3ef4995fb04dfda7d-1.png")}
      />
      <View style={[styles.badb634985775ab28d9d515ac, styles.viewLayout]} />
      <Text style={[styles.smartScan, styles.smartScanTypo]}>{`Smart scan`}</Text>
      <Text style={[styles.capturezConvertissezEt, styles.prendreUnePhotoClr]}>
        Capturez, convertissez et gérez facilement vos factures avec Smart Scan.
        Prenez une photo, convertissez-la au format PDF et organisez tout en
        toute sécurité au même endroit.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Help')}>
        <Text style={[styles.help, styles.helpTypo]}>{`Help`}</Text>
      </TouchableOpacity>
      <Text style={[styles.prendreUnePhoto, styles.helpTypo]}>
        prendre une photo
      </Text>
      <View style={styles.container}>
        <Ionicons name="camera-outline" size={30} color="#ff9900" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewLayout: {
    height: 812,
    borderRadius: Border.br_11xl,
  },
  container: {
    top: 712,
    left: 60,
    position: "absolute",
  },
  smartScanTypo: {
    textAlign: "center",
    fontFamily: FontFamily.jostRegular,
    position: "absolute",
    color: "#ff9900",
    fontSize: 25,
  },
  prendreUnePhotoClr: {
    color: Color.colorBlack,
    fontFamily: "Helvetica",
    fontSize: 18,
  },
  helpTypo: {
    fontFamily: FontFamily.montserratRegular,
    textAlign: "center",
    position: "absolute",
    color: "white",
  },
  adaee0ecdde0cd3ef4995fb04dfda7Icon: {
    top: -20,
    left: -23,
    borderRadius: 65,
    width: 408,
    height: 400,
    position: "absolute",
  },
  badb634985775ab28d9d515ac: {
    top: 0,
    left: 0,
    width: 375,
    position: "absolute",
  },
  smartScan: {
    top: 393,
    left: 94,
    fontSize: FontSize.size_13xl,
    color: "#ff9900",
    width: 174,
    height: 67,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 7,
  },
  capturezConvertissezEt: {
    top: 473,
    left: 50,
    width: 260,
    textAlign: "center",
    position: "absolute",
    fontStyle: "normal",
  },
  help: {
    top: 40,
    left: 300,
    fontSize: FontSize.size_xl,
    color: Color.shadesWhite,
    width: 85,
    height: 19,
  },
  prendreUnePhoto: {
    top: 706,
    left: 95,
    width: 226,
    height: 53,
    color: Color.colorBlack,
    fontSize: FontSize.size_6xl,
    fontSize: 25,
  },
  view: {
    backgroundColor: Color.shadesWhite,
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
});

export default Home;
