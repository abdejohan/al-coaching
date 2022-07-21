import DropDownPicker, { ValueType } from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { TextStyle, View } from "react-native";
import Text from "./Text";

interface DropDownButtonProps {
	title?: string;
	selectableItems: Array<object>;
	customStyle?: TextStyle;
}

const DropDownButton: React.FC<DropDownButtonProps> = (props) => {
	const { selectableItems, customStyle, title } = props;
	const [items, setItems] = useState(selectableItems);
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<ValueType | null>(null);
	const theme = useTheme();

	return (
		<View style={{ marginVertical: 10 }}>
			{title && <Text type='title'>{title}</Text>}
			<DropDownPicker
				style={[{ backgroundColor: theme.colors.surface, borderRadius: 5 }, customStyle]}
				dropDownContainerStyle={{ backgroundColor: theme.colors.surface }}
				textStyle={{ color: theme.colors.text }}
				placeholder='Klick här för att välja'
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				listMode='SCROLLVIEW'
				{...props}
			/>
		</View>
	);
};

export default DropDownButton;
