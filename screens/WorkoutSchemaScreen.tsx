import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, ScrollView, View } from "react-native";
import { IconButton, useTheme, List, Text } from "react-native-paper";

interface WorkoutSchemaProps {
	navigation: any;
	route: any;
}

const WorkoutSchemaScreen: React.FC<WorkoutSchemaProps> = ({ navigation, route }) => {
	const { colors, roundness } = useTheme();
	const { workoutSchema } = route.params;

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
			{workoutSchema &&
				workoutSchema?.map((day: any, index: number) => (
					<List.Item
						key={index}
						borderless
						style={[
							styles.listItem,
							{ borderRadius: roundness, backgroundColor: colors.surface },
						]}
						title={day.name}
						titleStyle={{
							fontSize: 16,
							color: colors.highlightText,
							fontFamily: "ubuntu-medium",
						}}
						descriptionStyle={{
							color: colors.text,
							fontSize: 16,
							fontFamily: "ubuntu-light",
						}}
						onPress={() =>
							day?.workouts?.length > 0
								? navigation.navigate("WorkoutOverview", { workoutDay: day })
								: null
						}
						description={() => {
							if (day?.workouts?.length > 0) {
								return (
									<View style={{ flexDirection: "row", marginLeft: -3 }}>
										<Ionicons
											size={13}
											name='barbell-outline'
											color={colors.primary}
											style={{ transform: [{ rotate: "135deg" }], marginRight: 9 }}
										/>
										<Text style={{ fontFamily: "ubuntu-light", marginTop: 5 }}>
											{day?.workouts?.length} övningar
										</Text>
									</View>
								);
							}
						}}
						right={() => {
							if (day?.workouts?.length > 0) {
								return (
									<View style={{ justifyContent: "center" }}>
										<View
											style={{
												backgroundColor: colors.onSurface,
												width: 40,
												height: 40,
												justifyContent: "center",
												alignItems: "center",
												borderRadius: roundness,
												marginRight: 10,
											}}>
											<IconButton
												icon='arrow-right'
												size={18}
												color={colors.highlightText}
											/>
										</View>
									</View>
								);
							}
						}}
					/>
				))}
		</ScrollView>
	);
};

export default WorkoutSchemaScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	listItem: {
		height: 76,
		justifyContent: "center",
		padding: 0,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
});
