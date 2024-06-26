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
import { apiGet, apiPost } from '../utils/requests';
import { getAuthData } from '../utils/auth';
import { AuthData } from '../schemas/Auth';
import { useNavigate } from 'react-router-dom';
import { UserMessage } from '../components/UserMessage';
import { GPTMessage } from '../components/GPTMessage';
import LoadingModal from '../components/LoadingModal';
import { MessageList } from '../components/MessageList';

export const ChattingRoom = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const { isOpen = false, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();  // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

    const goToLoginPage = () => {
        navigate(`/`);
    };

    const sendQuestion = async (question: string) => {
        onOpen();
        try {
            const auth: AuthData | null = getAuthData();
            if (!auth) {
                alert('로그인이 필요합니다.');
                goToLoginPage();
            };
            const response = await apiPost('/api/chats', { content: question }, {
                headers: {
                    Authorization: `Bearer ${auth?.token.access_token}`,
                },
            });
            if (response.status !== 200) throw new Error('Send Message Failure');
            const answer: Message = {
                sender_type: response.data.sender_type,
                content: response.data.content,
                datetime: response.data.created_at
            }
            setMessages(prevMessages => [...prevMessages, answer]); // 함수형 업데이트 사용
            onClose();

        } catch (error) {
            onClose();
            alert('Send Message failed');
        }
    }

    const handleSend = () => {
        if (input.trim()) {
            const newMessage: Message = {
                sender_type: 'BASIC',
                content: input,
                datetime: new Date()
            }
            setMessages(prevMessages => [...prevMessages, newMessage]); // 함수형 업데이트 사용
            sendQuestion(input);
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
                onClose();
            } catch (error) {
                onClose();
                alert('Get Message failed');
            }
        };

        fetchMessage(); // 컴포넌트 마운트 시 API 호출
    }, []);

    return (
        <VStack spacing={7} m={3}>
            <LoadingModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <Box h="4vh" verticalAlign="center"><Text fontSize="2xl">영화/드라마 추천 챗봇</Text></Box>
            <MessageList messages={messages} />
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
