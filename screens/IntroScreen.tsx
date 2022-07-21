import {
	StyleSheet,
	Dimensions,
	View,
	ImageBackground,
	Linking,
	TouchableOpacity,
} from "react-native";
import login_background from "../assets/images/login_background.jpg";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import Button from "../components/common/Button";
import Constants from "expo-constants";
import { Headline, Text } from "../typography";
interface IntroProps {
	navigation: any;
}

const IntroScreen: React.FC<IntroProps> = ({ navigation }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<StatusBar style='light' />
			<ImageBackground source={login_background} style={{ flex: 1 }}>
				<View style={[styles.innerContainer, { backgroundColor: colors.darkestfade }]}>
					<Headline
						style={{
							color: colors.white,
							fontSize: 50,
							lineHeight: 50,
						}}>
						Vägen mot en hälsosam livsstil
					</Headline>
					<Headline
						style={{
							color: colors.white,
							fontFamily: "ubuntu-light",
							fontSize: 22,
							marginBottom: 20,
						}}>
						Tillsammans når vi de träningsmål du inte trodde var möjliga
					</Headline>
					<Button
						onPress={() => navigation.navigate("Login")}
						style={{ marginBottom: 10 }}>
						Logga in
					</Button>
					<TouchableOpacity
						onPress={() => Linking.openURL(Constants!.manifest!.extra!.apiUrl)}
						style={{ padding: 10 }}>
						<Text style={{ color: colors.white, textAlign: "center" }}>
							Ansök om coaching
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
};

export default IntroScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		justifyContent: "flex-end",
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
		paddingBottom: 50,
		flex: 1,
		padding: 20,
		justifyContent: "flex-end",
	},
});
