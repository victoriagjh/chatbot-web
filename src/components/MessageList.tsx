import React, { useRef, useEffect } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { UserMessage } from './UserMessage';
import { GPTMessage } from './GPTMessage';
import { Message } from '../schemas/Message';

type MessageListProps = {
    messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            (scrollRef.current as HTMLElement).scrollTop = (scrollRef.current as HTMLElement).scrollHeight;
        }
    }, [messages]);

    return (
        <Box
            ref={scrollRef}
            w="80vw" h="80vh" bg="#9bbbd4"
            overflowY="scroll" p={5}
            borderRadius={10}
        >
            <VStack gap={4}>
                {messages.map((message, index) => (
                    message.sender_type === 'BASIC' ?
                        <UserMessage key={index} message={message} index={index} flexDirection='row-reverse' /> :
                        <GPTMessage key={index} message={message} index={index} flexDirection='row' />
                ))}
            </VStack>
        </Box>
    );
}
