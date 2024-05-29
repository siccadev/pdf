import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { PDFDocument, rgb } from 'react-native-pdf-lib';

const PdfEditor = () => {
      const [pdfContent, setPdfContent] = useState('');
      const [editedContent, setEditedContent] = useState('');

      const handleUpload = async () => {
            try {
                const result = await DocumentPicker.getDocumentAsync({
                    type: 'application/pdf', // specify the MIME type for PDF files
                });
                console.log('DocumentPicker result:', result); // Log the result object
                if (result.type === 'success') {
                    const { uri } = result;
                    console.log('Selected PDF URI:', uri); // Log the URI
                    const pdfBytes = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                    console.log('PDF bytes:', pdfBytes); // Log the PDF bytes
                    // Rest of your code
                }
            } catch (err) {
                console.log('Error in handleUpload:', err); // Log any errors
            }
        };
        

      const extractTextFromPDF = async (pdfDoc) => {
            let text = '';
            const pages = pdfDoc.getPages();
            for (const page of pages) {
                  const { textContent } = await page.getTextContent();
                  text += textContent.items.map((item) => item.str).join(' ');
            }
            return text;
      };

      const handleDownload = async () => {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();
            page.drawText(editedContent, {
                  x: 50,
                  y: 700,
                  size: 12,
                  color: rgb(0, 0, 0),
            });
            const pdfBytes = await pdfDoc.save();
            const path = `${FileSystem.documentDirectory}/edited.pdf`;
            await FileSystem.writeAsStringAsync(path, pdfBytes, { encoding: FileSystem.EncodingType.Base64 });
            Alert.alert('PDF saved', `PDF saved to ${path}`);
      };

      return (
            <ScrollView contentContainerStyle={styles.container}>
                  <Button title="Upload PDF" onPress={handleUpload} />
                  {pdfContent ? (
                        <>
                              <Text style={styles.label}>PDF Content:</Text>
                              <TextInput
                                    style={styles.textInput}
                                    multiline
                                    value={editedContent}
                                    onChangeText={setEditedContent}
                              />
                              <Button title="Download Edited PDF" onPress={handleDownload} />
                        </>
                  ) : (
                        <Text>No PDF uploaded</Text>
                  )}
            </ScrollView>
      );
};

const styles = StyleSheet.create({
      container: {
            flexGrow: 1,
            padding: 16,
            alignItems: 'center',
            justifyContent: 'center',
      },
      label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 8,
      },
      textInput: {
            width: '100%',
            height: 200,
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 8,
            marginVertical: 8,
      },
});

export default PdfEditor;