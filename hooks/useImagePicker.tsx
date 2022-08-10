import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

type Aspect = [number, number];

export const useImagePicker = () => {
	const pickImage = async (setAspect: Aspect = [1, 1]) => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status === "granted") {
				const pickedImage = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					base64: true,
					allowsEditing: true,
					aspect: setAspect,
					quality: 1,
				});

				if (!pickedImage.cancelled) {
					return pickedImage;
				}
			} else {
				Alert.alert(
					"Saknar tillgång till bibliotek. Ändra inställningar för AL Coaching i mobilen."
				);
			}
		}
	};

	const pickMedia = async (setAspect: Aspect = [1, 1]) => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status === "granted") {
				const pickedMedia = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.All,
					allowsEditing: false,
					base64: true,
					aspect: setAspect,
					quality: 1,
				});

				if (!pickedMedia.cancelled) {
					return pickedMedia;
				}
			} else {
				Alert.alert("Sorry, we need library permissions to make this work!");
			}
		}
	};

	const takeImage = async (setAspect: Aspect = [1, 1]) => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			if (status === "granted") {
				const takenImage = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					base64: true,
					allowsEditing: true,
					aspect: setAspect,
					quality: 1,
				});

				if (!takenImage.cancelled) {
					return takenImage;
				}
			} else {
				Alert.alert(
					"Saknar tillgång till bibliotek. Ändra inställningar för AL Coaching i mobilen."
				);
			}
		}
	};

	return { pickImage, takeImage, pickMedia };
};
