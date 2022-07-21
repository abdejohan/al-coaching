import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Subheading } from "../../typography";

interface RadioButtonProps {
	value: string;
	onPress: () => void;
	status: string;
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
	const { colors, roundness } = useTheme();
	const { value, onPress, status } = props;
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{ backgroundColor: status === value ? colors.primary : colors.surface },
			]}
			onPress={onPress}>
			<View
				style={[
					styles.circle,
					{
						backgroundColor: status === value ? colors.white : colors.background,
						borderColor: colors.background,
						borderRadius: roundness,
					},
				]}
			/>
			<Subheading
				style={{ color: status === value ? colors.white : colors.highlightText }}>
				{value}
			</Subheading>
		</TouchableOpacity>
	);
};

export default RadioButton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		height: 64,
		marginBottom: 7,
		flexDirection: "row",
		borderRadius: 5,
		alignItems: "center",
	},
	circle: {
		width: 20,
		height: 20,
		borderWidth: 3,
		marginRight: 10,
	},
});
