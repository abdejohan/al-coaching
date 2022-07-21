import { StyleSheet, View, Dimensions } from "react-native";
import placeholder_image from "../assets/images/placeholder_image.jpg";
import { Divider, useTheme } from "react-native-paper";
import Constants from "expo-constants";
import HeroScrollView from "../components/common/HeroScrollView";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/common/Button";
import ListItemBasic from "../components/common/ListItemBasic";
import { Paragraph } from "../typography";

interface WorkoutOverviewProps {
	navigation: any;
	route: any;
}

const WorkoutOverviewScreen: React.FC<WorkoutOverviewProps> = ({ navigation, route }) => {
	const { colors } = useTheme();
	const { workoutDay } = route.params;

	return (
		<HeroScrollView
			title='Dagens träningspass'
			description={null}
			image={placeholder_image}
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
						onPress={() =>
							navigation.navigate("WorkoutSession", {
								workouts: workoutDay.workouts,
								workoutDayID: workoutDay.id,
							})
						}
						style={{ flex: 1, marginBottom: 20 }}>
						Påbörja träningspass
					</Button>
				</View>
			}>
			<View style={styles.count}>
				<Ionicons
					name='barbell-outline'
					style={{
						marginRight: 5,
						transform: [{ rotate: "135deg" }],
					}}
					color={colors.text}
					size={14}
				/>
				<Paragraph>{Object.keys(workoutDay.workouts).length} övningar</Paragraph>
			</View>
			{workoutDay.workouts.map((workout: any, index: number) => (
				<View key={index}>
					<ListItemBasic key={index} title={workout.name} />
					<Divider />
				</View>
			))}
		</HeroScrollView>
	);
};

export default WorkoutOverviewScreen;

const styles = StyleSheet.create({
	container: {},
	image: {
		flex: 1,
		width: undefined,
		resizeMode: "cover",
		height: Dimensions.get("window").height / 3,
	},
	count: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	backButton: {
		width: 45,
		height: 45,
		position: "absolute",
		zIndex: 1,
		top: Dimensions.get("window").height / 3 - Constants.statusBarHeight - 60,
	},
});
