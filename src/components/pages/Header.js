import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, Spacer, IconButton, Tooltip } from '@chakra-ui/react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; 
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';

function Header({ onToggleSidebar, onLogout }) { // Accept toggle and logout functions as props
  const location = useLocation();
  const [showProfileButton, setShowProfileButton] = useState(true);

  useEffect(() => {
    if (location.pathname === "/signup" || location.pathname === "/") {
      setShowProfileButton(false);
    } else {
      setShowProfileButton(true);
    }
  }, [location.pathname]);

  const handleProfileClick = () => {
    console.log("Profile button clicked");
  };

  const isListManagerPage = location.pathname === "/listmanager";

  return (
    <Box bg="teal.500" color="white" p={4} maxH="70px">
      <Flex alignItems="center" position="sticky" width="100%">
        {isListManagerPage && (
          <Tooltip label="Main-menu" placement="bottom" hasArrow>
          <IconButton
            icon={<RxHamburgerMenu />}
            aria-label="Open Menu"
            colorScheme="teal"
            _hover={{ bg: "teal.600" }}
            marginRight={"14px"}
            onClick={onToggleSidebar} // Call the toggle function here
          />
          </Tooltip>
        )}
        <Heading size="lg">
          TASKIFY
          </Heading>
        <Spacer />
        {showProfileButton && (
          <>
            <Link to="/profile">
            <Tooltip label="User-Profile" placement="bottom" hasArrow>
              <IconButton
                icon={<FaUserCircle />} 
                aria-label="User Profile"
                variant="outline"
                border="teal"
                colorScheme="whiteAlpha"
                onClick={handleProfileClick} 
              />
              </Tooltip>
            </Link>
            <Tooltip label="Logout" placement="bottom" hasArrow>
            <IconButton
              icon={<FaSignOutAlt />} // Logout icon
              aria-label="Logout"
              variant="outline"
              colorScheme="whiteAlpha"
              border="teal"
              onClick={onLogout} // Call the logout function when clicked
              ml={2} // Add margin left for spacing
            />
            </Tooltip>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Header;