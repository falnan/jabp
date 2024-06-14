import InputText, { InputSelect } from "@/components/input";
import ModalAlert from "@/components/modal";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Network from "expo-network";

interface Values {
  customer: string;
  via: "" | "ship" | "plane";
  number: number;
  weight: number;
  price: number;
}

export default function Index() {
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [error, setError] = useState(false);
  const [values, setValues] = useState<Values>({
    customer: "",
    number: 0,
    weight: 0,
    via: "",
    price: 0,
  });
  const [network, setNetwork] = useState<any>(undefined);

  function handleChange(val: any, name: any) {
    setValues((values: any) => ({ ...values, [name]: val }));
  }

  async function fetchNetwork() {
    try {
      const response = await Network.getNetworkStateAsync();
      setNetwork(response);
    } catch (err) {}
  }

  function handleSubmit() {
    fetchNetwork();
    if (network && network.isConnected && network.isConnected == true) {
      if (
        values.customer == "" ||
        values.number == 0 ||
        values.weight == 0 ||
        values.via == "" ||
        values.price == 0
      ) {
        // console.log("jangan kirim");
        setError(true);
      } else {
        // console.log("kirim");
        const fetchData = async () => {
          try {
            const response = await fetch(
              `https://docs.google.com/forms/u/0/d/e/1FAIpQLSdVwpUoQRIaZexemwMGClugw1JJg0PllArFglSAv2iBedWY0A/formResponse?entry.1386138496=${values.customer}&entry.1975525046=${values.weight}&entry.2112082106=${values.number}&entry.171654856=${values.via}&entry.187924079=${values.price}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // const data = await response.json();
          } catch (err: any) {
            // setError(err);
          }
        };
        setAlert(true);
        setError(false);
        fetchData();
      }
    } else {
      setAlert2(true);
    }
  }

  function handleModalOkay() {
    setAlert(false);
    setValues({ customer: "", via: "", number: 0, weight: 0, price: 0 });
  }
  return (
    <ScrollView>
      <ModalAlert visible={alert2} onRequestClose={() => setAlert2(false)}>
        <View>
          <Text style={{ textAlign: "center" }}>Tidak ada jaringan!</Text>
        </View>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: "#007bff", marginTop: 10, paddingVertical: 10 },
          ]}
          onPress={() => setAlert2(false)}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Okay</Text>
        </Pressable>
      </ModalAlert>
      <ModalAlert visible={alert} onRequestClose={() => setAlert(false)}>
        <View>
          <Text style={styles.modalText}>Data berhasil dimasukkan!</Text>
          <Text>Nama:{"  " + values.customer}</Text>
          <Text>Jumlah Barang:{"  " + values.number}</Text>
          <Text>Berat:{"  " + values.weight}</Text>
          <Text>Via:{"  " + values.via}</Text>
          <Text>Harga:{"   Rp" + values.price}</Text>
        </View>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: "#007bff", marginTop: 10, paddingVertical: 10 },
          ]}
          onPress={handleModalOkay}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Okay</Text>
        </Pressable>
      </ModalAlert>
      <View style={styles.heading1}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Masukkan Info Produk
        </Text>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ paddingVertical: 25, flex: 1, gap: 10 }}>
          <InputText
            name="Nama Customer"
            handleChange={(val: any) => handleChange(val, "customer")}
            value={values.customer}
            error={error}
          />
          <InputText
            name="Jumlah Barang"
            handleChange={(val: any) => handleChange(val, "number")}
            inputMode="numeric"
            value={values.number}
            error={error}
          />
          <InputText
            name="Berat (Kg)"
            handleChange={(val: any) => handleChange(val, "weight")}
            inputMode="numeric"
            value={values.weight}
            error={error}
          />
          <InputSelect
            name="Jalur"
            handleChange={(val: any) => handleChange(val, "via")}
            value={values.via}
            error={error}
          >
            <Picker.Item label="--Pilih--" value="" />
            <Picker.Item label="Kapal" value="kapal" />
            <Picker.Item label="Pesawat" value="pesawat" />
          </InputSelect>
          <InputText
            name="Harga"
            handleChange={(val: any) => handleChange(val, "price")}
            inputMode="numeric"
            value={values.price}
            error={error}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading1: {
    alignItems: "center",
    paddingVertical: 70,
    paddingHorizontal: 70,
  },
  inputText: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 6,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "gray",
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#28a745",
    borderRadius: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
});
