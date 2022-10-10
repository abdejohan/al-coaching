import {
	Alert,
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Platform,
} from "react-native";
import { Divider, useTheme, List, IconButton } from "react-native-paper";
import HeroScrollView from "../components/common/HeroScrollView";
import placeholder_image from "../assets/images/placeholder_image.jpg";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import InputValidation from "../components/InputValidation";
import { Caption, Paragraph, Subheading } from "../typography";
import { StatusBar } from "expo-status-bar";
import { useDialog } from "../hooks/useDialog";

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
	const { DialogBox, showDialog } = useDialog();
	const { workouts, newWorkoutIndex, workoutDayID, incomingWorkoutIndex } = route.params;
	const [workoutSets, setWorkoutSets] = useState<Array<SaveSet>>([]);
	const [workoutIndex, setWorkoutIndex] = useState<number>(
		incomingWorkoutIndex ? incomingWorkoutIndex : 0
	);
	const [uniqeKey, setUniqeKey] = useState<number>(0);
	const [userComment, setUserComment] = useState<string>("");
	const { colors, roundness } = useTheme();
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
			setWorkoutSets([]);
			setWorkoutIndex(newWorkoutIndex);
		}
	}, [newWorkoutIndex]);

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
		<>
			<StatusBar hidden />
			<HeroScrollView
				video={
					workouts[workoutIndex]?.video
						? workouts[workoutIndex]?.video?.substring(
								workouts[workoutIndex]?.video.length - 11
						  )
						: null
				}
				image={!workouts[workoutIndex].video ? placeholder_image : null}
				title={workouts[workoutIndex]?.name}
				button={
					<View style={{ marginBottom: 20 }}>
						<View style={{ flexDirection: "row" }}>
							<Button
								style={{
									marginRight: 10,
									backgroundColor: "lightgrey",
								}}
								onPress={() => navigation.goBack()}>
								<Ionicons
									name='ios-chevron-back-outline'
									size={24}
									color={colors.black}
								/>
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
										.catch(() => Alert.alert(`Något gick fel. Försök igen!`));
								}}>
								{!postWorkoutResultsLoading && "Nästa övning"}
								{postWorkoutResultsLoading && "Sparar.."}
							</Button>
						</View>
						{Platform.OS === "android" && (
							<View style={{ alignItems: "center" }}>
								<TouchableOpacity
									onPress={() =>
										navigation.navigate("AlternateWorkoutSession", {
											workouts,
											workoutDayID,
										})
									}>
									<Caption>Problem att spara? Testa det här.</Caption>
								</TouchableOpacity>
							</View>
						)}
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
								key={uniqeKey}
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
											onPress={() => showDialog()}
											style={[
												styles.info,
												{
													borderRadius: roundness,
													backgroundColor: colors.onSurface,
												},
											]}
										/>
										<DialogBox>
											<Paragraph>
												{set.comment ? set.comment : `Denna övning saknar kommentar.`}
											</Paragraph>
										</DialogBox>
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
});
