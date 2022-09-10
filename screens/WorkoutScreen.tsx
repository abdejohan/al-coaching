import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, ScrollView, View } from "react-native";
import { ActivityIndicator, IconButton, useTheme, List, Text } from "react-native-paper";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { Paragraph, Subheading } from "../typography";

interface WorkoutProps {
	navigation: any;
}

const WorkoutScreen: React.FC<WorkoutProps> = ({ navigation }) => {
	const { colors, roundness } = useTheme();
	const { useAxios } = useAxiosAuthenticated();
	const [{ data: workoutData, loading: workoutLoading, error: workoutError }] = useAxios({
		url: "/v2/workout/list",
	});

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
			{workoutLoading && (
				<ActivityIndicator
					animating={workoutLoading}
					color={colors.primary}
					size='large'
					style={{ marginTop: 100 }}
				/>
			)}
			{workoutData &&
				!workoutLoading &&
				workoutData[0]?.workout_days.map((day: any, index: number) => (
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
						onPress={() => navigation.navigate("WorkoutOverview", { workoutDay: day })}
						description={() => (
							<View style={{ flexDirection: "row", marginLeft: -3 }}>
								<Ionicons
									size={13}
									name='barbell-outline'
									color={colors.primary}
									style={{ transform: [{ rotate: "135deg" }], marginRight: 9 }}
								/>
								<Text style={{ fontFamily: "ubuntu-light", marginTop: 5 }}>
									{day.workouts.length} övningar
								</Text>
							</View>
						)}
						right={() => (
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
									<IconButton icon='arrow-right' size={18} color={colors.highlightText} />
								</View>
							</View>
						)}
					/>
				))}
			{workoutData?.length === 0 && !workoutLoading && (
				<View style={{ paddingTop: 50 }}>
					<Subheading style={{ textAlign: "center", fontSize: 16, marginBottom: 5 }}>
						Hittade inget!
					</Subheading>
					<Paragraph style={{ textAlign: "center", paddingHorizontal: 40 }}>
						Tråkigt nog ser det ut som att du inte har några träningspass för tillfället.
					</Paragraph>
					<Paragraph style={{ textAlign: "center" }}>
						Kontakta din coach för mer information!
					</Paragraph>
					<Ionicons
						name='barbell-outline'
						style={{
							alignSelf: "center",
							margin: 5,
							marginTop: 50,
						}}
						color={colors.text}
						size={40}
					/>
				</View>
			)}
		</ScrollView>
	);
};

export default WorkoutScreen;

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
