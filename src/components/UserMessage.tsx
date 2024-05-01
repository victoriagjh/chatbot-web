import {
    Box,
    HStack,
    Text
} from '@chakra-ui/react';
import { Message } from '../schemas/Message';
import { Avatar } from '@chakra-ui/react'
import { getAuthData } from '../utils/auth';
type MessageProps = {
    index: number;
    message: Message;
    flexDirection: "row" | "row-reverse";
};

export const UserMessage: React.FC<MessageProps> = ({ index, message, flexDirection }) => {
    console.log(index, flexDirection)
    const authData = getAuthData();

    return (<HStack key={index} w="100%" flexDirection={flexDirection} gap={4}>
        <Avatar src='https://bit.ly/broken-link' />
        <Box display="flex" flexDirection="column" gap={2}>
            <Text textAlign="right" fontSize="md" color="gray.900" fontWeight={700} mr={2}>{authData?.user.username}</Text>
            < Box p={3} bg="#FFD700" borderRadius="lg" >
                <Text color="black">{message.content}</Text>
            </Box >
        </Box>
    </HStack >)
}