import { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Select, FormLabel } from "@chakra-ui/react";

const TaskDialog = ({ isOpen, onClose, task, updateTask }) => {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (task) {
      setDescription(task.text);
      setStatus(task.completed ? "completed" : "todo");
    }
  }, [task]);

  const handleSave = () => {
    updateTask({ ...task, text: description, completed: status === "completed" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Description</FormLabel>
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <FormLabel mt={4}>Status</FormLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="completed">Completed</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskDialog;
