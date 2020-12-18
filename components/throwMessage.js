import React from "react";
import { Snackbar } from "react-native-paper";
import { Text } from "react-native";

export default function ThrowMessage(props) {
  const [visible, setVisible] = React.useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      style={{ backgroundColor: "#E57373" }}
      action={{
        label: <Text style={{ color: "#FDFEFE" }}>OK</Text>,
        onPress: () => {
          setVisible(false);
        },
      }}
    >
      <Text style={{ color: "#7A0606" }}>{props.message}</Text>
    </Snackbar>
  );
}
