import React, { useState, useCallback } from 'react';
import { Box, List, ListItem, Checkbox, IconButton, Input, Button, VStack, Menu, MenuButton, MenuList, MenuItem, Tooltip } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaEllipsisV } from 'react-icons/fa';

const TodoList = ({ tasks, onAddTask, onDeleteTask, onToggleTask, onEditTask }) => {
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleAddTask = useCallback(() => {
    if (taskInput.trim()) {
      onAddTask(taskInput);
      setTaskInput(''); // Clear input after adding a task
    }
  }, [taskInput, onAddTask]);

  const handleUpdateTask = useCallback(() => {
    if (editInput.trim()) {
      onEditTask(editTaskId, editInput);
      setEditTaskId(null); // Clear edit state
      setEditInput(''); // Clear input field
    }
  }, [editInput, editTaskId, onEditTask]);

  return (
    <Box mt={5}>
      <VStack spacing={4} mb={4} align="stretch">
        <Input
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddTask}>
        <Tooltip label="Add Task" placement="bottom" hasArrow>
          Add Task
          </Tooltip>
        </Button>
      </VStack>
      <List spacing={3}>
        {tasks.length === 0 ? (
          <ListItem>No tasks available. Please add a task.</ListItem>
        ) : (
          tasks.map((task) => (
            <ListItem key={task.id} display="flex" alignItems="center">
              <Checkbox
                isChecked={task.completed}
                onChange={() => onToggleTask(task.id)}
                mr={3}
              />
              {editTaskId === task.id ? (
                <>
                  <Input
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    placeholder="Edit your task"
                    size="sm"
                    mr={3}
                  />
                  <Button colorScheme="teal" onClick={handleUpdateTask}>
                    Update
                  </Button>
                </>
              ) : (
                <>
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.text}
                  </span>
                  <Menu>
                    <MenuButton as={IconButton} icon={<FaEllipsisV />} aria-label="Options" ml="auto" />
                    <MenuList>
                      <MenuItem
                        icon={<FaEdit />}
                        onClick={() => {
                          setEditTaskId(task.id);
                          setEditInput(task.text);
                        }}
                      >
                        Edit Task
                      </MenuItem>
                      <MenuItem
                        icon={<FaTrash />}
                        color="red.500"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        Delete Task
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

// Memoizing the component to prevent unnecessary re-renders
export default React.memo(TodoList);
