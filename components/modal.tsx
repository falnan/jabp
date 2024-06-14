import { Modal, StyleSheet, View } from "react-native";

interface ModalAlert {
  animationType?: "none" | "fade" | "slide";
  transparent?: boolean;
  onRequestClose?: any;
  visible: any;
  children: any;
}

export default function ModalAlert({
  animationType = "none",
  transparent = true,
  onRequestClose,
  visible,
  children,
}: ModalAlert) {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    width: "auto",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
