import React, { ReactElement } from "react";
import { View, TextStyle } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";

interface ListItemProps {
	id?: string;
	listItemStyle?: TextStyle;
	title: string;
	titleStyle?: TextStyle;
	onPress?: () => void;
	rightIcon?: ReactElement;
	right?: any;
}

const ListItem: React.FC<ListItemProps> = (props) => {
	const { colors, roundness } = useTheme();
	const { listItemStyle, titleStyle } = props;

	return (
		<View
			style={{
				borderRadius: roundness,
				backgroundColor: colors.surface,
				width: "100%",
				marginBottom: 10,
				height: 64,
			}}>
			<List.Item
				borderless
				style={{
					backgroundColor: colors.surface,
					borderRadius: roundness,
					...listItemStyle,
				}}
				titleStyle={[
					{
						fontSize: 16,
						color: colors.highlightText,
						fontFamily: "ubuntu-medium",
						...titleStyle,
					},
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
				{...props}
			/>
		</View>
	);
};

export default ListItem;
