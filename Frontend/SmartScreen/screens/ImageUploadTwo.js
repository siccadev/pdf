import React, { useState, useEffect } from "react"
import { ActivityIndicator, TouchableOpacity, Image, View, Text, StyleSheet } from "react-native"
import * as ImagePicker from "expo-image-picker"
import axios from "axios"
import { FontAwesome } from '@expo/vector-icons';
const cloudName = "db2yjlbsw"
const uploadPreset = "lzoc60oh"

const ImageUploadTwo = ({ changeImage }) => {
  const [selectedImg, setSelectedImg] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (selectedImg) {
      setUploading(false)
    }
  }, [selectedImg])

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.cancelled) {
      setUploading(true)
      uploadToCloudinary(result.assets[0].uri)
    }
  };

  const handleCameraLaunch = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setUploading(true)
      uploadToCloudinary(result.assets[0].uri)
    }
  };

  const uploadToCloudinary = async (uri) => {
    try {
      const data = new FormData();
      data.append("file", { uri, type: "image/jpeg", name: "image.jpg" })
      data.append("upload_preset", uploadPreset)
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        const cloudinaryUrl = response.data.secure_url
        changeImage(cloudinaryUrl)
        setSelectedImg(cloudinaryUrl)
        console.log("selected image (upload)", cloudinaryUrl)
      } else {
        console.error("Error uploading image to Cloudinary. Response:", response)
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error)
      console.error("Error details:", error.response.data)
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 30 }}>
      {uploading && <ActivityIndicator size="large" color="#4CAF50" />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButtonFolder} onPress={openImagePicker}>
            
          <Image source={require('../assets/image-gallery.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.customButtonCamera} onPress={handleCameraLaunch}>
          <Image source={require('../assets/camera.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 3,
    alignItems: "center"
  },
  customButtonCamera: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000', // Button background color
    borderRadius: 10,
    width: 50, // Adjust button width as needed
    height: 40,
    paddingHorizontal: 10,
    marginLeft: 20
  },
  customButtonFolder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0000', // Button background color
    borderRadius: 30,
    width: 1, // Adjust button width as needed
    height:1,
    paddingHorizontal: 10
  },
  buttonImage: {
    width: 40, // Adjust image width as needed
    height: 60, // Adjust image height as needed
    resizeMode: 'contain',
  },
});

export default ImageUploadTwo