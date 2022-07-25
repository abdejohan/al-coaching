import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import ListItemBasic from "../components/common/ListItemBasic";
import { Paragraph, Subheading, Text } from "../typography";

interface DietCategoryProps {
	navigation: any;
	route: any;
}

const calculateTotalNutrientValue = (ingredients: Array<any>, unit: string) => {
	const sumOfNutrient = ingredients.reduce((accumulator, ingredient) => {
		return accumulator + ingredient[unit];
	}, 0);
	return sumOfNutrient;
};

const IngredientsScreen: React.FC<DietCategoryProps> = ({ navigation, route }) => {
	const { meals } = route.params;
	const { colors, roundness } = useTheme();

	return (
		<ScrollView
			contentContainerStyle={{ padding: 20, paddingBottom: 200 }}
			style={{
				backgroundColor: colors.background,
				flex: 1,
			}}>
			{meals ? (
				<>
					<View style={{ borderRadius: roundness, backgroundColor: colors.surface }}>
						{meals?.map((meal: any) => {
							return meal?.products?.map((ingredient: any, index: number) => (
								<View key={index}>
									<ListItemBasic
										style={{ padding: 10, marginRight: 10 }}
										title={ingredient.name}
										descriptionLeft={`${ingredient.gram}g`} // dot: \u00B7
										descriptionRight={`${ingredient.kcal} kcal`}
									/>
									{meal?.products?.length !== index + 1 && (
										<Divider style={{ width: "93%", alignSelf: "center" }} />
									)}
								</View>
							));
						})}
					</View>
					<View style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}>
						<Subheading>
							{`${calculateTotalNutrientValue(
								meals[0].products,
								"carbs"
							)}g Kolhydrater \u00B7 `}
						</Subheading>
						<Subheading>
							{`${calculateTotalNutrientValue(meals[0].products, "fat")}g Fett \u00B7 `}
						</Subheading>
						<Subheading>
							{`${calculateTotalNutrientValue(meals[0].products, "protein")}g Protein`}
						</Subheading>
					</View>
				</>
			) : (
				<View>
					<Paragraph style={{ textAlign: "center", marginTop: 50 }}>
						Inga ingredienser!{" "}
					</Paragraph>
					<MaterialCommunityIcons
						name='food-drumstick-off-outline'
						size={40}
						color={colors.text}
						style={{ alignSelf: "center", margin: 20 }}
					/>
				</View>
			)}
		</ScrollView>
	);
};

export default IngredientsScreen;
