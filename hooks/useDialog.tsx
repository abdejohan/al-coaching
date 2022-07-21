import React, { useState } from "react";
import { Portal, Dialog, Button } from "react-native-paper";

export const useDialog = () => {
	const [visible, setVisible] = useState(false);

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	const DialogBox = ({ children, noCancel }: any) => {
		return (
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Content>{children}</Dialog.Content>
					<Dialog.Actions style={{ padding: 0 }}>
						{!noCancel && (
							<Button
								mode='text'
								onPress={hideDialog}
								style={{ marginRight: 20, marginBottom: 10 }}>
								Avbryt
							</Button>
						)}
					</Dialog.Actions>
				</Dialog>
			</Portal>
		);
	};

	return { showDialog, hideDialog, DialogBox };
};
