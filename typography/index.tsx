import React from "react";
import { TextStyle } from "react-native";
import { Text as PaperText } from "react-native-paper";

interface TypographyProps {
	onPress?: () => {};
	children: any;
	style?: TextStyle;
}

const Headline: React.FC<TypographyProps> = (props) => {
	const { children, style } = props;

	return (
		<Text
			style={{
				fontSize: 22,
				lineHeight: 26,
				letterSpacing: -1,
				fontFamily: "ubuntu-medium",
				...style,
			}}>
			{children}
		</Text>
	);
};

const Subheading: React.FC<TypographyProps> = (props) => {
	const { children, style } = props;

	return (
		<Text
			style={{
				lineHeight: 18,
				fontSize: 14,
				fontFamily: "ubuntu-light",
				...style,
			}}>
			{children}
		</Text>
	);
};

const Title: React.FC<TypographyProps> = (props) => {
	const { children, style } = props;

	return (
		<Text
			style={{
				fontFamily: "ubuntu-medium",
				fontSize: 16,
				lineHeight: 20,
				...style,
			}}>
			{children}
		</Text>
	);
};

const Paragraph: React.FC<TypographyProps> = (props) => {
	const { children, style } = props;

	return (
		<Text
			style={{
				fontSize: 14,
				lineHeight: 18,
				fontFamily: "ubuntu-regular",
				...style,
			}}>
			{children}
		</Text>
	);
};

const Caption: React.FC<TypographyProps> = (props) => {
	const { children, style } = props;

	return (
		<Text
			style={{
				fontSize: 10,
				lineHeight: 10,
				fontFamily: "ubuntu-light",
				...style,
			}}>
			{children}
		</Text>
	);
};

const Text: React.FC<TypographyProps> = (props) => {
	const { children, style } = props;

	return (
		<PaperText
			style={{
				fontFamily: "ubuntu-regular",
				...style,
			}}>
			{children}
		</PaperText>
	);
};

export { Headline, Subheading, Title, Paragraph, Text, Caption };
