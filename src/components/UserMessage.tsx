import {
    Box,
    HStack,
    Text
} from '@chakra-ui/react';
import { Message } from '../schemas/Message';
import { Avatar } from '@chakra-ui/react'
type MessageProps = {
    index: number;
    message: Message;
    flexDirection: "row" | "row-reverse";
};

export const UserMessage: React.FC<MessageProps> = ({ index, message, flexDirection }) => {
    console.log(index, flexDirection)
    return (<HStack key={index} w="100%" flexDirection={flexDirection} gap={4}>
        <Box>
            <Avatar src='https://bit.ly/broken-link' />
        </Box>
        < Box p={3} bg="#FFD700" borderRadius="lg" >
            <Text color="black">{message.content}</Text>
        </Box >
    </HStack >)
}