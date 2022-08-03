import { StyleSheet, View, Dimensions, Platform } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { LineChart as SvgLineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/Auth";
import { Headline, Subheading } from "../typography";
import FadedView from "../animations/FadedView";
import Count from "../animations/Count";
// https://www.npmjs.com/package/@react-native-community/slider

interface LineChartProps {
	sizes: any;
}

const LineChart: React.FC<LineChartProps> = (props) => {
	const { sizes } = props;
	const { user } = useContext(AuthContext);
	const { colors } = useTheme();
	const [dataArray, setDataArray] = useState<Array<number>>([70, 70]);
	const screenWidth = Dimensions.get("window").width - 80;

	// This useEffect sets the data array for the line chart, and the current user weight
	// Values from API comes as strings and are converted to numbers
	useEffect(() => {
		if (sizes && !sizes?.error) {
			const weightArray = sizes.filter((sizeSet: Array<object>) => "weight" in sizeSet);
			const weightValues = weightArray[0].weight.map((sizeArray: any) => sizeArray.value);
			weightValues.length > 1 && setDataArray(weightValues);
		}
	}, [sizes]);

	return (
		<View style={[styles.container, { backgroundColor: colors.surface }]}>
			<FadedView display delay={500} duration={1000}>
				<Subheading style={{ alignSelf: "flex-start" }}>Nuvarande vikt</Subheading>
				{sizes && !sizes?.error && (
					<View style={{ flexDirection: "row" }}>
						<Count
							duration={1500}
							start={
								(sizes[0]?.weight[0]?.value
									? sizes[0]?.weight[0]?.value
									: user?.start_weight) - 3
							}
							stop={
								sizes[0]?.weight[0]?.value
									? sizes[0]?.weight[0]?.value
									: user?.start_weight
							}
							style={{
								color: colors.highlightText,
								fontFamily: "ubuntu-medium",
								fontSize: 22,
								lineHeight: 22,
								textAlignVertical: "center",
								top: Platform.OS === "android" ? 0 : 2,
							}}
						/>
						<Headline style={{ alignSelf: "flex-start", color: colors.highlightText }}>
							{" "}
							kg
						</Headline>
					</View>
				)}
				<SvgLineChart
					style={{ height: 100, width: screenWidth }}
					gridMin={user?.start_weight}
					gridMax={user?.goal_weight}
					data={dataArray}
					curve={shape.curveNatural}
					svg={{ stroke: colors.primary, strokeWidth: 10 }}
					contentInset={{ top: 20, bottom: 20 }}
				/>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<Text style={{ fontSize: 12 }}>Start</Text>
					<View style={{ flexGrow: 1 }} />
					<Text style={{ fontSize: 12 }}>Nuvarande</Text>
				</View>
			</FadedView>
		</View>
	);
};

export default LineChart;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		borderRadius: 5,
		padding: 20,
		marginBottom: 10,
	},
});
