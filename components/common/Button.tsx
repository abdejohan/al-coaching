import { TextStyle } from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper";

interface ButtonProps {
	children: any;
	uppercase?: boolean;
	disable?: boolean;
	mode?: "text" | "outlined" | "contained" | undefined;
	style?: TextStyle;
	onPress?: any;
	loading?: boolean;
	color?: string;
	backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
	const {
		children,
		style,
		mode = "text",
		uppercase = false,
		disable = false,
		onPress,
		loading = false,
		backgroundColor,
		color,
	} = props;
	const { colors } = useTheme();

	return (
		<PaperButton
			uppercase={uppercase}
			mode={mode}
			disabled={false}
			loading={loading}
			onPress={disable ? null : onPress}
			color={color ? color : colors.white}
			style={{
				marginBottom: 20,
				backgroundColor: !disable ? backgroundColor ?? colors.primary : "grey",
				...style,
			}}
			contentStyle={{ margin: 5 }}
			labelStyle={{ fontSize: 18 }}>
			{children}
		</PaperButton>
	);
};

export default Button;
