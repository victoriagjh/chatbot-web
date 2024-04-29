import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Spinner,
    Text
} from '@chakra-ui/react';

type LoadingModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent h="30%" >
                <ModalBody
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    flexDirection="column">
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="green.300"
                        size="xl"
                    />
                    <Text ml={4} textColor="gray.900" mt="20px">서버가 너무 느립니다. 이해해주세요 ^^ </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default LoadingModal;