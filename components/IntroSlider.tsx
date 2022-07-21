import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, View, ImageBackground, Alert } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Button from "./common/Button";
import slider_background1 from "../assets/images/slider_background1.jpg";
import slider_background2 from "../assets/images/slider_background2.jpg";
import slider_background3 from "../assets/images/slider_background3.jpg";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Headline, Subheading } from "../typography";

interface SliderProps {
	navigation?: any;
}

const IntroSlider: React.FC<SliderProps> = ({ navigation }) => {
	const { colors } = useTheme();
	const slides = [
		{
			key: 1,
			title: "Din hälsoapp",
			text: `Du kommer inom 3 dagar ha erhållit ditt skräddarsydda kost och träningsschema i appen. Detta är personligt anpassat efter dig och dina behov och ska inte.`,
			image: slider_background1,
		},
		{
			key: 2,
			title: "Din hälsoapp",
			text: "Du kommer inom 3 dagar ha erhållit ditt skräddarsydda kost och träningsschema i appen. Detta är personligt anpassat efter dig och dina behov och ska inte.",
			image: slider_background2,
		},
		{
			key: 3,
			title: "Din hälsoapp",
			text: `Du kommer inom 3 dagar ha erhållit ditt skräddarsydda kost och träningsschema i appen. Detta är personligt anpassat efter dig och dina behov och ska inte.`,
			image: slider_background3,
		},
	];

	const renderItem = ({ item }: any) => {
		return (
			<View style={{ flex: 1, backgroundColor: colors.black }}>
				<ImageBackground style={styles.backgroundImage} source={item.image} />
				<View style={[styles.container, { backgroundColor: colors.darkfade }]}>
					<Headline style={{ color: colors.white, fontSize: 50, lineHeight: 50 }}>
						{item.title}
					</Headline>
					<Subheading style={{ color: colors.white, fontSize: 16, textAlign: "center" }}>
						{item.text}
					</Subheading>
				</View>
			</View>
		);
	};

	const introDone = async () => {
		try {
			await AsyncStorage.setItem("seenIntro", "true");
		} catch (e) {
			Alert.alert("something went wrong, try again later. :(");
		} finally {
			navigation.navigate("Start");
		}
	};

	return (
		<>
			<StatusBar style='light' />
			<AppIntroSlider
				onDone={introDone}
				bottomButton
				renderNextButton={() => <Button>Nästa</Button>}
				renderDoneButton={() => <Button>Påbörja resan!</Button>}
				renderItem={renderItem}
				dotStyle={{ backgroundColor: colors.neutral }}
				data={slides}
			/>
		</>
	);
};

export default IntroSlider;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 200,
	},
	backgroundImage: {
		position: "absolute",
		flex: 1,
		left: 0,
		top: 0,

		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});
