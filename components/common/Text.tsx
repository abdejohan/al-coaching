import { useTheme } from "react-native-paper";
import { Text as RNText, TextStyle } from "react-native";

interface TextProps {
	type?: string;
	customStyle?: TextStyle;
}

const Text: React.FC<TextProps> = (props) => {
	const { children, type, customStyle } = props;
	const theme = useTheme();
	var typeFontSize = 16;
	///---- Set the type of sizes you want
	if (type === "small") {
		typeFontSize = 14;
	}
	if (type === "title") {
		typeFontSize = 20;
	}
	if (type === "big-title") {
		typeFontSize = 50;
	}
	///-----------------------------------
	return (
		<RNText
			style={[
				{
					fontFamily: "ubuntu-regular",
					fontSize: typeFontSize,
					color: theme.colors.text,
				},
				customStyle,
			]}
			{...props}>
			{children}
		</RNText>
	);
};

export default Text;
