import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import React, { useState } from "react";
import {firebase} from "../../config";
import { addTask } from "../redux/taskSlice";
//Ionicons
import { Ionicons } from "@expo/vector-icons";
//import useSelector from "react-redux";lea
import { useSelector } from "react-redux";
import { deleteTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";

const TodoList = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const todos = useSelector((state) => state.tasks);
  const todoRef=firebase.firestore().collection('todos')
  const [addData,setAddData]=useState('');
  
  // add new field
  const addField=()=>{
    if (addData && addData.length>0){
      // timestamp
      const timestamp= firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading:addData,
        createdAt:timestamp
      };
      todoRef
      .add(data)
      .then(()=>{
        //release new field state
        setAddData('');
      })
      .catch((error)=>{
        alert(error);
      })
    }
  }
  // console.log(todos);
  // const data = [
  //   {
  //     id: 1,
  //     title: "Learn React Native",
  //   },
  //   {
  //     id: 2,
  //     title: "Learn Redux Toolkit",
  //   },
  // ];

  //delete item by checking if id is equal to the id of the item
  const onDelete = (id) => {
    dispatch(
      deleteTask({
        id: id,
      })
    );
  };

  const onSubmitTask = () => {
    if (todo.trim().length === 0) {
      Alert.alert("You need to enter a task");
      setTodo("");
      return;
    }

    dispatch(
      addTask({
        task: todo,
      })
    );
    setTodo("");
  };

  //renderItem function with a delete button
  const renderItem = ({ item }) => {
    return (
  <View>
      <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash" size={30} color="red" />
      </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      </View>
    );
  };
    return (
      <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Todo List
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* TextInput */}
        <TextInput
          style={{
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            margin: 10,
            width: "90%",
            borderRadius: 5,
          }}
          placeholder="Add todo"
          // onChangeText={setTodo}
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
        />
        {/* Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            padding: 10,
            margin: 10,
            width: "90%",
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={addField}
        >
          <Text style={{ color: "white" }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  };
  

export default TodoList;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#e9e9e9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  delete: {
    fontSize: 24,
    color: "red",
  },
});
  