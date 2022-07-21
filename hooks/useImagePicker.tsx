import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

type Aspect = [number, number];

export const useImagePicker = () => {
	const pickImage = async (setAspect: Aspect = [1, 1]) => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Sorry, we need library permissions to make this work!");
			}
		}
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
	};

	const pickMedia = async (setAspect: Aspect = [1, 1]) => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Sorry, we need library permissions to make this work!");
			}
		}
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
	};

	const takeImage = async (setAspect: Aspect = [1, 1]) => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Sorry, we need camera roll permissions to make this work!");
			}
		}
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
	};

	return { pickImage, takeImage, pickMedia };
};
