
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        Bienvenue dans l'application de gestion de factures! Cette application est conçue pour vous aider à capturer, gérer et valider vos factures de manière simple et sécurisée. Voici un guide détaillé pour vous aider à naviguer et à utiliser toutes les fonctionnalités de l'application.
        </Text>
      <View style={styles.container}>
    <Text style={styles.text2}>1. Capture de Factures{'\n\n'}
    <Text style={styles.text3}>Prendre une Photo: Utilisez la caméra de votre appareil mobile pour capturer une image claire de votre facture.
Accéder à la Galerie: Vous pouvez également sélectionner une photo existante de votre galerie.
</Text>
        

</Text>
<Text ></Text>
 </View>
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top:40,
    width:340,
    left:20,
  },
  text1: {
    fontSize: 12,
  },
  text2:{
    fontWeight: 'bold',
    fontSize:15,
    width:330,
    left:-20,
    top:-30,
},
text3:{
    fontSize:12,
    top:20
}
    ,

});

export default Help;



