import { ref, uploadBytes, deleteObject } from "firebase/storage";
import dayjs from "dayjs";
import { storage } from "../firebase";
import { Alert } from "react-native";

// arg1: image uri taken with expo-image-picker
// arg2: directory name where the image will be stored (we use the user email adress)
// 1. Get blob from image uri
// 2a. Create a firebase storage reference
// 2b. Generate a timestamp for the file name
// 3. Upload blob and return filename
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

export { uploadChatImageAsync, uploadAvatarImageAsync, deleteAvatarImage };
