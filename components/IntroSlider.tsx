import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
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

const slides = [
	{
		key: 1,
		title: "Varmt välkommen",
		text: "Bra där, ditt första steg mot ett hälsosammare liv. Dagen innan du börjar kommer du erhålla dina upplägg.",
		image: slider_background1,
	},
	{
		key: 2,
		title: "Du är viktig",
		text: "Dina upplägg byggs i samråd med dig och de svar du angivit vid hälsodelegationen.",
		image: slider_background2,
	},
	{
		key: 3,
		title: "En investering för livet",
		text: "Var smart nu, använd mig. Ställ frågor och bruka din tid väl.",
		image: slider_background3,
	},
];

const IntroSlider: React.FC<SliderProps> = ({ navigation }) => {
	const { colors } = useTheme();

	const renderItem = ({ item }: any) => {
		return (
			<ImageBackground style={{ flex: 1 }} source={item.image}>
				<View style={[styles.container, { backgroundColor: colors.darkestfade }]}>
					<Headline
						style={{
							color: colors.white,
							fontSize: 50,
							lineHeight: 50,
							textAlign: "center",
						}}>
						{item.title}
					</Headline>
					<Subheading
						style={{
							color: colors.white,
							fontSize: 16,
							textAlign: "center",
							paddingHorizontal: 40,
						}}>
						{item.text}
					</Subheading>
				</View>
			</ImageBackground>
		);
	};

	const introDone = async () => {
		try {
			await AsyncStorage.setItem("SEEN_INTRO", "true");
		} catch (e) {
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
		paddingHorizontal: 20,
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 200,
	},
});
