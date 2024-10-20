import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Spacer,
  Tooltip,
} from '@chakra-ui/react';
import { FaPlus, FaCaretDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

// React.memo to prevent unnecessary re-renders
function Sidebar({ lists, currentListId, onSwitchList, onAddTask, onOpenListModal, isOpen, onToggle, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Memoize the toggle dropdown function to prevent re-creation
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prevState => !prevState);
  }, []);

  // Close the sidebar if the location changes away from /listmanager
  useEffect(() => {
    if (location.pathname !== '/listmanager' && isOpen) {
      onToggle();
    }
  }, [location.pathname, isOpen, onToggle]);

  return (
    <Box
      width="250px"
      height="calc(100vh - 50px)"
      bg="gray.100"
      p={4}
      position="fixed"
      top="50px"
      boxShadow="md"
      mt="22px"
      zIndex={1}
      visibility={isOpen ? 'visible' : 'hidden'} // Toggle visibility instead of display
      opacity={isOpen ? 1 : 0} // Adjust opacity for smooth transition
      transform={isOpen ? 'translateX(0)' : 'translateX(-250px)'} // Translate sidebar based on isOpen state
      transition="transform 0.2s ease-in-out, opacity 0.2s ease-in-out, visibility 0.2s ease-in-out" // Reduce transition times for faster paint
    >
      <VStack spacing={4} align="stretch">
        {/* Create Task Button */}
        <Tooltip label="Create Task" placement="bottom" hasArrow>
        <Button 
          leftIcon={<FaPlus style={{ fontSize: '20px', color: 'white' }} />}
          colorScheme="teal"
          borderRadius="full"
          width="full"
          onClick={onAddTask}
          mt="50px"
        >
          Create Task
        </Button>
</Tooltip>
        <Heading as="h4" size="md" display="flex" alignItems="center">
          Lists
          <Tooltip label="Scroll-down Lists" placement="bottom" hasArrow><Button onClick={toggleDropdown} variant="link" rightIcon={<FaCaretDown />} ml={-4}>
            {/* Dropdown Arrow */}
          </Button></Tooltip>
        </Heading>

        {/* Dropdown for Lists */}
        {isDropdownOpen && (
          <VStack spacing={2} align="stretch">
            {lists.map(list => (
              <Box key={list.id} display="flex" alignItems="center">
                <Tooltip label={list.name} placement="bottom" hasArrow>
                <Button
                  onClick={() => onSwitchList(list.id)}
                  variant={currentListId === list.id ? 'solid' : 'outline'}
                  mr={2}
                  flexGrow={1}
                >
                  {list.name}
                </Button></Tooltip>
              </Box>
            ))}
          </VStack>
        )}

        {/* Button to open modal for adding a new list */}
        <Tooltip label="New List" placement="bottom" hasArrow>
        <Button 
          leftIcon={<FaPlus />} 
          colorScheme="blue" 
          variant="outline" 
          onClick={onOpenListModal} 
          borderRadius="full"
          width="full"
        >
          New List
        </Button>
        </Tooltip>
      </VStack>
    </Box>
  );
}

export default React.memo(Sidebar);
