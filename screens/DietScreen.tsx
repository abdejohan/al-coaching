import { StyleSheet, ScrollView, View } from "react-native";
import { ActivityIndicator, Card, useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";
import diet_rest_day from "../assets/images/diet_rest_day.jpg";
import diet_workout_day from "../assets/images/diet_workout_day.jpg";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Meal, Product, WorkoutDay } from "../types/types";
import { Paragraph, Subheading } from "../typography";

interface DietProps {
	navigation: any;
}

const DietScreen: React.FC<DietProps> = ({ navigation }) => {
	const [workoutDays, setWorkoutDays] = useState<Array<WorkoutDay>>();
	const { useAxios } = useAxiosAuthenticated();
	const { colors } = useTheme();
	const [{ data: dietData, loading: dietLoading, error: dietError }] = useAxios({
		method: "POST",
		url: "/diet/list",
	});

	useEffect(() => {
		if (dietData) {
			setWorkoutDays(dietData[0]?.diet_days);
		}
	}, [dietData]);

	const totalDailyCalories = (meals: Array<Meal>) => {
		let calorieCount = 0;
		meals?.forEach((meal: Meal) => {
			meal?.products?.forEach((product: Product) => {
				calorieCount += product.kcal;
			});
		});
		return calorieCount;
	};

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
			{dietLoading && (
				<ActivityIndicator
					animating={dietLoading}
					color={colors.primary}
					size='large'
					style={{ marginTop: 100 }}
				/>
			)}
			{workoutDays &&
				!dietLoading &&
				workoutDays?.map((day: WorkoutDay, index: number) => (
					<Card
						key={index}
						style={{ marginBottom: 10, elevation: 0 }}
						onPress={() =>
							navigation.navigate("DietCategories", {
								meals: day.meals,
								totalDailyCalories: totalDailyCalories(day.meals),
							})
						}>
						<Card.Cover source={index === 0 ? diet_workout_day : diet_rest_day} />
						<Card.Actions style={{ padding: 0, paddingTop: 10, paddingRight: 10 }}>
							<ListItem
								title={day.name}
								description={`${totalDailyCalories(day.meals)} kalorier`}
								icon='fire'
							/>
						</Card.Actions>
					</Card>
				))}
			{!workoutDays && !dietLoading && (
				<View style={{ paddingTop: 50 }}>
					<Subheading style={{ textAlign: "center", fontSize: 16, marginBottom: 5 }}>
						Hittade inget!
					</Subheading>
					<Paragraph style={{ textAlign: "center", paddingHorizontal: 40 }}>
						Tråkigt nog ser det ut som att du inte har några kostscheman för tillfället.
					</Paragraph>
					<Paragraph style={{ textAlign: "center" }}>
						Kontakta din coach för mer information!
					</Paragraph>
					<MaterialCommunityIcons
						name='food-turkey'
						color={colors.text}
						size={40}
						style={{
							alignSelf: "center",
							margin: 5,
							marginTop: 50,
						}}
					/>
				</View>
			)}
		</ScrollView>
	);
};

export default DietScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
