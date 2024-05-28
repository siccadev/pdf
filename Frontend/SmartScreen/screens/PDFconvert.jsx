import React, { useState } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Pdf from 'react-native-pdf';

const PDFconvert = () => {
  const [pdfUri, setPdfUri] = useState(null);

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (res.type === 'success') {
        let fileUri = res.uri;

        if (Platform.OS === 'ios') {
          const destPath = `${FileSystem.documentDirectory}${res.name}`;
          await FileSystem.copyAsync({
            from: res.uri,
            to: destPath,
          });
          fileUri = destPath;
        }

        setPdfUri(fileUri);
      }
    } catch (err) {
      console.error('Unknown error: ', err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select PDF" onPress={handleDocumentPick} />
      {pdfUri && (
        <Pdf
          source={{ uri: pdfUri }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.error(error);
          }}
          style={styles.pdf}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default PDFconvert;
