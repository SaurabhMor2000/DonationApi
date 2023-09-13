

import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const PaymentSuccess = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const referenceNum = searchParams.get('reference');
  const donationAmount = searchParams.get('donationAmount'); 
const amount = donationAmount/100;
const Noofmeal = amount/10;
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <VStack h="100vh" justifyContent={"center"} background={"-moz-initial"}>
        <Heading textTransform={"uppercase"}>Donation Successful</Heading>
        <Text>Reference No. {referenceNum}</Text>
        <Text>Donation Amount: {amount} INR</Text>
        <Text>Number of meal you give: {Noofmeal}</Text>
        <Heading textTransform={"uppercase"}>Thank You for donation</Heading>
        <button onClick={handlePrint}>Print Receipt</button>
      </VStack>
    </Box>
  );
}

export default PaymentSuccess;

