import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  Input,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi'
import Sidebar from './Sidebar'; // Import the Sidebar component
import TodoList from './ToDoList'; // Import the TodoList component

// Memoize the TodoList component to avoid unnecessary re-renders
const MemoizedTodoList = React.memo(TodoList);

function ListManager({ isOpen }) {
  const [lists, setLists] = useState([{ id: Date.now(), name: 'My Tasks', tasks: [] }]);
  const [currentListId, setCurrentListId] = useState(lists[0].id);

  // Modal states
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [newListName, setNewListName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedListForTask, setSelectedListForTask] = useState(currentListId);

  // Memoize the lists to avoid unnecessary sorting every render
  const sortedLists = useMemo(() => {
    return [...lists].sort((a, b) => a.name.localeCompare(b.name));
  }, [lists]);

  // useCallback to memoize functions and avoid recreating on each render
  const handleAddList = useCallback(() => {
    if (newListName.trim()) {
      const newList = { id: Date.now(), name: newListName, tasks: [] };
      setLists((prevLists) => [...prevLists, newList]); // Use functional updates to avoid dependency
      setNewListName('');
      setCurrentListId(newList.id);
      setSelectedListForTask(newList.id);
      setIsListModalOpen(false);
    }
  }, [newListName]);

  const handleSwitchList = useCallback((id) => {
    setCurrentListId(id);
    setSelectedListForTask(id); // Sync selected list for task modal
  }, []);

  const handleDeleteList = useCallback((id) => {
    if (id !== lists[0].id) {
      setLists((prevLists) => prevLists.filter((list) => list.id !== id));
      if (currentListId === id) {
        setCurrentListId(lists[0].id);
        setSelectedListForTask(lists[0].id);
      }
    }
  }, [currentListId, lists]);

  const handleAddTask = useCallback((taskText, listId) => {
    if (taskText.trim()) {
      setLists((prevLists) =>
        prevLists.map((list) => {
          if (list.id === listId) {
            return { ...list, tasks: [...list.tasks, { id: Date.now(), text: taskText, completed: false }] };
          }
          return list;
        })
      );
      setNewTaskName(''); // Clear task input after adding
    }
  }, []);

  const handleModalAddTask = useCallback(() => {
    if (newTaskName.trim()) {
      setLists((prevLists) =>
        prevLists.map((list) => {
          if (list.id === selectedListForTask) {
            return {
              ...list,
              tasks: [...list.tasks, { id: Date.now(), text: newTaskName, completed: false }]
            };
          }
          return list;
        })
      );
      setNewTaskName('');
      setIsTaskModalOpen(false); // Close modal
    }
  }, [newTaskName, selectedListForTask]);

  const handleToggleTask = useCallback((taskId) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === currentListId) {
          return {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          };
        }
        return list;
      })
    );
  }, [currentListId]);

  const handleEditTask = useCallback((taskId, newText) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === currentListId) {
          return {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === taskId ? { ...task, text: newText } : task
            ),
          };
        }
        return list;
      })
    );
  }, [currentListId]);

  const handleDeleteTask = useCallback((taskId) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === currentListId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== taskId),
          };
        }
        return list;
      })
    );
  }, [currentListId]);

  return (
    <Box display="flex" overflow="auto">
      {/* Sidebar */}
      <Sidebar
        lists={sortedLists}
        currentListId={currentListId}
        onSwitchList={handleSwitchList}
        onDeleteList={handleDeleteList}
        onAddTask={() => setIsTaskModalOpen(true)} // Open task modal
        onOpenListModal={() => setIsListModalOpen(true)} // Open list modal
        isOpen={isOpen}
      />

      {/* Main Content Area */}
      <Box marginLeft={isOpen ? '250px' : '0'} width="100%" p={5} mt={5} transition="margin-left 0.3s ease-in-out">
        <Box width="100%" p={5} mt={5}>
          <Flex direction="row" flexWrap="none" justifyContent="flex-start" gap={5} overflowX="visible">
            {sortedLists.map((list) => (
              <Box
                key={list.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                width="400px"
                height="520px"
                boxShadow="md"
                flexShrink={0}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Heading as="h3" size="md" mb={3}>{list.name}</Heading>
                  <Menu>
                    <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" aria-label="Options" mb={2} />
                    <MenuList>
                      <MenuItem onClick={() => handleDeleteList(list.id)}>
                        <FaTrash style={{ marginRight: '8px' }} />
                        Delete List
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
                <Box maxH="420px" overflowY="auto" borderWidth="1px" borderRadius="md" p={4}>
                  <MemoizedTodoList
                    tasks={list.tasks}
                    onAddTask={(taskText) => handleAddTask(taskText, list.id)}
                    onDeleteTask={handleDeleteTask}
                    onToggleTask={handleToggleTask}
                    onEditTask={handleEditTask}
                  />
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Create New List Modal */}
      <Modal isOpen={isListModalOpen} onClose={() => setIsListModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="New List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddList}>
              Create List
            </Button>
            <Button variant="ghost" onClick={() => setIsListModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create New Task Modal */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Add Task"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <Select
              mt={3}
              value={selectedListForTask}
              onChange={(e) => setSelectedListForTask(Number(e.target.value))}
            >
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleModalAddTask}>
              Add Task
            </Button>
            <Button variant="ghost" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ListManager;
