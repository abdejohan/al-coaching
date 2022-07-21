import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Subheading } from "../../typography";

interface RadioButtonMultiProps {
	value: string;
	onPress: () => void;
	arrayOfValues: Array<string>;
}

const RadioButtonMulti: React.FC<RadioButtonMultiProps> = (props) => {
	const { colors, roundness } = useTheme();
	const { value, onPress, arrayOfValues } = props;
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: arrayOfValues.includes(value)
						? colors.primary
						: colors.surface,
				},
			]}
			onPress={onPress}>
			<View
				style={[
					styles.circle,
					{
						backgroundColor: arrayOfValues.includes(value)
							? colors.white
							: colors.background,
						borderColor: colors.background,
						borderRadius: roundness,
					},
				]}
			/>
			<Subheading
				style={{
					color: arrayOfValues.includes(value) ? colors.white : colors.highlightText,
				}}>
				{value}
			</Subheading>
		</TouchableOpacity>
	);
};

export default RadioButtonMulti;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		height: 64,
		flexDirection: "row",
		borderRadius: 5,
		marginBottom: 7,
		alignItems: "center",
	},
	circle: {
		width: 20,
		height: 20,
		borderWidth: 3,
		marginRight: 10,
	},
});
