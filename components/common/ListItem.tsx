import React, { ReactElement } from "react";
import { View, StyleSheet, TextStyle } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";
import { Text } from "../../typography";

interface ListItemProps {
	id?: string;
	listItemStyle?: TextStyle;
	title: string;
	titleStyle?: TextStyle;
	description?: any;
	descriptionStyle?: TextStyle;
	icon?: string;
	onPress?: () => void;
	left?: any;
	leftIcon?: ReactElement;
	rightIcon?: ReactElement;
	right?: any;
	percentage?: number | string;
}

const ListItem: React.FC<ListItemProps> = (props) => {
	const { colors, roundness } = useTheme();
	const {
		// id,
		icon,
		listItemStyle,
		description,
		descriptionStyle,
		titleStyle,
		percentage,
	} = props;

	return (
		<View
			style={[
				styles.container,
				{
					borderRadius: roundness,
					backgroundColor: colors.surface,
				},
			]}>
			<List.Item
				borderless
				style={[
					styles.listItem,
					{ backgroundColor: colors.surface, borderRadius: roundness },
					listItemStyle,
				]}
				titleStyle={[
					{ fontSize: 16, color: colors.highlightText, fontFamily: "ubuntu-medium" },
					titleStyle,
				]}
				right={() => (
					<View
						style={{
							backgroundColor: colors.onSurface,
							padding: 15,
							width: 50,
							height: 50,
							justifyContent: "center",
							alignItems: "center",
							borderRadius: roundness,
						}}>
						<IconButton icon='arrow-right' size={18} color={colors.highlightText} />
					</View>
				)}
				descriptionStyle={[{ color: colors.text, fontSize: 16 }, descriptionStyle]}
				{...props}
				description={() => (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						{icon && (
							<IconButton
								size={13}
								icon={icon}
								color={colors.primary}
								style={{ margin: 0, marginLeft: -5 }}
							/>
						)}
						<Text>{description} </Text>
						{percentage && <Text style={{ opacity: 0.6 }}>{`(${percentage}%)`}</Text>}
					</View>
				)}
			/>
		</View>
	);
};

export default ListItem;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 10,
		height: 64,
	},
	date: {
		fontSize: 16,
		position: "absolute",
		marginLeft: 8,
		top: 13,
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
