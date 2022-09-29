import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import { IconButton, useTheme, List } from "react-native-paper";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { Paragraph, Subheading } from "../typography";

interface WorkoutProps {
	navigation: any;
}

const WorkoutScreen: React.FC<WorkoutProps> = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false);
	const { colors, roundness } = useTheme();
	const { useAxios } = useAxiosAuthenticated();
	const [
		{ data: workoutData, loading: workoutLoading, error: workoutError },
		fetchWorkoutSchemas,
	] = useAxios({
		url: "/v2/workout/list",
	});

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchWorkoutSchemas()
			.then(() => setRefreshing(false))
			.catch(() => {});
	}, []);

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: colors.background }]}
			refreshControl={
				<RefreshControl
					titleColor={colors.primary}
					colors={[colors.primary]}
					tintColor={colors.primary}
					progressBackgroundColor={colors.surface}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}>
			{workoutData &&
				!workoutLoading &&
				workoutData.map((workoutSchema: any, index: number) => (
					<List.Item
						key={index}
						borderless
						style={[
							styles.listItem,
							{ borderRadius: roundness, backgroundColor: colors.surface },
						]}
						title={workoutSchema.name}
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
							navigation.navigate("WorkoutSchemaScreen", {
								workoutSchema: workoutSchema.workout_days,
							})
						}
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
