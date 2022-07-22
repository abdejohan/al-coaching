import { Alert, StyleSheet, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import HeroScrollView from "../components/common/HeroScrollView";
import placeholder_image from "../assets/images/placeholder_image.png";
import { Ionicons } from "@expo/vector-icons";
import ListItemInput from "../components/common/ListItemInput";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import InputValidation from "../components/InputValidation";
import { Paragraph, Subheading } from "../typography";

interface WorkoutSessionProps {
	navigation: any;
	route: any;
}

type SaveSet = {
	saved_reps: number;
	saved_weight: number;
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
	const { workouts, newWorkoutIndex, workoutDayID } = route.params;
	// url: "/track/exercise/history", 	data: { exercise_id: workoutDayID, scheme_day_id: workouts[workoutIndex].id,
	const [workoutSets, setWorkoutSets] = useState<Array<SaveSet>>([]);
	const [workoutIndex, setWorkoutIndex] = useState<number>(0);
	const [allSetsAreValid, setAllSetsAreValid] = useState<boolean>(false);
	const [uniqeKey, setUniqeKey] = useState<number>(0);
	const [userComment, setUserComment] = useState<string>("");
	const { colors } = useTheme();
	const { useAxios } = useAxiosAuthenticated();
	const [, postWorkoutResults] = useAxios(
		{
			url: "/track/exercise",
			method: "POST",
		},
		{ manual: true }
	);

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
		const cleanSetsWithId = workouts[workoutIndex].sets.map((set: Set) => {
			return {
				set_id: set.set_id,
				saved_reps: null,
				saved_weight: null,
			};
		});
		setWorkoutSets(cleanSetsWithId);
	}, [workoutIndex]);

	// 1. Match InputField to the corresponding set
	// 2. Add the new value to that set
	const addRepsToSets = (value: number, index: number) => {
		setWorkoutSets(
			workoutSets.map((set) =>
				workoutSets.indexOf(set) === index ? { ...set, saved_reps: value } : set
			)
		);
	};
	// 1. Match InputField to the corresponding set
	// 2. Add the new value to that set
	const addWeightToSets = (value: number, index: number) => {
		setWorkoutSets(
			workoutSets.map((set: SaveSet) =>
				workoutSets.indexOf(set) === index ? { ...set, saved_weight: value } : set
			)
		);
	};

	// 1. Extract the values to valdiate
	// 2. Check if all values are of type Number
	// 3. Set setAllSetsAreValid to enable the "submit" button
	useEffect(() => {
		const valuesToValidate = workoutSets.flatMap((set: SaveSet) => [
			set.saved_reps,
			set.saved_weight,
		]);
		const allSetValuesAreNumber = valuesToValidate.every(
			(setValue) => typeof setValue === "number"
		);
		setAllSetsAreValid(allSetValuesAreNumber);
	}, [workoutSets]);

	return (
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
				<View style={{ flexDirection: "row" }}>
					<Button
						style={{
							backgroundColor: "lightgrey",
							marginRight: 10,
							marginBottom: 20,
							height: 50,
						}}
						onPress={() => navigation.goBack()}>
						<Ionicons name='ios-chevron-back-outline' size={24} color='black' />
					</Button>
					<Button
						disable={!allSetsAreValid}
						style={{ flex: 1, marginBottom: 20 }}
						onPress={() =>
							postWorkoutResults({
								data: {
									exercise_id: workoutDayID,
									scheme_day_id: workouts[workoutIndex].id,
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
								.catch((error) => Alert.alert(`Något gick fel. Försök igen!`))
						}>
						{workoutIndex + 1 === Object.keys(workouts).length
							? "Slutför träningspass!"
							: "Klar, nästa övning"}
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
			{workouts[workoutIndex].sets.map((set: Set, index: number) => (
				<View key={index} style={{ marginBottom: 1 }}>
					<ListItemInput
						key={uniqeKey}
						weightsValue={(value: number) => addWeightToSets(value, index)}
						repetitionsValue={(value: number) => addRepsToSets(value, index)}
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
				styleInput={{ backgroundColor: colors.onSurface, fontSize: 16 }}
				multiline
				numberOfLines={4}
			/>
		</HeroScrollView>
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
