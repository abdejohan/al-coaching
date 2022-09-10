import React, { ReactElement, useEffect, useState } from "react";
import { View, StyleSheet, TextStyle } from "react-native";
import { List, useTheme, TextInput, IconButton } from "react-native-paper";
import { useDialog } from "../../hooks/useDialog";
import { Paragraph } from "../../typography";
interface ListItemProps {
	id?: string;
	listItemStyle?: TextStyle;
	title: string;
	titleStyle?: TextStyle;
	description?: (() => ReactElement) | string;
	descriptionStyle?: TextStyle;
	date?: string;
	dateStyle?: TextStyle;
	iconStyle?: TextStyle;
	onPress?: () => void;
	left?: any;
	leftIcon?: ReactElement;
	rightIcon?: ReactElement;
	repetitionPlaceholder?: string;
	weightPlaceholder?: string;
	right?: any;
	comment?: string;
	displayDivider?: boolean;
	weightsValue?: ((value: number) => number) | any;
	repetitionInput?: string;
	weightInput?: string;
	repetitionsValue?: ((value: number) => number) | any;
}

const ListItemInput: React.FC<ListItemProps> = (props) => {
	const {
		listItemStyle,
		description,
		comment,
		leftIcon,
		repetitionPlaceholder,
		weightPlaceholder,
		descriptionStyle,
		onPress,
		titleStyle,
		repetitionsValue,
		weightsValue,
	} = props;
	const [repetitionInput, setRepetitionInput] = useState<string>();
	const [weightInput, setWeightInput] = useState<string>();
	const { colors, roundness } = useTheme();
	const { DialogBox, showDialog } = useDialog();

	useEffect(() => {
		if (repetitionPlaceholder) {
			setRepetitionInput(repetitionPlaceholder);
		}
	}, [repetitionPlaceholder]);

	useEffect(() => {
		if (weightPlaceholder) {
			setWeightInput(weightPlaceholder);
		}
	}, [weightPlaceholder]);

	const setWeights = (value: string) => {
		weightsValue(value);
		setWeightInput(value);
	};

	const setRepetitions = (value: string) => {
		repetitionsValue(value);
		setRepetitionInput(value);
	};

	return (
		<View style={styles.container}>
			<List.Item
				style={[
					styles.listItem,
					{ borderRadius: roundness, backgroundColor: colors.surface },
					listItemStyle,
				]}
				titleStyle={[
					{
						marginLeft: -15,
						fontSize: 16,
						color: colors.highlightText,
						fontFamily: "ubuntu-medium",
					},
					titleStyle,
				]}
				descriptionStyle={[{ color: colors.text, fontSize: 14 }, descriptionStyle]}
				description={description}
				onPress={onPress}
				right={() => (
					<View
						style={{
							flexDirection: "row",
							alignItems: "flex-end",
							paddingBottom: 5,
							marginRight: -10,
						}}>
						<IconButton
							icon='information-outline'
							size={22}
							onPress={() => showDialog()}
							style={[
								styles.info,
								{
									borderRadius: roundness,
									backgroundColor: colors.onSurface,
								},
							]}
						/>
						<DialogBox>
							<Paragraph>{comment}</Paragraph>
						</DialogBox>
						<TextInput
							value={repetitionInput}
							mode='outlined'
							style={[
								styles.input,
								{ borderRadius: roundness, backgroundColor: colors.onSurface },
							]}
							outlineColor={colors.onSurface}
							onChangeText={(text) => setRepetitions(text)}
							textAlign='center'
							keyboardType='number-pad'
							maxLength={3}
						/>
						<TextInput
							value={weightInput}
							mode='outlined'
							style={[styles.input, { backgroundColor: colors.onSurface }]}
							outlineColor={colors.onSurface}
							onChangeText={(text) => setWeights(text)}
							textAlign='center'
							keyboardType='decimal-pad'
							maxLength={5}
						/>
					</View>
				)}
				left={() => (
					<>
						{leftIcon ? (
							<View
								style={[
									styles.leftIcon,
									{ borderRadius: roundness, backgroundColor: colors.onSurface },
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

export default ListItemInput;

const styles = StyleSheet.create({
	container: {
		width: "100%",
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
	info: {
		width: 45,
		height: 47,
		marginLeft: 2,
		margin: 0,
	},
	input: {
		width: 60,
		height: 45,
		marginLeft: 2,
		textAlign: "center",
	},
});
