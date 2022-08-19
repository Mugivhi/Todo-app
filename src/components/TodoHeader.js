import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React,{useRef, useState} from "react";
import {firebase} from '../../config'
import { addTask } from "../redux/taskSlice";

import { useDispatch } from "react-redux";

const TodoList = () => {
  const dispatch = useDispatch();
  
  const [todo, setTodo] = useState("");
  const todoRef=firebase.firestore().collection('todos')
  const [addData,setAddData]=useState('');
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
  // const onDelete = (id) => {
  //   dispatch(
  //     deleteTask({
  //       id: id,
  //     })
  //   );
  // };
  const addField=()=>{
    if (addData && addData.length>0){
      // timestamp
      const timestamp= firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        todoTask:addData,
        createdAt:timestamp,
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
 
  const onPress = ()=>{
    addField();
    onSubmitTask();

  };
  const onChangeText=()=>{
    setAddData();
    setTodo();
  }
  //renderItem function with a delete button
  return (
    <View>
    <Text
      style={styles.text1}
    >
      Todo List
    </Text>
    <View
      style={styles.view2}
    >
      {/* TextInput */}
      <TextInput
        style={styles.textInput}
        placeholder="Add todo"
        onChangeText={setTodo}
        // onChangeText={setAddData}
        // onChangeText={onChangeText}
        value={todo}
        // value={addData}
      />
      {/* Button */}
      <TouchableOpacity
        style={styles.buttons}
        onPress={onSubmitTask}
        // onPress={addField}
        // calling two functions
        // onPress={onPress}
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
  buttons:{
    backgroundColor: "black",
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 5,
    alignItems: "center",
  },
  textInput:{
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: "90%",
    borderRadius: 5,
  },
  text1:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  view2:{

    justifyContent: "center",
    alignItems: "center",
   
  },
});