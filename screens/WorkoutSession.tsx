import {
	Alert,
	StyleSheet,
	View,
	TextInput,
	Dimensions,
	ScrollView,
	Image,
} from "react-native";
import { Divider, useTheme, List, IconButton } from "react-native-paper";
import placeholder_image from "../assets/images/placeholder_image.jpg";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import InputValidation from "../components/InputValidation";
import { Paragraph, Subheading, Title } from "../typography";
import { useDialog } from "../hooks/useDialog";
import YoutubePlayer from "react-native-youtube-iframe";
import { SaveSet, Set } from "../types/types";

interface WorkoutSessionProps {
	navigation: any;
	route: any;
}

const WorkoutSession: React.FC<WorkoutSessionProps> = ({ navigation, route }) => {
	const { DialogBox, showDialog } = useDialog();
	const { workouts, workoutDayID, workoutIndex = 0 } = route.params;
	const [workoutSets, setWorkoutSets] = useState<Array<SaveSet>>([]);
	const [userComment, setUserComment] = useState<string>("");
	const [exerciseComment, setExcersiceComment] = useState<string>("");
	const { colors, roundness } = useTheme();
	const { useAxios } = useAxiosAuthenticated();
	const [{ loading: postWorkoutResultsLoading }, postWorkoutResults] = useAxios(
		{
			url: "/v2/exercise/track",
			method: "POST",
		},
		{ manual: true }
	);
	/**
	 * 
	 const [{ data: exerciseData, loading: fetchExerciseLoading }, fetchExercise] = useAxios(
		 {
			url: "v2/workout/exercise/list",
			method: "GET",
			data: { id: 295 },
		}
	);
	
	useEffect(() => {
		console.log(exerciseData);
	}, [exerciseData]);
	*/

	const handleDialog = (comment: string) => {
		setExcersiceComment(comment ? comment : `Denna övning saknar kommentar.`);
		showDialog();
	};

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

	// Extract the sets from workout object and remove all unnecessary key/value pairs
	useEffect(() => {
		if (historyData?.performance?.comment) {
			setUserComment(historyData.performance.comment);
		}
		const cleanSetsWithId = workouts[workoutIndex]?.sets?.map(
			(set: Set, setIndex: number) => {
				return {
					set_id: set?.set_id,
					saved_reps: historyData?.performance?.saved_sets[setIndex]?.saved_reps
						? historyData?.performance?.saved_sets[setIndex]?.saved_reps
						: "0",
					saved_weight: historyData?.performance?.saved_sets[setIndex]?.saved_weight
						? historyData?.performance?.saved_sets[setIndex]?.saved_weight
						: "0",
				};
			}
		);
		setWorkoutSets(cleanSetsWithId);
	}, [historyData]);

	return (
		<ScrollView
			style={{ backgroundColor: colors.surface }}
			bounces={false}
			keyboardShouldPersistTaps='handled'>
			{workouts[workoutIndex]?.video ? (
				<YoutubePlayer
					height={Dimensions.get("window").height / 3.5}
					videoId={workouts[workoutIndex]?.video?.substring(
						workouts[workoutIndex]?.video?.length - 11
					)}
				/>
			) : (
				<Image source={placeholder_image} style={styles.image} />
			)}
			<View
				style={{
					padding: 20,
					backgroundColor: colors.surface,
					paddingTop: workouts[workoutIndex]?.video
						? Dimensions.get("window").width < 350
							? 20
							: 0
						: 20,
				}}>
				<Title style={{ color: colors.highlightText, fontSize: 22, lineHeight: 22 }}>
					{workouts[workoutIndex]?.name}
				</Title>
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
				<DialogBox>
					<Paragraph>{exerciseComment}</Paragraph>
				</DialogBox>
				{workouts[workoutIndex]?.sets?.map((set: Set, index: number) => (
					<View key={index} style={{ marginBottom: 1 }}>
						{/* NEW ADDED BLOCK FROM LIST.ITEM.INPUT */}
						<View style={styles.container}>
							<List.Item
								style={[
									styles.listItem,
									{ borderRadius: roundness, backgroundColor: colors.surface },
								]}
								title={`Set ${set.set_id}`}
								titleStyle={[
									{
										marginLeft: -15,
										fontSize: 16,
										color: colors.highlightText,
										fontFamily: "ubuntu-medium",
									},
								]}
								description={`${set.reps} Reps \u00B7 Vila: ${set.seconds}`}
								descriptionStyle={{ fontSize: 14, marginLeft: -15, color: colors.text }}
								key={index}
								right={() => (
									<View
										style={{
											flexDirection: "row",
											alignItems: "flex-end",
											paddingBottom: 5,
											marginRight: -10,
										}}>
										<IconButton
											icon='information-outline'
											size={22}
											onPress={() => handleDialog(set?.comment)}
											style={[
												styles.info,
												{
													borderRadius: roundness,
													backgroundColor: colors.onSurface,
												},
											]}
										/>
										<TextInput
											autoCorrect={false}
											value={workoutSets[index]?.saved_reps}
											style={[
												styles.input,
												{
													borderRadius: roundness,
													backgroundColor: colors.onSurface,
													color: colors.text,
												},
											]}
											onChangeText={(text) => {
												setWorkoutSets((workoutSets) => ({
													...workoutSets,
													[index]: {
														...workoutSets[index],
														saved_reps: text,
													},
												}));
											}}
											textAlign='center'
											keyboardType='number-pad'
											maxLength={3}
										/>
										<TextInput
											autoCorrect={false}
											value={workoutSets[index]?.saved_weight}
											style={[
												styles.input,
												{
													borderRadius: roundness,
													backgroundColor: colors.onSurface,
													color: colors.text,
												},
											]}
											onChangeText={(text) => {
												setWorkoutSets((workoutSets) => ({
													...workoutSets,
													[index]: {
														...workoutSets[index],
														saved_weight: text,
													},
												}));
											}}
											textAlign='center'
											keyboardType='decimal-pad'
											maxLength={5}
										/>
									</View>
								)}
							/>
						</View>
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
				<View
					style={{
						marginVertical: 20,
					}}>
					<Button
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
								.then(() => navigation.goBack())
								.catch(() => Alert.alert(`Något gick fel. Försök igen!`));
						}}>
						{!postWorkoutResultsLoading && "Spara"}
						{postWorkoutResultsLoading && "Sparar.."}
					</Button>
					<Button backgroundColor='grey' onPress={() => navigation.goBack()}>
						Tillbaka
					</Button>
				</View>
			</View>
		</ScrollView>
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
	// NEW STUFF
	container: {
		width: "100%",
	},
	date: {
		fontSize: 16,
		position: "absolute",
		marginLeft: 8,
		top: 13,
	},
	listItem: {
		height: 64,
		justifyContent: "center",
		padding: 0,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	leftIcon: {
		alignItems: "center",
		justifyContent: "center",
		width: 44,
		height: 44,
		padding: 10,
		marginRight: 5,
	},
	info: {
		width: 45,
		height: 45,
		marginLeft: 2,
		margin: 0,
	},
	input: {
		width: 60,
		height: 45,
		marginLeft: 2,
		textAlign: "center",
	},
	image: {
		flex: 1,
		width: "100%",
		resizeMode: "cover",
		height: Dimensions.get("window").height / 3.5,
	},
});
