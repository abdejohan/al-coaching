import React, { useContext, useEffect } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import login_background from "../assets/images/login_background.jpg";
import AuthContext from "../context/Auth";
import PasswordLogin from "../components/PasswordLogin";

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
		<View style={styles.container}>
			<StatusBar style='light' />
			<ImageBackground source={login_background} style={styles.backgroundImage}>
				<View style={[styles.innerContainer, { backgroundColor: colors.darkfade }]}>
					<KeyboardAwareScrollView
						contentContainerStyle={{
							justifyContent: "flex-end",
							flex: 1,
							paddingHorizontal: 20,
							marginBottom: 50,
						}}>
						<PasswordLogin navigation={navigation} />
					</KeyboardAwareScrollView>
				</View>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "black",
	},
	backgroundImage: {
		flex: 1,
		left: 0,
		top: 0,
		resizeMode: "cover",
	},
	title: {
		fontSize: 34,
		fontWeight: "bold",
		paddingTop: 10,
		color: "white",
	},
	text: {
		color: "white",
		fontSize: 16,
	},
	innerContainer: {
		flex: 1,
	},
});
