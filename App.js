import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { FlatList, StyleSheet, Text, View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodos from "./components/addTodos";
import SandBox from './components/sandBox';
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [todos, setTodos] = useState (
    [
      {text: 'Breakfast', key: 1},
      {text: 'Wadhu and Prayer', key: 2},
      {text: 'Home Work', key: 3},
    ]
  );
  const pressHandler=(key) => {
    setTodos((prevTodos) =>{
      return prevTodos.filter(todo=> todo.key != key);
    })
  }
  const submitHandler = (text) => {
    if(text.length>3)
    {
        setTodos((prevTodos)=>{
          return [
            {text: text, key: Math.random()},
            ...prevTodos
          ];
        });
    }
    else{
      Alert.alert('OOPS!', 'Todos must be over 3 chars long', [
        {text: 'understood', onPress: ()=> console.log('alert closed')}
      ]);
    }
  }

  return (
    // <SandBox/>
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodos submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({item}) => (
                <TodoItem 
                item={item} 
                pressHandler={pressHandler}
                />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex:1, 
    // backgroundColor: 'lime',
    padding: 40,
  },
  list: {
    flex:1,
    marginTop: 20,
    // backgroundColor: 'yellow',
  }
});
