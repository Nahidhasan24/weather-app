import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  Button,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";

const index = () => {
  const [location, setLocation] = useState("Dhaka");
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newLocation, setNewLocation] = useState(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=288a1a6e7be54034ba7101040253101&q=${location}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLocationChange = () => {
    setLocation(newLocation);
    toggleModal(); // Close the modal after updating the location
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6200EE" />

      <View style={styles.header}>
        <Text style={styles.text}>Weather</Text>
        <EvilIcons
          name="location"
          size={30}
          color="white"
          style={{ marginEnd: 10 }}
          onPress={toggleModal} // Open the modal when the icon is clicked
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardContainer}>
          {data && data.current && (
            <Image
              source={{ uri: `https:${data.current.condition.icon}` }}
              style={{
                width: "80%",
                height: "80%",
              }}
            />
          )}
        </View>
        <View style={styles.cardTextContainer}>
          {data ? (
            <>
              <Text style={styles.weatherText}>
                Location
                <Text style={{ color: "black" }}> : {data.location.name}</Text>
              </Text>
              <Text style={styles.weatherText}>
                Temperature
                <Text style={{ color: "black" }}>
                  {" "}
                  : {data.current.temp_c}°C
                </Text>
              </Text>
              <Text style={styles.weatherText}>
                Country
                <Text style={{ color: "black" }}>
                  {" "}
                  : {data.location.country}
                </Text>
              </Text>
              <Text style={styles.weatherText}>
                Sky
                <Text style={{ color: "black" }}>
                  {" "}
                  : {data.current.condition.text}
                </Text>
              </Text>
            </>
          ) : (
            <Text style={styles.weatherText}>Loading...</Text>
          )}
        </View>
      </View>

      {/* Modal for location input */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Location</Text>
          <TextInput
            style={styles.input}
            value={newLocation}
            onChangeText={setNewLocation}
            placeholder="Enter location"
          />
          <Button title="Check" onPress={handleLocationChange} />
        </View>
      </Modal>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#6200EE",
    width: "100%",
    height: 70,
    position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginStart: 10,
  },
  card: {
    flexDirection: "row",
    width: "95%",
    height: "20%",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 80,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
  },
  weatherText: {
    color: "gray",
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
