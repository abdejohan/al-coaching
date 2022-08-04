import { Dimensions, StyleSheet, View } from "react-native";
import placeholder_image from "../assets/images/placeholder_image.jpg";
import { Divider, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/common/Button";
import ListItemBasic from "../components/common/ListItemBasic";
import { Headline, Paragraph } from "../typography";
import ParallaxScrollView from "../animations/ParallaxScrollView";
import { StatusBar } from "expo-status-bar";

interface WorkoutOverviewProps {
	navigation: any;
	route: any;
}

const WorkoutOverviewScreen: React.FC<WorkoutOverviewProps> = ({ navigation, route }) => {
	const { colors } = useTheme();
	const { workoutDay } = route.params;
	const windowHeight = Dimensions.get("window").height;

	return (
		<View style={{ backgroundColor: colors.onSurface, flex: 1 }}>
			<StatusBar hidden />
			<ParallaxScrollView
				contentContainerStyle={{ padding: 20 }}
				imageSource={placeholder_image}>
				<Headline style={{ color: colors.highlightText }}>Dagens träningspass</Headline>
				<View style={styles.count}>
					<Ionicons
						name='barbell-outline'
						style={{ marginRight: 5, transform: [{ rotate: "135deg" }] }}
						color={colors.primary}
						size={14}
					/>
					<Paragraph>{Object.keys(workoutDay.workouts).length} övningar</Paragraph>
				</View>
				{workoutDay.workouts.map((workout: any, index: number) => (
					<View key={index}>
						<ListItemBasic
							titleZtyle={{ marginLeft: -7 }}
							key={index}
							title={workout.name}
						/>
						{index + 1 !== workoutDay.workouts.length && <Divider />}
					</View>
				))}
				<View
					style={{
						paddingTop: 50,
						flexDirection: "row",
						alignItems: "flex-end",
						flexGrow: 1,
					}}>
					<Button
						style={{
							backgroundColor: "lightgrey",
							marginRight: 10,
							marginBottom: 20,
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
						style={{ flex: 1 }}>
						Påbörja träningspass
					</Button>
				</View>
			</ParallaxScrollView>
		</View>
	);
};

export default WorkoutOverviewScreen;

const styles = StyleSheet.create({
	count: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
});
