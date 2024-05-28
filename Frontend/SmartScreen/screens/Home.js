import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Image
        style={styles.image}
        contentFit="cover"
        source={require("../assets/4adaee0ecdde0cd3ef4995fb04dfda7d-1.png")}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.helpButton}>
        <Text style={styles.help}>Help</Text>
      </TouchableOpacity>
      <Text style={styles.smartScan}>{`Smart scan`}</Text>
      <Text style={styles.description}>
        Capturez, convertissez et gérez facilement vos factures avec Smart Scan.
        Prenez une photo, convertissez-la au format PDF et organisez tout en
        toute sécurité au même endroit.
      </Text>
      <TouchableOpacity 
        style={styles.photoButton}
        onPress={() => navigation.navigate('Message')}
      >
        <Ionicons name="star-outline" size={30} color="#ff9900" />
        <Text style={styles.takePhoto}>commencer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  image: {
    width: '115%',
    height: height * 0.5,
    borderRadius: 20,
    marginTop: height * 0.03,
  },
  helpButton: {
    position: "absolute",
    top: height * 0.05,
    right: width * 0.05,
  },
  help: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  smartScan: {
    marginTop: height * 0.02,
    fontSize: 25,
    color: "#ff9900",
    fontFamily: "Jost-Regular",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 7,
  },
  description: {
    marginTop: height * 0.02,
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    paddingHorizontal: width * 0.1,
    fontFamily: "Helvetica",
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.05,
  },
  takePhoto: {
    marginLeft: 10,
    fontSize: 18,
    color: "#ff9900",
  },
});

export default Home;
