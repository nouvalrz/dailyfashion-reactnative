import React from "react";
import ImageZoom from "react-native-image-pan-zoom";
import { Dimensions, View, StyleSheet, Image } from "react-native";

const ImageZoomScreen = (props) => {
  const { route } = props;
  const imagePath = route.params.imagePath;

  return (
    <View style={styles.mainContainer}>
      <ImageZoom
          cropWidth={Dimensions.get("window").width}
          cropHeight={Dimensions.get("window").height}
          imageHeight={Dimensions.get("window").width}
          imageWidth={Dimensions.get("window").width}>
        <Image style={styles.image} source={{uri: imagePath}}/>
      </ImageZoom>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ImageZoomScreen;
