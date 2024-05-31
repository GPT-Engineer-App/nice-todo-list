import { useState } from "react";
import { Container, VStack, HStack, Input, Button, IconButton, Text, Checkbox, useDisclosure, Box } from "@chakra-ui/react";
import TaskDialog from "../components/TaskDialog";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
    setTasks(newTasks);
  };

  const openTaskDialog = (task, index) => {
    setCurrentTask({ ...task, index });
    onOpen();
  };

  const updateTask = (updatedTask) => {
    const newTasks = tasks.map((task, i) => (i === updatedTask.index ? updatedTask : task));
    setTasks(newTasks);
  };

  return (
    <Box backgroundImage="url('https://source.unsplash.com/random')" backgroundSize="cover" backgroundPosition="center" width="100%" height="100vh">
      <Box backgroundImage="url('https://source.unsplash.com/random')" backgroundSize="cover" backgroundPosition="center" width="100%" height="100vh">
        <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <VStack spacing={4} width="100%">
            <Text fontSize="2xl">Todo List</Text>
            <HStack width="100%">
              <Input placeholder="Add a new task" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
              <Button onClick={addTask} colorScheme="red">
                Add Task
              </Button>
            </HStack>
            <VStack spacing={2} width="100%">
              {tasks.map((task, index) => (
                <HStack key={index} width="100%" justifyContent="space-between">
                  <Box onClick={() => openTaskDialog(task, index)} cursor="pointer" flex="1">
                    <Checkbox isChecked={task.completed} onChange={() => toggleTaskCompletion(index)}>
                      {task.text}
                    </Checkbox>
                  </Box>
                  <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => deleteTask(index)} />
                </HStack>
              ))}
            </VStack>
          </VStack>
          <TaskDialog isOpen={isOpen} onClose={onClose} task={currentTask} updateTask={updateTask} />
        </Container>
      </Box>
    </Box>
  );
};

export default Index;
