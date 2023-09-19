import React, { useEffect, useState, useRef } from "react";

import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { Icon } from "react-native-elements";
import { InputComponent } from "../components/InputComponent";
import SelectDropdown from "react-native-select-dropdown";
import { categoryList } from "../../data/Data";
import realm from "../../store/realm";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen-hooks";

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

  const dropdownRef = useRef({})

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

  const saveData = () => {
    if(!isProductDataValid()){
      alert('Please fill all your product information!')
    } else if(isSellerContactNotValid()){
      alert('Please fill one of seller contact information!')
    } else{
      const allData = realm.objects('Product')
      const lastId = allData.length === 0 ? 0 : allData[allData.length - 1].id

      realm.write(()=>{
        realm.create('Product', {
          id: lastId + 1,
          productName: productData.productName,
          imagePath: productData.imagePath,
          category: productData.category,
          description: productData.description,
          price: parseInt(productData.price),
          instagram: productData.instagram,
          facebook: productData.facebook,
          phoneNumber: productData.phoneNumber
        })
      })

      setProductData({
        productName: "",
        imagePath: "",
        category: null,
        description: "",
        price: null,
        instagram: "",
        facebook: "",
        phoneNumber: "",
      })

      dropdownRef.current.reset();

      console.log(realm.objects('Product'))
    }
  }

  const isProductDataValid = () =>{
    return productData.productName !== '' && productData.imagePath !== '' && productData.price !== null && productData.description !== '' && productData.category !== null
  }

  const isSellerContactNotValid = () => {
    return productData.instagram === "" && productData.facebook === "" && productData.phoneNumber === ""
  }

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
                <Image style={{ width: wp('50%'), height: wp('50%') }}
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
          <SelectDropdown data={categoryList}
                          onSelect={(item)=>{onInputChange('category', item.id)}}
                          defaultButtonText={'Select Category'}
                          buttonTextAfterSelection={(item)=>item.name}
                          rowTextForSelection={(item)=>item.name}
                          buttonStyle={styles.selectDropdown}
                          buttonTextStyle={styles.selectText}
                          ref={dropdownRef}

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
            onPress={()=>saveData()}
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
    width: wp('50%'),
height: wp('50%'),
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sellerText: {
    fontSize:hp('2.5%'),
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
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: 'skyblue',
    width: wp('40%'),
height: hp('4%'),
    marginLeft: 8
  },
  selectText: {
    fontSize: hp('1.5%'),
  }
});

export default AddProductScreen;
