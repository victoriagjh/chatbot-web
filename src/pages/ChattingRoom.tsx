import {
    Box,
    Button,
    HStack,
    Input,
    Text,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Message } from '../schemas/Message';
import { apiGet } from '../utils/requests';
import { getAuthData } from '../utils/auth';
import { AuthData } from '../schemas/Auth';
import { useNavigate } from 'react-router-dom';
import { UserMessage } from '../components/UserMessage';
import { GPTMessage } from '../components/GPTMessage';

export const ChattingRoom = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const { isOpen = false, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();  // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

    const goToLoginPage = () => {
        navigate(`/`);
    };

    const handleSend = () => {
        if (input.trim()) {
            const newMessage: Message = {
                sender_type: 'BASIC',
                content: input,
                datetime: new Date()
            }
            setMessages([...messages, newMessage]);
            setInput('');
            // 여기서 시스템 응답을 추가하거나 API를 호출할 수 있습니다.
        }
    };

    useEffect(() => {
        const fetchMessage = async () => {
            onOpen();

            try {
                const auth: AuthData | null = getAuthData();
                if (!auth) {
                    alert('로그인이 필요합니다.');
                    goToLoginPage();
                };
                const response = await apiGet('/api/chats', {}, {
                    headers: {
                        Authorization: `Bearer ${auth?.token.access_token}`,
                    },
                });
                if (response.status !== 200) throw new Error('Get Message Failure');
                setMessages(response.data.messages);

            } catch (error) {
                onClose();
                alert('Get Message failed');
            }
        };

        fetchMessage(); // 컴포넌트 마운트 시 API 호출
    }, []); // 빈 배열을 종속성으로 넘겨 컴포넌트가 처음 마운트될 때만 실행
    console.log(messages)

    return (
        <VStack spacing={7} m={3}>
            <Box h="4vh" verticalAlign="center"><Text fontSize="xl">Victoree Chatbot Web Application</Text></Box>
            <Box w="80vw" h="80vh" bg="#9bbbd4" overflowY="scroll" p={5} borderRadius={10}>
                <VStack gap={4}>
                    {messages.map((message, index) => (
                        message.sender_type === 'BASIC' ? <UserMessage message={message} index={index} flexDirection='row-reverse' /> : <GPTMessage index={index} message={message} flexDirection='row' />
                    ))}
                </VStack>
            </Box>
            <HStack w="80vw" h="5vh">
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
