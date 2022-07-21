import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = useState(false);
	const [initialRoute, setInitialRoute] = useState<string>("Intro");

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync();

				// Load fonts
				await Font.loadAsync({
					...FontAwesome.font,
					"space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
					"ubuntu-regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
					"ubuntu-italic": require("../assets/fonts/Ubuntu-Italic.ttf"),
					"ubuntu-light": require("../assets/fonts/Ubuntu-Light.ttf"),
					"ubuntu-light-italic": require("../assets/fonts/Ubuntu-LightItalic.ttf"),
					"ubuntu-medium": require("../assets/fonts/Ubuntu-Medium.ttf"),
					"ubuntu-medium-italic": require("../assets/fonts/Ubuntu-MediumItalic.ttf"),
					"ubuntu-bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
					"ubuntu-bold-italic": require("../assets/fonts/Ubuntu-BoldItalic.ttf"),
				});
				// Set the initial Route for the navigation, if the user has seen intro the initial route is "Login"
				const seenIntroValue = await AsyncStorage.getItem("seenIntro");
				if (seenIntroValue === "true") {
					setInitialRoute("Login");
				} else {
					setInitialRoute("Intro");
				}
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hideAsync();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return { isLoadingComplete, initialRoute };
}
