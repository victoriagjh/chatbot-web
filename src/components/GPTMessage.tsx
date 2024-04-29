import {
    Box,
    HStack,
    Text
} from '@chakra-ui/react';
import { Message } from '../schemas/Message';

type MessageProps = {
    index: number;
    message: Message;
    flexDirection: "row" | "row-reverse";
};

export const GPTMessage: React.FC<MessageProps> = ({ index, message, flexDirection }) => {
    console.log(index, flexDirection)

    return (<HStack key={index} w="100%" flexDirection={flexDirection}>
        <Box p={3} bg="#556677" borderRadius="lg" >
            <Text>{message.content}</Text>
        </Box>
    </HStack>)
}