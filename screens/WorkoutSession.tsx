import { Alert, StyleSheet, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import HeroScrollView from "../components/common/HeroScrollView";
import placeholder_image from "../assets/images/placeholder_image.jpg";
import { Ionicons } from "@expo/vector-icons";
import ListItemInput from "../components/common/ListItemInput";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import InputValidation from "../components/InputValidation";
import { Paragraph, Subheading } from "../typography";
import { StatusBar } from "expo-status-bar";

interface WorkoutSessionProps {
	navigation: any;
	route: any;
}

type SaveSet = {
	saved_reps: string;
	saved_weight: string;
	set_id: number;
	comment: string;
};

type Set = {
	reps: string;
	seconds: string;
	weight: string;
	set_id: number;
	comment: string;
};

const WorkoutSession: React.FC<WorkoutSessionProps> = ({ navigation, route }) => {
	const { workouts, newWorkoutIndex, workoutDayID, incomingWorkoutIndex } = route.params;
	const [workoutSets, setWorkoutSets] = useState<Array<SaveSet>>([]);
	const [workoutIndex, setWorkoutIndex] = useState<number>(
		incomingWorkoutIndex ? incomingWorkoutIndex : 0
	);
	const [uniqeKey, setUniqeKey] = useState<number>(0);
	const [userComment, setUserComment] = useState<string>("");
	const { colors } = useTheme();
	const { useAxios } = useAxiosAuthenticated();
	const [{ loading: postWorkoutResultsLoading }, postWorkoutResults] = useAxios(
		{
			url: "/v2/exercise/track",
			method: "POST",
		},
		{ manual: true }
	);

	// ENDPOINT FOR FETCHING WORKOUT HISTORY FOR A SPECIFIC EXERCISE
	const [{ data: historyData, loading: historyLoading, error: historyError }] = useAxios({
		url: "/v2/exercise/track/history/latest",
		method: "POST",
		data: {
			scheme_day_id: workoutDayID,
			exercise_id: workouts[workoutIndex].id,
			workout: workouts[workoutIndex].category,
		},
	});

	// newWorkoutIndex is the index of the current workout
	// and comes from the previously displayed screen
	useEffect(() => {
		if (newWorkoutIndex) {
			setUniqeKey(newWorkoutIndex);
			setUserComment("");
			setWorkoutIndex(newWorkoutIndex);
		}
	}, [newWorkoutIndex]);

	// Extract the sets from workout object and remove all unnecessary key/value pairs
	useEffect(() => {
		if (historyData?.performance?.saved_sets) {
			const cleanSetsWithId = workouts[workoutIndex].sets.map(
				(set: Set, setIndex: number) => {
					return {
						set_id: set.set_id,
						saved_reps: historyData?.performance?.saved_sets[setIndex]?.saved_reps,
						saved_weight: historyData?.performance?.saved_sets[setIndex]?.saved_weight,
					};
				}
			);
			setWorkoutSets(cleanSetsWithId);
		} else {
			const cleanSetsWithId = workouts[workoutIndex].sets.map((set: Set) => {
				return {
					set_id: set.set_id,
					saved_reps: null,
					saved_weight: null,
				};
			});
			setWorkoutSets(cleanSetsWithId);
		}
	}, [workoutIndex, historyData]);

	// 1. Match InputField to the corresponding set
	// 2. Add the new value to that set
	const addRepsToSets = (value: string, index: number) => {
		setWorkoutSets(
			workoutSets.map((set) =>
				workoutSets.indexOf(set) === index ? { ...set, saved_reps: value } : set
			)
		);
	};
	// 1. Match InputField to the corresponding set
	// 2. Add the new value to that set
	const addWeightToSets = (value: string, index: number) => {
		setWorkoutSets(
			workoutSets.map((set: SaveSet) =>
				workoutSets.indexOf(set) === index ? { ...set, saved_weight: value } : set
			)
		);
	};

	return (
		<>
			<StatusBar hidden />
			<HeroScrollView
				video={
					workouts[workoutIndex].video
						? workouts[workoutIndex]?.video?.substring(
								workouts[workoutIndex]?.video.length - 11
						  )
						: null
				}
				image={!workouts[workoutIndex].video ? placeholder_image : null}
				title={workouts[workoutIndex].name}
				button={
					<View style={{ flexDirection: "row", marginBottom: 20 }}>
						<Button
							style={{
								marginRight: 10,
								marginBottom: 20,
								backgroundColor: "lightgrey",
							}}
							onPress={() => navigation.goBack()}>
							<Ionicons name='ios-chevron-back-outline' size={24} color={colors.black} />
						</Button>
						<Button
							style={{ flexGrow: 1 }}
							disable={postWorkoutResultsLoading}
							onPress={() => {
								postWorkoutResults({
									data: {
										scheme_day_id: workoutDayID,
										exercise_id: workouts[workoutIndex].id,
										workout: workouts[workoutIndex].category,
										saved_sets: workoutSets,
										comment: userComment,
									},
								})
									.then(() => {
										workoutIndex + 1 === Object.keys(workouts).length
											? navigation.goBack()
											: navigation.navigate("WorkoutSession", {
													workouts,
													newWorkoutIndex: workoutIndex + 1,
													workoutDayID: workoutDayID,
											  });
									})
									.catch((error) => Alert.alert(`Något gick fel. Försök igen!`));
							}}>
							{!postWorkoutResultsLoading && "Nästa övning"}
							{postWorkoutResultsLoading && "Sparar.."}
						</Button>
					</View>
				}>
				<View style={styles.subheader}>
					<Ionicons
						name='barbell-outline'
						style={{
							marginRight: 5,
							transform: [{ rotate: "135deg" }],
						}}
						color={colors.primary}
						size={14}
					/>
					<Paragraph>{`Övning ${workoutIndex + 1} av ${
						Object.keys(workouts).length
					}`}</Paragraph>
				</View>
				<Divider style={{ marginBottom: 15 }} />
				<View style={styles.gridTitles}>
					<Paragraph style={{ fontFamily: "ubuntu-medium", color: colors.highlightText }}>
						Upplägg
					</Paragraph>
					<View style={styles.inputContainer}>
						<Paragraph>Reps</Paragraph>
						<Paragraph>Vikt</Paragraph>
					</View>
				</View>
				{workouts[workoutIndex]?.sets?.map((set: Set, index: number) => (
					<View key={index} style={{ marginBottom: 1 }}>
						<ListItemInput
							key={uniqeKey}
							weightsValue={(value: string) => addWeightToSets(value, index)}
							repetitionPlaceholder={
								historyData?.performance?.saved_sets[index]?.saved_reps !== null &&
								historyData?.performance?.saved_sets[index]?.saved_reps !== undefined &&
								historyData?.performance?.saved_sets[index]?.saved_reps.toString()
							}
							weightPlaceholder={
								historyData?.performance?.saved_sets[index]?.saved_weight !== null &&
								historyData?.performance?.saved_sets[index]?.saved_weight !== undefined &&
								historyData?.performance?.saved_sets[index]?.saved_weight.toString()
							}
							repetitionsValue={(value: string) => addRepsToSets(value, index)}
							title={`Set ${set.set_id}`}
							description={`${set.reps} Reps \u00B7 Vila: ${set.seconds}`}
							descriptionStyle={{ fontSize: 14, marginLeft: -15 }}
							comment={set.comment ? set.comment : `Denna övning saknar kommentar.`}
						/>
						<Divider />
					</View>
				))}
				<Subheading
					style={{
						fontSize: 16,
						marginTop: 20,
						color: colors.highlightText,
						fontFamily: "ubuntu-medium",
					}}>
					Kommentar
				</Subheading>
				<InputValidation
					value={userComment}
					onValidation={(valid: boolean, text) => setUserComment(text)}
					maxLength={255}
					placeholder='Kommentar..'
					placeholderTextColor={colors.text}
					returnKeyType='done'
					style={{ backgroundColor: colors.onSurface }}
					outlineColor={colors.onSurface}
					multiline
					numberOfLines={4}
				/>
			</HeroScrollView>
		</>
	);
};

export default WorkoutSession;

const styles = StyleSheet.create({
	subheader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	gridTitles: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: 89,
		marginRight: 19,
	},
});
