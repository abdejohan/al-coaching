import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Headline, Paragraph } from "../typography";

interface InformationProps {
	navigation?: any;
}

const Information: React.FC<InformationProps> = ({ navigation }) => {
	const { colors, roundness } = useTheme();

	return (
		<View
			style={[
				styles.container,
				{ borderRadius: roundness, backgroundColor: colors.surface },
			]}>
			<Headline>Information</Headline>
			<Paragraph>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore. Det dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore.
			</Paragraph>
			<Paragraph>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore. Det dolore magna aliqua. Ut enim ad minim veniam, quis
				nostrud. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore.
			</Paragraph>
		</View>
	);
};

export default Information;

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
