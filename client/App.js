import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Task from './components/Task';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import InputTask from './components/InputTask';

export default function App() {
  const [task, setTask] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    debugger;
    if (task.length === 0) {
      fetchData();
    }
  }, [task]);

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/task/1/");
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  }
  

  function clearTask(id) {
    setTask(task.filter((task) => task.id !== id));
  }


  function toggleTask(id) {
    setTask(
      task.map((task) => task.id === id ?
        { ...task, completed: task.completed === 1 ? 0 : 1 }
        : task
      )
    );
  }

  return (
    <BottomSheetModalProvider>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={task}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => (
            <Task {...item} toggleTask={toggleTask} clearTask={clearTask} />
          )}
          ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
        />
        <InputTask task={task} setTask={setTask} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerSytle: {
    padding: 15,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 15,
    marginTop: 30,
  }
});
