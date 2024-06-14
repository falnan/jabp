import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface Input {
  name: string;
  handleChange: any;
  inputMode?: any;
  value: any;
  error: any;
  children: any;
}

export default function InputText({
  name,
  inputMode,
  handleChange,
  value,
  error,
}: Omit<Input, "children">) {
  return (
    <View>
      <Text> {name}</Text>
      <TextInput
        id={name}
        style={[
          styles.inputText,
          error == true && value == 0
            ? { borderColor: "red" }
            : { borderColor: "gray" },
        ]}
        onChangeText={handleChange}
        inputMode={inputMode}
        value={value == 0 ? "" : value}
      />
      {error == true && value == 0 && (
        <Text style={{ color: "red" }}>*harus diisi</Text>
      )}
    </View>
  );
}

export function InputSelect({
  name,
  handleChange,
  value,
  error,
  children,
}: Omit<Input, "inputMode">) {
  return (
    <View>
      <Text> {name}</Text>
      <View
        style={[
          styles.inputSelect,
          error == true && value == 0
            ? { borderColor: "red" }
            : { borderColor: "gray" },
        ]}
      >
        <Picker
          // style={{ height: 45 }}
          selectedValue={value}
          onValueChange={handleChange}
        >
          {children}
        </Picker>
      </View>
      {error == true && value == 0 && (
        <Text style={{ color: "red" }}>*harus diisi</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 6,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  inputSelect: {
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 1,
  },
});
