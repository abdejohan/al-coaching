import {
	StyleSheet,
	View,
	Image,
	Dimensions,
	ImageSourcePropType,
	RefreshControl,
} from "react-native";
import { Title, useTheme } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ReactElement } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Paragraph } from "../../typography";

interface HeroScrollProps {
	title?: string;
	button?: ReactElement;
	description?: string | null;
	image?: ImageSourcePropType;
	video?: string;
	modal?: string;
	faded?: boolean;
	children?: any;
	refreshControl?: RefreshControl;
}

const HeroScrollView: React.FC<HeroScrollProps> = (props) => {
	const { children, title, description, image, video, button, faded } = props;
	const { colors } = useTheme();
	const isFocused = useIsFocused();

	return (
		<KeyboardAwareScrollView
			alwaysBounceHorizontal={false}
			alwaysBounceVertical={false}
			bounces={false}
			style={{ backgroundColor: colors.surface }}
			{...props}>
			{isFocused ? <StatusBar style='light' /> : null}
			{image && !video && <Image source={image} style={styles.image} />}
			{video && !image && (
				<YoutubePlayer height={Dimensions.get("window").height / 3} videoId={video} />
			)}
			{faded && (
				<View
					style={{
						backgroundColor: colors.darkfade,
						position: "absolute",
						height: Dimensions.get("window").height / 3,
						width: "100%",
					}}
				/>
			)}
			<View
				style={{
					bottom: 35,
					borderTopStartRadius: video ? 0 : 35,
					borderTopEndRadius: video ? 0 : 35,
					padding: 25,
					paddingTop: video ? 0 : 25,
					paddingBottom: 0,
					backgroundColor: colors.surface,
					minHeight: (Dimensions.get("window").height / 3) * 2,
				}}>
				{title && (
					<Title style={{ color: colors.highlightText, fontSize: 22 }}>{title}</Title>
				)}
				{description && <Paragraph>{description}</Paragraph>}
				{children}
				<View style={{ flex: 1, justifyContent: "flex-end", top: 35 }}>{button}</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default HeroScrollView;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: undefined,
		resizeMode: "cover",
		height: Dimensions.get("window").height / 3,
	},
	backButton: {
		width: 45,
		height: 45,
		position: "absolute",
		zIndex: 1,
	},
	infoButton: {
		width: 45,
		height: 45,
		position: "absolute",
		zIndex: 1,
		right: 20,
	},
});
