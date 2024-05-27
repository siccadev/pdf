import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageUploadTwo from './ImageUploadTwo';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

const MessageCard = ({ id, primary, secondary, person, imageUrl, comments, onDelete, onComment }) => {
  const [newComment, setNewComment] = useState('');
  
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      onComment(id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <View style={styles.messageCard}>
      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png" }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.primaryText}>{primary}</Text>
        <Text style={styles.secondaryText}>{secondary}</Text>
        {imageUrl && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.messageImage} />
          </View>
        )}
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsText}>Comments:</Text>

          {comments.map((comment, index) => (
            <Text key={`${id}_${index}`} style={styles.commentText}>{comment}</Text>
          ))}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
              <Feather name="send" size={20} color="#fff"  />
            </TouchableOpacity>
          </View>
        </View>
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
    if (inputValue.trim() !== '') {
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
    }
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
  };

  const handleComment = (id, comment) => {
    const updatedMessages = messages.map(message => {
      if (message.id === id) {
        return {
          ...message,
          comments: [...message.comments, comment],
        };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const handleChangeImage = (url) => {
    setImageUrl(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map(message => (
          <MessageCard
            key={message.id}
            {...message}
            onDelete={handleDeleteMessage}
            onComment={handleComment}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <ImageUploadTwo changeImage={handleChangeImage} />
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePostMessage}>
  
         < Feather name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
     
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
  marginTop:60
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginTop:-280
  },
  messageContent: {
    flex: 1,
  },
  primaryText: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
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
  commentsContainer: {
    marginTop: 10,
  },
  commentsText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  commentText: {
    marginBottom: 5,
    fontSize: 12,
    color: '#666',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  addCommentButton: {
    backgroundColor:'#209FA6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
marginRight:30,

    borderTopColor: '#ccc',
    backgroundColor: 'rgba(240, 240, 240, 0.5)'
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    width:10
  },
  postButton: {
    backgroundColor: '#209FA6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomAppBar;