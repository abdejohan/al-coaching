import {
	StyleSheet,
	Image,
	ScrollView,
	View,
	Alert,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Auth";
import CircleChart from "../components/CircleChart";
import LineChart from "../components/LineChart";
import ProgressBox from "../components/ProgressBox";
import avatar_placeholder from "../assets/images/avatar_placeholder.png";
import { useTheme, IconButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import check_in_background from "../assets/images/check_in_background.jpg";
import Constants from "expo-constants";
import { Headline, Paragraph, Caption } from "../typography";
import FadedView from "../animations/FadedView";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";

interface StartProps {
	navigation: any;
	route: any;
}

const StartScreen: React.FC<StartProps> = ({ navigation, route }) => {
	const status = route?.params?.status;
	const { user, initialRoute, darkMode } = useContext(AuthContext);
	const { colors, roundness } = useTheme();
	const { useAxios } = useAxiosAuthenticated();
	const [{ data: sizesData, loading: sizesLoading, error: sizesError }, fetchSizes] =
		useAxios({
			url: `/measures/get`,
		});

	useEffect(() => {
		initialRoute === "Intro" && navigation.navigate("IntroSlider");
	}, [initialRoute]);

	// This will update the charts values if the weekly report has successfully been submitted
	useEffect(() => {
		if (status === "success") {
			fetchSizes().catch((error) => Alert.alert("Sizes " + error.response.data.error));
		}
	}, [status]);

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: colors.background }]}
			contentContainerStyle={{
				alignItems: "center",
				justifyContent: "space-between",
				paddingBottom: 50,
			}}>
			<StatusBar style={darkMode ? "light" : "dark"} />
			<View
				style={{
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					width: "100%",
					marginBottom: 20,
				}}>
				<View>
					<Headline style={{ color: colors.highlightText }}>Välkommen,</Headline>
					<Headline style={{ color: colors.highlightText }}>{`${
						user?.name?.split(" ")[0]
					}!`}</Headline>
				</View>
				{user?.avatar ? (
					<Image
						source={{ uri: user?.avatar }}
						style={{ width: 50, height: 50, borderRadius: roundness }}
					/>
				) : (
					<Image
						source={avatar_placeholder}
						style={{ width: 50, height: 50, borderRadius: roundness }}
					/>
				)}
			</View>
			{user?.weekly_update_sent === 0 && (
				<View style={{ marginBottom: 10, width: "100%" }}>
					<TouchableOpacity onPress={() => navigation.navigate("CheckIn")}>
						<ImageBackground
							source={check_in_background}
							resizeMode='cover'
							style={{ width: "100%" }}
							imageStyle={{ borderRadius: roundness }}>
							<View
								style={{
									backgroundColor: colors.darkestfade,
									flex: 1,
									padding: 20,
									borderRadius: roundness,
								}}>
								<FadedView display delay={500} duration={800}>
									<Headline style={{ color: colors.white }}>
										Berätta hur din vecka
									</Headline>
								</FadedView>
								<FadedView display delay={1000} duration={500}>
									<Headline style={{ color: colors.white }}>har gått</Headline>
								</FadedView>
								<FadedView display delay={1500} duration={500}>
									<Paragraph style={{ color: colors.white }}>
										För att vi ska kunna hjälpa dig på bästa möjliga sätt, behöver vi att
										du svarar på några snabba frågor.
									</Paragraph>
								</FadedView>
								<FadedView display duration={1000}>
									<View
										style={{
											borderRadius: roundness,
											backgroundColor: "#292929",
											alignSelf: "flex-end",
										}}>
										<IconButton
											icon='arrow-right'
											color={colors.white}
											rippleColor={"transparent"}
										/>
									</View>
								</FadedView>
							</View>
						</ImageBackground>
					</TouchableOpacity>
				</View>
			)}
			<CircleChart sizes={sizesData} />
			<LineChart sizes={sizesData} />
			<View style={styles.progressBoxes}>
				<ProgressBox
					customStyle={{ marginRight: 10, marginBottom: 10 }}
					title='Biceps'
					sizes={sizesData}
				/>
				<ProgressBox customStyle={{ marginBottom: 10 }} title='Rumpa' sizes={sizesData} />
				<ProgressBox customStyle={{ marginRight: 10 }} title='Midja' sizes={sizesData} />
				<ProgressBox title='Lår' sizes={sizesData} />
			</View>
			<View style={{ marginTop: 30, alignItems: "center" }}>
				<Caption>AL Coaching</Caption>
				<Caption>{`Version ${Constants.manifest!.version}`}</Caption>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	progressBoxes: {
		justifyContent: "space-between",
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 20,
	},
});

export default StartScreen;
