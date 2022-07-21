import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import AuthContext from "../context/Auth";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Text } from "../typography";
import Donut from "../animations/Donut";
import Count from "../animations/Count";
import FadedView from "../animations/FadedView";
dayjs.extend(weekOfYear);

interface CircleChartProps {
	sizes: any;
}

const CircleChart: React.FC<CircleChartProps> = (props) => {
	const { sizes } = props;
	const { user } = useContext(AuthContext);
	const { colors, roundness } = useTheme();
	const screenWidth = Dimensions.get("window").width;
	const [weightDifference, setWeightDifference] = useState<number>(0);
	const [infoText, setInfoText] = useState<string>("");
	const [displayChart, setDisplayChart] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		setDisplayChart(false);
		if (user && sizes) {
			setWeightDifference(
				Math.round(Math.abs(user?.start_weight - user?.goal_weight) * 10) / 10
			);
			if (Math.round(Math.abs(user?.start_weight - user?.goal_weight) * 10) / 10 > 0) {
				// Will run if the user is looking to lose weight
				const progress = user?.start_weight - sizes[0]?.weight[0]?.value;
				if (typeof progress === "number" && progress >= 0) {
					setInfoText("Du har gått ner");
					// Calculate weight difference
					setDisplayChart(true);
					return setProgress(Math.round(progress * 10) / 10);
				}
				setDisplayChart(true);
				return setProgress(0);
			} else {
				// Will run if the user is looking to gain weight
				const progress = sizes[0]?.weight[0]?.value - user?.start_weight;
				if (typeof progress === "number" && progress >= 0) {
					setInfoText("Du har gått upp");
					setDisplayChart(true);
					return setProgress(Math.round(progress * 10) / 10);
				}
				setDisplayChart(true);
				return setProgress(0);
			}
		}
	}, [sizes, user]);

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors.surface, borderRadius: roundness },
			]}>
			<FadedView
				display={displayChart}
				style={{
					alignItems: "center",
					paddingVertical: 10,
					minHeight: screenWidth / 1.7,
				}}>
				<Donut
					duration={1000}
					radius={screenWidth / 3.5}
					max={weightDifference}
					strokeWidth={13}
					color={colors.primary}
					percentage={progress < weightDifference ? progress : weightDifference}>
					<View style={[{ ...StyleSheet.absoluteFillObject }, styles.chartText]}>
						<Text>{infoText}</Text>
						<View
							style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 7 }}>
							<Count
								decimal
								stop={progress < weightDifference ? progress : weightDifference}
								style={{
									color: colors.highlightText,
									fontSize: screenWidth / 8,
									textAlignVertical: "bottom",
									fontFamily: "ubuntu-medium",
								}}
							/>
							<Text
								style={{
									fontSize: screenWidth / 8,
									color: colors.highlightText,
									fontFamily: "ubuntu-medium",
								}}>
								{" "}
								kg
							</Text>
						</View>
						<Text>
							av målet på{" "}
							<Text
								style={{
									color: colors.highlightText,
									fontFamily: "ubuntu-medium",
								}}>
								{weightDifference}
							</Text>
						</Text>
					</View>
				</Donut>
				{/* TEXT DISPLAYING THE CURRENT WEEK  */}
				<Text
					style={{
						position: "absolute",
						bottom: 20,
						left: 20,
						fontSize: 14,
						fontFamily: "ubuntu-light",
					}}>
					Vecka{" "}
					{Number(dayjs().diff(dayjs(user?.start_date), "week") + 1)
						? dayjs().diff(dayjs(user?.start_date), "week") + 1
						: 0}
				</Text>
			</FadedView>
		</View>
	);
};

export default CircleChart;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	chartText: {
		justifyContent: "center",
		alignItems: "center",
	},
});
