import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Button,
  Image,
  Avatar,
  Text,
  useColorMode,
  Stack,
  Link,
} from "@chakra-ui/react";
import Logo from "../fitness.png";
import { useNavigate } from "react-router-dom";
import HealthStatsCard from "./HealthStatsCard";
import ActivityCard from "./ActivityCard";
import Loading from "./Loader";

const Dashboard = () => {
  const [fitnessData, setFitnessData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  let result;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/fetch-data`).then((response) => {
        // Handle the retrieved data
        setFitnessData(response.data);
        setIsLoading(false);
      });
    }, 3000);
  }, []);

  if (fitnessData) {
    result = fitnessData?.formattedData.map(({ date, step_count }) => {
      const trimmeddate = date.substr(0, 3);
      return { date: trimmeddate, step_count };
    });
  }

  const handleLogout = () => {
    navigate("/");
  };

  const handleClick = () => {
    navigate("/about"); // Replace "/another-page" with the desired URL
  };
  const handleClick1 = () => {
    navigate("/contact"); // Replace "/another-page" with the desired URL
  };

  const glucose = fitnessData?.formattedData.map((item) => ({
    glucose_level: item.glucose_level,
  }));

  const maxWeight = fitnessData?.formattedData.reduce(
    (max, item) => (item.weight > max ? item.weight : max),
    0
  );
  const maxHeight = fitnessData?.formattedData.reduce(
    (max, item) => (item.height_in_cms > max ? item.height_in_cms : max),
    0
  );

  let maxBPArray = [];

  fitnessData?.formattedData.forEach((item) => {
    const itemMaxBP = Math.max(...item.blood_pressure);
    if (itemMaxBP > Math.max(...maxBPArray)) {
      maxBPArray = item.blood_pressure;
    }
  });

  const StepCount = fitnessData?.formattedData.reduce(
    (max, item) => (item.step_count > max ? item.step_count : max),
    0
  );
  const heartrate = fitnessData?.formattedData.reduce(
    (max, item) => (item.heart_rate > max ? item.heart_rate : max),
    0
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Box
            bg={colorMode === "light" ? "teal.500" : "pink.800"}
            px={4}
            py={2}
            color="white"
          >
            <Flex align="center" justify="space-between">
              <Flex align="center">
                <Image
                  src={Logo}
                  alt="Fitness Tracker Logo"
                  width="40px"
                  mr={3}
                />
                <Text fontSize="xl" fontWeight="bold">
                  Google-Fit-Steps-Tracker
                </Text>
              </Flex>
              <Flex align="center">
                <Avatar
                  size="sm"
                  name="John Doe"
                  src={fitnessData?.profilePhoto}
                  mr={2}
                />
                <Text fontWeight="bold">{fitnessData?.userName}</Text>
                <Button
                  colorScheme={colorMode === "light" ? "white" : "blue"}
                  variant="outline"
                  size="sm"
                  ml={4}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  colorScheme={colorMode === "light" ? "white" : "blue"}
                  variant="outline"
                  size="sm"
                  ml={4}
                  onClick={toggleColorMode}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Flex>
            <Flex direction="column" w="100%" p={14}>
              <Stack spacing={4}>
                <HealthStatsCard
                  weight={maxWeight}
                  height={maxHeight}
                  BP={maxBPArray}
                  step={StepCount}
                  heart={heartrate}
                />
                <ActivityCard result={result} glucose={glucose} />
              </Stack>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
