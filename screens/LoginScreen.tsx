import React, { useContext, useEffect } from "react";
import { StyleSheet, ImageBackground, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import login_background from "../assets/images/login_background.jpg";
import AuthContext from "../context/Auth";
import PasswordLogin from "../components/PasswordLogin";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
interface LoginProps {
	navigation: any;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
	const { token, isLoggingOut, user } = useContext(AuthContext);
	const { colors } = useTheme();

	useEffect(() => {
		if (token && user && !isLoggingOut) {
			navigation.reset({
				index: 0,
				routes: [{ name: "LoggedIn" }],
			});
		}
	}, [token, isLoggingOut, user]);

	return (
		<ImageBackground source={login_background} style={styles.backgroundImage}>
			<StatusBar style='light' />
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				enableOnAndroid
				style={{ backgroundColor: colors.darkestfade }}
				contentContainerStyle={styles.scrollContentContainer}>
				<PasswordLogin navigation={navigation} />
			</KeyboardAwareScrollView>
		</ImageBackground>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	scrollContentContainer: {
		justifyContent: "flex-end",
		flex: 1,
	},
	backgroundImage: {
		height: Dimensions.get("window").height + Constants.statusBarHeight,
	},
});
