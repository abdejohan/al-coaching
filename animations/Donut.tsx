import React, { useEffect } from "react";
import { Easing, Animated, View, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

interface DonutProps {
	percentage: number;
	radius: number;
	strokeWidth?: number;
	duration?: number;
	color?: any;
	delay?: number;
	children?: any;
	max?: number;
}

const Donut: React.FC<DonutProps> = (props) => {
	const {
		percentage = 0,
		radius = 100,
		strokeWidth = 10,
		duration = 800,
		color = "tomato",
		delay = 0,
		children,
		max = 100,
	} = props;
	const animated = React.useRef(new Animated.Value(0)).current;
	const circleRef = React.useRef<any>();
	const circumference = 2 * Math.PI * radius;
	const halfCircle = radius + strokeWidth;

	const animation = (toValue: number) => {
		return Animated.timing(animated, {
			delay,
			toValue,
			duration,
			useNativeDriver: true,
			easing: Easing.inOut(Easing.ease),
		}).start(() => {
			//animation(toValue === 0 ? percentage : 0);
		});
	};

	useEffect(() => {
		animation(percentage);
		animated.addListener((v) => {
			const maxPerc = (100 * v.value) / max;
			const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
			if (circleRef?.current) {
				circleRef.current.setNativeProps({
					strokeDashoffset,
				});
			}
		});

		return () => {
			animated.removeAllListeners();
		};
	}, [max, percentage]);

	return (
		<View style={{ width: radius * 2, height: radius * 2 }}>
			<Svg
				height={radius * 2}
				width={radius * 2}
				viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
				<G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
					<Circle
						ref={circleRef}
						cx='50%'
						cy='50%'
						r={radius}
						fill='transparent'
						stroke={color}
						strokeWidth={strokeWidth}
						strokeLinecap='round'
						strokeDashoffset={circumference}
						strokeDasharray={circumference}
					/>
					<Circle
						cx='50%'
						cy='50%'
						r={radius}
						fill='transparent'
						stroke={color}
						strokeWidth={strokeWidth}
						strokeLinejoin='round'
						strokeOpacity='.1'
					/>
				</G>
			</Svg>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	text: { fontWeight: "900", textAlign: "center" },
});

export default Donut;
