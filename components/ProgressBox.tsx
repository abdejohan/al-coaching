import React, { useEffect, useState } from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Headline, Subheading, Text } from "../typography";

interface ProgressBoxProps {
	title: string;
	sizes: Array<object>;
	customStyle?: TextStyle;
}

const ProgressBox: React.FC<ProgressBoxProps> = (props) => {
	const { title, sizes, customStyle } = props;
	const { colors } = useTheme();
	const [data, setData] = useState<Array<number>>([1, 1]);
	const [progress, setProgress] = useState<number>(0);
	const [progressBoxWidth, setProgressBoxWidth] = useState<number>(80);

	useEffect(() => {
		if (sizes) {
			sizes?.forEach((sizeSet: any) => {
				if ("biceps" in sizeSet && title === "Biceps") {
					const bicepValues = sizeSet.biceps.map((sizeArray: any) => sizeArray.value);
					setData(bicepValues.reverse());
				}
				if ("glutes" in sizeSet && title === "Rumpa") {
					const glutesValues = sizeSet.glutes.map((sizeArray: any) => sizeArray.value);
					setData(glutesValues.reverse());
				}
				if ("waist" in sizeSet && title === "Midja") {
					const waistValues = sizeSet.waist.map((sizeArray: any) => sizeArray.value);
					setData(waistValues.reverse());
				}
				if ("thighs" in sizeSet && title === "Lår") {
					const thighsValues = sizeSet.thighs.map((sizeArray: any) => sizeArray.value);
					setData(thighsValues.reverse());
				}
			});
		}
	}, [sizes]);

	// Calculate the difference in cm
	useEffect(() => {
		const firstValue = data[0];
		const latestValue = data.slice(-1)[0];
		const difference = latestValue - firstValue;
		setProgress(Math.round(difference * 10) / 10);
	}, [data]);

	return (
		<View
			onLayout={(e) => setProgressBoxWidth(e.nativeEvent.layout.width)}
			style={[{ backgroundColor: colors.surface }, styles.container, customStyle]}>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<Subheading>{title}</Subheading>
				<View style={[styles.progressChip, { backgroundColor: colors.onSurface }]}>
					<IconButton
						icon='arrow-up'
						size={10}
						color={colors.primary}
						style={{
							backgroundColor: colors.onSurface2,
							alignSelf: "center",
							transform: [{ rotate: progress >= 0 ? "45deg" : "135deg" }],
						}}
					/>
					<Text
						style={{
							fontSize: 12,
							lineHeight: 12,
							color: colors.text,
							marginRight: 7,
							fontFamily: "ubuntu-regular",
							alignSelf: "center",
						}}>
						{progress} cm
					</Text>
				</View>
			</View>
			<Headline style={{ color: colors.highlightText, lineHeight: 20 }}>
				{data.slice(-1)[0]} cm
			</Headline>
			<LineChart
				style={{ height: 60, width: progressBoxWidth - 30 }}
				gridMin={data.slice(-1)[0] < data[0] ? data.slice(-1)[0] : data[0]}
				gridMax={data.slice(-1)[0] > data[0] ? data.slice(-1)[0] : data[0]}
				data={data}
				curve={shape.curveNatural}
				svg={{ stroke: colors.primary, strokeWidth: 4 }}
				contentInset={{ top: 20, bottom: 20 }}
			/>
		</View>
	);
};

export default ProgressBox;

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		padding: 15,
		paddingBottom: 0,
		flex: 1,
		flexBasis: "40%",
		minHeight: 100,
	},
	progressChip: {
		borderRadius: 30,
		flexDirection: "row",
	},
});
