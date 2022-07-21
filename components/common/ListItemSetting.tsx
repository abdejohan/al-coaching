import React, { ReactElement } from "react";
import { View, StyleSheet, TextStyle } from "react-native";
import { List, useTheme } from "react-native-paper";

interface ListItemProps {
	id?: string;
	listItemStyle?: TextStyle;
	title: string;
	titleStyle?: TextStyle;
	description?: () => ReactElement | string;
	descriptionStyle?: TextStyle;
	iconStyle?: TextStyle;
	onPress?: () => void;
	left?: any;
	leftIcon?: ReactElement;
	rightIcon?: ReactElement;
	right?: any;
	displayDivider?: boolean;
}

const ListItemSetting: React.FC<ListItemProps> = (props) => {
	const { colors, roundness } = useTheme();
	const {
		// id,
		listItemStyle,
		title,
		description,
		leftIcon,
		rightIcon,
		descriptionStyle,
		onPress,
		titleStyle,
		iconStyle,
		displayDivider = true,
	} = props;

	return (
		<View
			style={[
				styles.container,
				{ borderRadius: roundness, backgroundColor: colors.surface },
			]}>
			<List.Item
				borderless
				style={[
					styles.listItem,
					listItemStyle,
					{
						borderRadius: roundness,
					},
				]}
				titleStyle={[
					{ fontSize: 16, color: colors.highlightText, fontFamily: "ubuntu-medium" },
					titleStyle,
				]}
				descriptionStyle={[{ color: colors.text, fontSize: 16 }, descriptionStyle]}
				description={description}
				onPress={onPress}
				right={() => <View style={{ justifyContent: "center" }}>{rightIcon}</View>}
				left={() => (
					<>
						{leftIcon ? (
							<View
								style={[
									styles.leftIcon,
									{
										backgroundColor: colors.onSurface,

										borderRadius: roundness,
									},
								]}>
								{leftIcon}
							</View>
						) : null}
					</>
				)}
				{...props}
			/>
		</View>
	);
};

export default ListItemSetting;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 64,
		marginBottom: 10,
	},
	listItem: {
		height: 64,
		justifyContent: "center",
		padding: 0,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	leftIcon: {
		alignItems: "center",
		justifyContent: "center",
		width: 44,
		height: 44,
		padding: 10,
		marginRight: 5,
	},
});
