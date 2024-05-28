import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, Dimensions, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageUploadTwo from './ImageUploadTwo';
import * as Print from 'expo-print';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

const MessageCard = ({ id, secondary, imageUrl, onDelete, onConvertToPDF }) => {
  return (
    <View style={styles.messageCard}>
      <View style={styles.messageContent}>
        <Text style={styles.secondaryText}>{secondary}</Text>
        {imageUrl && (
          <>
            <TouchableOpacity style={styles.imageContainer} onPress={() => Alert.alert('Image Clicked', 'Show full image functionality here')}>
              <Image source={{ uri: imageUrl }} style={styles.messageImage} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pdfButton} onPress={() => onConvertToPDF(imageUrl)}>
              <Text style={styles.pdfButtonText}>Convert to PDF</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Feather name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const BottomAppBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [messages, setMessages] = useState([]);
  const [pdfUri, setPdfUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('messages');
        if (storedMessages !== null) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages:', error);
      }
    };
    saveMessages();
  }, [messages]);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handlePostMessage = () => {
    if (imageUrl.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        primary: inputValue,
        secondary: 'New message',
        imageUrl: imageUrl,
        comments: [],
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue('');
      setImageUrl('');
      Alert.alert('Message Posted', 'Your message has been posted successfully.');
    } else {
      Alert.alert('No Image', 'Please upload an image to post a message.');
    }
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
  };

  const handleChangeImage = (url) => {
    setImageUrl(url);
  };

  const handleConvertToPDF = async (image) => {
    const htmlContent = `
      <html>
        <body style="text-align: center;">
          <img src="${image}" style="width: 100%; height: auto;" />
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      const fileUri = `${FileSystem.documentDirectory}converted.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri
      });
      setPdfUri(fileUri);
      setModalVisible(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'An error occurred while generating the PDF.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map(message => (
          <MessageCard
            key={message.id}
            {...message}
            onDelete={handleDeleteMessage}
            onConvertToPDF={handleConvertToPDF}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <ImageUploadTwo changeImage={handleChangeImage} />
        <TouchableOpacity style={styles.postButton} onPress={handlePostMessage}>
          <Feather name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          {pdfUri && (
            <WebView
              style={styles.webview}
              source={{ uri: pdfUri }}
              originWhitelist={['*']}
              allowFileAccess={true}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    flex: 1,
    marginTop: 60,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageContent: {
    flex: 1,
  },
  secondaryText: {
    marginBottom: 5,
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  messageImage: {
    width: '100%',
    height: 200,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopColor: '#ccc',
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
  },
  postButton: {
    backgroundColor: '#209FA6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  pdfButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  webview: {
    width: width - 40,
    height: height - 100,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BottomAppBar;
