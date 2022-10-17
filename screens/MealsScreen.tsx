import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";

interface DietProps {
	navigation: any;
	route: any;
}

const MealsScreen: React.FC<DietProps> = ({ navigation, route }) => {
	const { colors } = useTheme();
	const { meals } = route.params;

	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
			{meals?.map((day: any, index: string) => (
				<ListItem
					key={index}
					title={day?.name}
					icon='fire'
					onPress={() =>
						navigation.navigate("Ingredients", {
							ingredients: day?.products,
							name: day?.name,
							comment: day?.comment,
						})
					}
				/>
			))}
		</ScrollView>
	);
};

export default MealsScreen;

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

/**
 * 	const totalDailyCalories = (meals: Array<Meal>) => {
		let calorieCount = 0;
		meals?.forEach((meal: Meal) => {
			meal?.products?.forEach((product: Product) => {
				calorieCount += product.kcal;
			});
		});
		return calorieCount;
	};
 * 
 * 
 * 
 * 	const totalMealCalories = (products: Array<Product>) => {
		let mealCalorieCount = 0;
		products?.forEach((product: Product) => {
			mealCalorieCount += product.kcal;
		});
		if (isFinite(mealCalorieCount)) {
			return mealCalorieCount;
		}
		return 0;
	};

	const totalMealCaloriePercentage = (products: Array<Product>) => {
		let productCalorieCount = 0;
		products?.forEach((product: Product) => {
			productCalorieCount += product.kcal;
		});
		const perc = (productCalorieCount / totalDailyCalories) * 100; // calculate percentage
		const roundedPercentage = Math.round(perc * 10) / 10; // rounds to one decimal
		if (isFinite(roundedPercentage)) {
			return roundedPercentage;
		}
		return 0;
	};
 */
