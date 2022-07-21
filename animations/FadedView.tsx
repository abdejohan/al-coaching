import React, { useEffect, useState } from "react";
import { Animated, TextStyle } from "react-native";

interface FadedViewProps {
	delay?: number;
	display: boolean;
	duration?: number;
	style?: TextStyle;
	children?: any;
}

const FadedView: React.FC<FadedViewProps> = (props) => {
	const { delay = 0, duration = 500, style, children, display = false } = props;
	const [animation] = useState(new Animated.Value(0));

	useEffect(() => {
		if (display) {
			Animated.timing(animation, {
				delay,
				toValue: 1,
				useNativeDriver: true,
				duration,
			}).start();
		} else {
			Animated.timing(animation, {
				delay,
				toValue: 0,
				useNativeDriver: true,
				duration,
			}).start();
		}
	}, [display]);

	return (
		<Animated.View
			style={{
				opacity: animation,
				width: "100%",
				...style,
			}}>
			{children && display ? children : null}
		</Animated.View>
	);
};

export default FadedView;
