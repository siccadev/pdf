import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color, FontSize, Border } from "./GlobalStyles";
import { useEffect } from "react"; // Import useEffect hook
import { useNavigation } from '@react-navigation/native';


const Launch = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Onbording');
        }, 5000);
        return () => clearTimeout(timer);
      }, []);
  return (
    <View style={styles.launch}>
      <Text style={[styles.smartScan, styles.smartScanTypo]}>Smart Scan</Text>
      <Text style={[styles.byEmnaHomrani, styles.byEmnaHomraniLayout]}>
        By Emna Homrani
      </Text>
      <Image
        style={[
          styles.d65cdf8f27a20fd0ab9be06227bb74Icon,
          styles.byEmnaHomraniLayout,
        ]}
        contentFit="cover"
        source={require("../assets/d65cdf8f27a20fd0ab9be06227bb74cbremovebgpreview-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  smartScanTypo: {
    textAlign: "left",
    fontFamily: FontFamily.amikoRegular,
  },
  byEmnaHomraniLayout: {
    width: 282,
    position: "absolute",
  },
  smartScan: {
    top: 238,
    left: 80,
    fontSize: 41,
    color: Color.colorBlack,
    width: 252,
    height: 92,
    position: "absolute",
    textAlign: "left",
    fontFamily: FontFamily.amikoRegular,
  },
  byEmnaHomrani: {
    top: 768,
    left: 125,
    fontSize: FontSize.size_base,
    color: Color.shadesWhite,
    textAlign: "left",
    fontFamily: FontFamily.amikoRegular,
  },
  d65cdf8f27a20fd0ab9be06227bb74Icon: {
    top: 282,
    left: 40,
    height: 174,
  },
  launch: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorDarkgoldenrod,
    width: 428,
    height: 812,
    overflow: "hidden",
    backgroundColor:"#AF6A00"

  },
});

export default Launch;