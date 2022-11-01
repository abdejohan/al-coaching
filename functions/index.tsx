//import { ref, uploadBytes, deleteObject } from "firebase/storage";
//import dayjs from "dayjs";
//import { storage } from "../firebase";
import { Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

// arg1: image uri taken with expo-image-picker
// arg2: directory name where the image will be stored (we use the user email adress)
// 1. Get blob from image uri
// 2a. Create a firebase storage reference
// 2b. Generate a timestamp for the file name
// 3. Upload blob and return filename
/*
const uploadChatImageAsync = async (imageUri: string, userEmail: string) => {
	let filename: string = "";

	try {
		const blob: any = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", imageUri, true);
			xhr.send(null);
		});
		const storageRef = ref(
			storage,
			`chat/images/${userEmail}/${dayjs().format("YY-MM-DD_H:mm:ss")}.jpg`
		);
		await uploadBytes(storageRef, blob).then((snapshot) => {
			filename = snapshot.metadata.name;
		});
		blob.close();
		return filename;
	} catch (error) {
		return null;
	}
};

const uploadAvatarImageAsync = async (imageUri: string, userEmail: string) => {
	let filename: string = "";

	try {
		const blob: any = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", imageUri, true);
			xhr.send(null);
		});
		const storageRef = ref(storage, `avatars/${userEmail.split(".")[0]}.jpg`);
		await uploadBytes(storageRef, blob).then((snapshot) => {
			filename = snapshot.metadata.name;
		});
		blob.close();
		return filename;
	} catch (error) {
		return null;
	}
};

// Create a reference to the file to delete
const deleteAvatarImage = (userEmail: string) => {
	const desertRef = ref(storage, `avatars/${userEmail.split(".")[0]}.jpg`);

	// Delete the file
	deleteObject(desertRef)
		.then(() => {
			// File deleted successfully
		})
		.catch((error) => Alert.alert(error));

	return null;
};
 */

const pickImageIOS = async () => {
	const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
	if (status === "granted") {
		const pickedImage = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
			base64: true,
		});

		if (!pickedImage.cancelled) {
			return pickedImage.base64;
		}
	} else {
		Alert.alert("Saknar tillgång till bilder. Ändra inställningar i mobilen.");
	}
};

const pickAvatarIOS = async () => {
	const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
	if (status === "granted") {
		const pickedImage = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
			base64: true,
		});

		if (!pickedImage.cancelled) {
			return pickedImage.base64;
		}
	} else {
		Alert.alert("Saknar tillgång till bilder. Ändra inställningar i mobilen.");
	}
};

const pickDocument = async () => {
	let pickedImage = await DocumentPicker.getDocumentAsync({
		type: "image/*",
	});

	const manipulatedImageResult = await manipulateAsync(
		// @ts-ignore
		pickedImage.uri,
		[{ resize: {} }],
		{ base64: true, compress: 1, format: SaveFormat.PNG }
	);

	return manipulatedImageResult.base64;
};

const pickAvatarDocument = async () => {
	let pickedImage = await DocumentPicker.getDocumentAsync({
		type: "image/*",
	});

	const manipulatedImageResult = await manipulateAsync(
		// @ts-ignore
		pickedImage.uri,
		[{ resize: {} }],
		{ base64: true, compress: 1, format: SaveFormat.PNG }
	);

	return manipulatedImageResult.base64;
};

export {
	/*
	uploadChatImageAsync, 
	uploadAvatarImageAsync, 
	deleteAvatarImage, 
	*/
	pickImageIOS,
	pickAvatarIOS,
	pickDocument,
	pickAvatarDocument,
};
