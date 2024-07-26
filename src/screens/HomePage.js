import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { collection, addDoc, getDocs,doc,deleteDoc, updateDoc} from "firebase/firestore"; 
import { db } from '../../firebaseConfig'; // db'nin doğru import edildiğinden emin olun
import { CustomButton } from '../components';

const HomePage = () => {
  const [data, setData] = useState([]);

  // SEND DATA
  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "Player"), {
        name: "Arda",
        surname: "Güler",
        team: "Real Madrid",
        age: 18
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // GET DATA FROM FIREBASE
  const getData = async () => {
    const allData=[]
    try {
      const querySnapshot = await getDocs(collection(db, "Player"));
      querySnapshot.forEach((doc) => {
        allData.push(doc.data());
      });
      setData(allData);

    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  };

  // DELETE DATA FROM DATABASE
  const deleteData =async() =>{
    await deleteDoc(doc(db, "Player", "fzlTOQDLan74RjpuUAZP"));
  };
  
  //UPDATE FROM DATA
  const updateDatabase=async()=>{
  try {
    const playerData = doc(db, "Player", "GOKfU16mBfCqjpgC4piR");

   await updateDoc(playerData, {
  age: 19
});
  } catch (error) {
    console.log(error)
  }
  

  }

  return (
    <View style={styles.container}>
      <Text style='text-align-center'>HomePage</Text>

      {data.map((item, index) => (
        <View key={index}>
          <Text>Name: {item.name}</Text>
          <Text>Surname: {item.surname}</Text>
          <Text>Team: {item.team}</Text>
          <Text>Age: {item.age}</Text>
        </View>
      ))}

      <CustomButton
        buttonText={"Save"}
        setwidth={'%40'}
        buttonColor={'navy'}
        pressedButtonColor={'blue'}
        handleOnPress={sendData}
      />

      <CustomButton
        buttonText={"Get Data"}
        setwidth={'%40'}
        buttonColor={'navy'}
        pressedButtonColor={'blue'}
        handleOnPress={getData}
      />

<CustomButton
        buttonText={"Delete Data"}
        setwidth={'%40'}
        buttonColor={'navy'}
        pressedButtonColor={'blue'}
        handleOnPress={deleteData}
      />

<CustomButton
        buttonText={"Update Data"}
        setwidth={'%40'}
        buttonColor={'navy'}
        pressedButtonColor={'blue'}
        handleOnPress={updateDatabase}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffebcd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
