import React, { useState } from 'react';
import {
    Box,
    VStack,
    HStack,
    Input,
    Button,
    Text,
} from '@chakra-ui/react';
import { Message } from '../schemas/Message';

export const ChattingRoom = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            const newMessage: Message = {
                sender: 'system',
                content: input,
                datetime: new Date()
            }
            setMessages([...messages, newMessage]);
            setInput('');
            // 여기서 시스템 응답을 추가하거나 API를 호출할 수 있습니다.
        }
    };

    return (
        <VStack spacing={4} p={5}>
            <Box w="100%" h="500px" bg="gray.100" overflowY="scroll" p={3}>
                {messages.map((message, index) => (
                    <HStack key={index} justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
                        <Box p={3} bg="blue.100" borderRadius="lg">
                            <Text>{message.content}</Text>
                        </Box>
                    </HStack>
                ))}
            </Box>
            <HStack w="100%">
                <Input
                    placeholder="메시지를 입력하세요..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend}>전송</Button>
            </HStack>
        </VStack>
    );
}
