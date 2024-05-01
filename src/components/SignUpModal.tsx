import { useState } from "react";
import { PasswordField } from '../components/PasswordField'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Spinner,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from '@chakra-ui/react';
import { apiPost } from "../utils/requests";
import LoadingModal from "./LoadingModal";


type SignUpModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const SignupModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const loadingModal = useDisclosure();


    const handleSignup = async () => {
        try {
            loadingModal.onOpen();
            const response = await apiPost('/api/auth/sign-up', { username: id, password }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status !== 200) throw new Error('Sign Up failed');
            loadingModal.onClose();
            alert('회원가입 성공!');
            onClose(); // 모달 닫기
        } catch (error) {
            alert('SignUp failed');
            console.error('Login error:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <LoadingModal isOpen={loadingModal.isOpen} onOpen={loadingModal.onOpen} onClose={loadingModal.onClose} />
            <ModalOverlay />
            <ModalContent bg="gray.400">
                <ModalHeader>회원가입</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel htmlFor="signup-id">ID</FormLabel>
                        <Input id="signup-id" type="text" value={id} onChange={e => setId(e.target.value)} />
                    </FormControl>
                    <PasswordField value={password} onChange={e => setPassword(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSignup}>회원가입</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
