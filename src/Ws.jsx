import React, { useEffect, useState } from 'react';
import { Stat, StatLabel, StatNumber, Box, Grid, GridItem, Spinner, Text, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const WebSocketComponent = () => {
  const [webSocket, setWebSocket] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('Power on the device to start receiving metrics');
  const [hasWebSocketMessage, setHasWebSocketMessage] = useState(false);
  const [fullyRendered, setFullyRendered] = useState(false);
  const [gridLoading, setGridLoading] = useState(true); // New state for the grid loading

  useEffect(() => {
    if (!webSocket) {
      const socket = new WebSocket('wss://ycalx2jfg3.execute-api.us-east-1.amazonaws.com/prod/');

      socket.onopen = () => {
        console.log('WebSocket connection opened');
        setWebSocket(socket);
        setLoading(false); // WebSocket is open, set loading to false
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        setMetrics((prevMetrics) => ({ ...prevMetrics, ...message }));
        setLastUpdated(new Date().toLocaleTimeString()); // Update lastUpdated timestamp
        setHasWebSocketMessage(true); // Set to true when a message is received
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        setWebSocket(null);
      };

      return () => {
        if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
          socket.close();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (hasWebSocketMessage) {
      setFullyRendered(false); // Reset fullyRendered when a new message is received
    }
  }, [hasWebSocketMessage]);

  useEffect(() => {
    if (Object.keys(metrics).length > 0) {
      setFullyRendered(true);
      setGridLoading(false); // Set gridLoading to false when metrics are fully rendered
    }
  }, [metrics]);

  return (
    <Box>
      <h2>Real Time Metrics</h2>
      {loading ? (
        <>
          {fullyRendered ? (
            <Spinner size="lg" />
          ) : (
            <>
              <Spinner size="lg" />
              <Text mb={4} fontSize="sm" color="gray.500">
                Waiting for the first message...
              </Text>
            </>
          )}
        </>
      ) : (
        <>
          {webSocket && fullyRendered && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.4 }}
            >
              <Flex align="center" justify="center" direction="column" mb={4}>
                {Object.keys(metrics).length < 1 && (
                  <img width="120" height="120" src="../public/device.svg" alt="Device" />
                )}
                <Text fontSize="sm" color="gray.500">
                  {Object.keys(metrics).length > 0 ? `Last Updated: ${lastUpdated}` : lastUpdated}
                </Text>
              </Flex>
            </motion.div>
          )}
          {gridLoading ? (
			<>
            <Spinner size="lg" />
			<Text mb={4} fontSize="sm" color="gray.500">
                Waiting for the first message...
              </Text>
			</>
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {Object.entries(metrics).map(([key, value]) => (
                <GridItem key={key}>
                  <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md">
                    <StatLabel>{key}</StatLabel>
                    <StatNumber>{value}</StatNumber>
                  </Stat>
                </GridItem>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default WebSocketComponent;
