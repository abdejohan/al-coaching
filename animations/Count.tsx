import React, { useEffect } from "react";
import { Easing, TextInput, Animated, StyleSheet, TextStyle } from "react-native";

const CountInput = Animated.createAnimatedComponent(TextInput);

interface CountProps {
	stop: number;
	duration?: number;
	delay?: number;
	start?: number;
	decimal?: boolean;
	textColor?: any;
	style?: TextStyle;
}

const Count: React.FC<CountProps> = (props) => {
	const {
		stop = 0,
		duration = 800,
		delay = 0,
		style,
		start = 0,
		decimal = false,
	} = props;
	const animated = React.useRef(new Animated.Value(start)).current;
	const inputRef = React.useRef<any>();

	const animation = (toValue: number) => {
		return Animated.timing(animated, {
			delay,
			toValue,
			duration,
			useNativeDriver: true,
			easing: Easing.out(Easing.ease),
		}).start(() => {
			//animation(toValue === 0 ? stop : 0);
		});
	};

	useEffect(() => {
		animation(stop);
		animated.addListener((v) => {
			if (inputRef?.current) {
				inputRef.current.setNativeProps({
					text: `${decimal ? Math.round(v.value * 10) / 10 : Math.round(v.value)}`,
				});
			}
		});

		return () => {
			animated.removeAllListeners();
		};
	}, [stop]);

	return (
		<CountInput
			ref={inputRef}
			textAlign={"right"}
			underlineColorAndroid='transparent'
			editable={false}
			defaultValue='0'
			style={[styles.text, { ...style }]}
		/>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: "ubuntu-medium",
		textAlign: "center",
	},
});

export default Count;
