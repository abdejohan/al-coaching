import React, { useState } from "react";
import {
	View,
	TextStyle,
	ReturnKeyType,
	KeyboardType,
	ViewStyle,
	Platform,
} from "react-native";
import { useTheme, TextInput } from "react-native-paper";
import { autoCapitalizeTypes, autoCompleteTypes, ValidInput } from "../types/types";
import { Headline, Text } from "../typography";

interface Props {
	inputLabel?: string;
	right?: any;
	validationContainerStyle?: ViewStyle;
	multiline?: boolean;
	value?: string;
	maxLength?: number;
	textAlign?: string;
	minHeight?: number;
	numberOfLines?: number | undefined;
	validationRule?: string;
	errorMessage?: string;
	blurOnSubmit?: boolean;
	returnKeyType?: ReturnKeyType;
	keyboardType?: KeyboardType;
	render?(props: any): Element;
	onSubmitEditing?: (event: { nativeEvent: { text: string } }) => void;
	onValidation?(isValid: boolean | boolean[], text: string): any;
	onChangeText?(value: string): string;
	autoCapitalize?: autoCapitalizeTypes;
	autoCorrect?: boolean;
	autoCompleteType?: autoCompleteTypes;
	autoComplete?: any;
	outlineColor?: any;
	left?: any;
	theme?: any;
	onFocus?: any;
	placeholder?: any;
	placeholderTextColor?: any;
	mode?: any;
	style?: TextStyle;
	activeOutlineColor?: any;
}

const InputValidation: React.FC<Props> = (props) => {
	const { colors } = useTheme();
	const {
		inputLabel,
		validationRule,
		onValidation,
		onChangeText,
		errorMessage,
		numberOfLines,
		right,
		validationContainerStyle,
	} = props;
	const [isValidated, setIsValidated] = useState<boolean>(false);
	const [interactedWithField, setInteractedWithField] = useState<boolean>(false);

	const regExRules = {
		name: "^.{2,}$", // min 2 char
		email: `^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$`,
		emailOrNull: `^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$|^$`,
		phone: `^\\+?((\\d\\-|\\d)+\\d){4,}$`,
		phoneOrNull: `^\\+?((\\d\\-|\\d)+\\d){4,}$|^$`,
		min5: "^.{5,}$", // min 8 char
		min40: "^.{40,}$", // min 40 char
		min1: "^.{1,}$", // min 1 char
		text: `(.|\n){1,}$`, // min 1 char
		onlyDigits: `^[0-9]+$`,
		weightOrHeight: `^[1-9]\\d*(\\.\\d+)?$`,
		null: "^$|",
	};

	// Tests the input against the RegEx string(s) provided
	const handleValidation = (value: string) => {
		if (!validationRule) return true;
		// string pattern, one validation rule
		if (Object.keys(regExRules).includes(validationRule)) {
			const condition = new RegExp(regExRules[validationRule], "g");
			return condition.test(value);
		}
		return true;
	};

	// this validates the input everytime the input is changed
	const onChange = (text: string) => {
		const isValid = handleValidation(text);
		setIsValidated(isValid);
		return (
			onValidation && onValidation(isValid, text), onChangeText && onChangeText(text)
		);
	};

	return (
		<View style={{ ...validationContainerStyle }}>
			{inputLabel && <Headline style={{ paddingLeft: 5 }}>{inputLabel}</Headline>}
			<TextInput
				mode='outlined'
				outlineColor={colors.background}
				numberOfLines={Platform.OS === "ios" ? undefined : numberOfLines}
				minHeight={
					Platform.OS === "ios" && numberOfLines ? 20 * numberOfLines : undefined
				}
				onBlur={() => setInteractedWithField(true)}
				underlineColor='transparent'
				onChangeText={(text) => onChange(text)}
				right={right}
				{...props}
				style={{ backgroundColor: colors.surface, ...props.style }}
			/>
			<View style={{ flexDirection: "row", minHeight: 14 }}>
				{validationRule && (
					<Text
						key={errorMessage}
						style={{
							paddingLeft: 5,
							color: interactedWithField
								? isValidated
									? "transparent"
									: colors.error
								: "transparent",
						}}>
						{`\u00B7 ${errorMessage}`}
					</Text>
				)}
			</View>
		</View>
	);
};
export default InputValidation;
