import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Animated, TextStyle, Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";

interface ParallaxScrollViewProps {
	imageHeight?: number;
	imageSource: object;
	children: any;
	style?: TextStyle;
	contentContainerStyle?: TextStyle;
}

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = (props) => {
	const windowHeight = Dimensions.get("window").height;
	const { colors } = useTheme();
	const scrollAnimatedValue = new Animated.Value(0);
	const {
		children,
		style,
		contentContainerStyle,
		imageHeight = windowHeight / 3,
		imageSource,
	} = props;

	return (
		<>
			<Animated.Image
				source={imageSource}
				style={[
					{
						...StyleSheet.absoluteFillObject,
						height: imageHeight,
						width: "100%",
						resizeMode: "cover",
						alignSelf: "center",
					},
					{
						transform: [
							{
								translateY: scrollAnimatedValue.interpolate({
									inputRange: [-imageHeight, 0, imageHeight],
									outputRange: [imageHeight / 2, 0, -imageHeight / 2],
									extrapolateRight: "clamp",
								}),
							},
							{
								scale: scrollAnimatedValue.interpolate({
									inputRange: [-imageHeight, 0],
									outputRange: [2, 1],
									extrapolateRight: "clamp",
								}),
							},
						],
					},
				]}
			/>
			<Animated.ScrollView
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }],
					{ useNativeDriver: true }
				)}
				style={style}
				contentContainerStyle={{
					marginTop: imageHeight,
					borderTopEndRadius: 30,
					borderTopStartRadius: 30,
					bottom: 30,
					paddingBottom: imageHeight,
					minHeight: (windowHeight / 3) * 2,
					backgroundColor: colors.onSurface,
					...contentContainerStyle,
				}}
				scrollEventThrottle={8} // target 120fps
			>
				<View style={{ minHeight: (windowHeight / 3) * 2 }}>{children}</View>
			</Animated.ScrollView>
		</>
	);
};

export default ParallaxScrollView;
