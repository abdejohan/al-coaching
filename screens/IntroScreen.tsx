import {
	StyleSheet,
	View,
	ImageBackground,
	Linking,
	TouchableOpacity,
} from "react-native";
import login_background from "../assets/images/login_background.jpg";
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
		<View style={{ flex: 1 }}>
			<ImageBackground source={login_background} style={{ flex: 1 }}>
				<View style={[styles.innerContainer, { backgroundColor: colors.darkestfade }]}>
					<Headline style={{ color: colors.white, fontSize: 50, lineHeight: 50 }}>
						Vägen mot en hälsosam livsstil
					</Headline>
					<Headline style={{ color: colors.white, fontFamily: "ubuntu-light" }}>
						Tillsammans når vi de träningsmål du inte trodde var möjliga
					</Headline>
					<Button
						onPress={() => navigation.navigate("Login")}
						style={{ marginBottom: 10, marginTop: 20 }}>
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
	innerContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingBottom: 50,
		justifyContent: "flex-end",
	},
});
