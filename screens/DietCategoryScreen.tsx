import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { SceneMap } from "react-native-tab-view";
import ListItem from "../components/common/ListItem";
import ListItemBasic from "../components/common/ListItemBasic";
import TabBarView from "../components/common/TabBarView";
import { Product } from "../types/types";
import { Paragraph } from "../typography";

interface DietCategoryProps {
	navigation: any;
	route: any;
}

const DietCategoryScreen: React.FC<DietCategoryProps> = ({ navigation, route }) => {
	const { meal } = route.params;
	const { colors, roundness } = useTheme();

	const FirstRoute = () => (
		<View style={{ flex: 1 }}>
			{meal.products[0].description ? (
				meal?.products?.map((dish: any, index: number) => (
					<ListItem
						key={index}
						title={dish?.name}
						icon='fire'
						description={`${dish?.kcal} kcal`}
						onPress={() => navigation.navigate("Recipe", { dish: dish })}
					/>
				))
			) : (
				<View>
					<Paragraph style={{ textAlign: "center", marginTop: 50 }}>
						Inga recept!
					</Paragraph>
					<MaterialCommunityIcons
						name='food-off-outline'
						size={40}
						color={colors.text}
						style={{
							alignSelf: "center",
							margin: 20,
						}}
					/>
				</View>
			)}
		</View>
	);

	const SecondRoute = () => (
		<View style={{ borderRadius: 20, backgroundColor: colors.surface }}>
			{!meal.products[0]?.description ? (
				meal?.products?.map((product: Product, index: number) => (
					<View key={index}>
						<ListItemBasic
							style={{ padding: 10, marginRight: 10 }}
							title={product.name}
							descriptionLeft={`${product.gram}g`} // dot: \u00B7
							descriptionRight={`${product.kcal} kcal`}
						/>
						{meal?.products?.length !== index + 1 && (
							<Divider style={{ width: "93%", alignSelf: "center" }} />
						)}
					</View>
				))
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
		</View>
	);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	const [routes] = useState([
		{ key: "first", title: "Recept" },
		{ key: "second", title: "Ingredienser" },
	]);

	return (
		<View style={{ paddingHorizontal: 20, backgroundColor: colors.background, flex: 1 }}>
			<TabBarView renderScene={renderScene} routes={routes} />
		</View>
	);
};

export default DietCategoryScreen;
