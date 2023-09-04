import React, { useEffect, useState } from "react";

import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { Icon } from "react-native-elements";
import { InputComponent } from "../components/InputComponent";

const AddProductScreen = () => {

  const [productData, setProductData] = useState({
    productName: "",
    imagePath: "",
    category: null,
    description: "",
    price: null,
    instagram: "",
    facebook: "",
    phoneNumber: "",
  });

  const addImage = () => {
    ImagePicker.openPicker({
      width: 2000,
      height: 2000,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProductData({ ...productData, imagePath: image.path });
    }).catch(error => {
      console.log(error);
    });
  };

  const onInputChange = (type, value) => {
    setProductData({
      ...productData,
      [type]: value,
    });
  };

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={() => addImage()}>
            {
              productData.imagePath !== "" ?
                <Image style={{ width: 200, height: 200 }}
                       source={{ uri: productData.imagePath }} /> :
                <View>
                  <Icon name={"images"} type={"entypo"} />
                  <Text style={{ color: "grey" }}>Add Photo</Text>
                </View>
            }
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Product Name"
            value={productData.productName}
            onChangeText={(text) =>
              onInputChange("productName", text)}
          />
        </View>
        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Description"
            value={productData.description}
            onChangeText={(text) =>
              onInputChange("description", text)}
            isDescription={true}
          />
          <InputComponent
            placeholder="Price"
            value={productData.price}
            onChangeText={(text) =>
              onInputChange("price", text)}
            isIcon={true}
            name="dollar"
            type="font-awesome"
          />
        </View>
        <Text style={styles.sellerText}>Seller Contact</Text>
        <InputComponent
          placeholder='Whastapp number (ex : +4498739230)'
          value={productData.phoneNumber}
          onChangeText={(text) => onInputChange('phoneNumber', text)}
          isIcon={true}
          name="whatsapp"
          type="font-awesome"
          />
        <InputComponent
          placeholder='Instagram username (ex : timedooracademy)'
          value={productData.instagram}
          onChangeText={(text) => onInputChange('instagram', text)}
          isIcon={true}
          name="instagram"
          type="font-awesome"
          />
        <InputComponent
          placeholder='Facebook username (ex : timedooracademy)'
          value={productData.facebook}
          onChangeText={(text) => onInputChange('facebook', text)}
          isIcon={true}
          name="facebook-square"
          type="font-awesome"
          />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
          >
            <Text style={styles.saveText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  scroll: {
    margin: 8,
    paddingBottom: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  imageButton: {
    width: 200,
    height: 200,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sellerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 0,
    color: "black",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "mistyrose",
  },
  saveText: {
    color: "black",
  },
});

export default AddProductScreen;
