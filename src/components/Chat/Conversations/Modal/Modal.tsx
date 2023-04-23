import { CreateConversationData, CreateConversationInput, SearchUsersData, SearchUsersInput, SearchedUser } from '@/src/util/types';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Stack,
    Input,
    Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import UserOperations from '../../../../graphql/operations/user';
import ConversationOperations from '../../../../graphql/operations/conversation'
import UserSearchList from './UserSearchList';
import Participants from './Participants';
import { Session } from 'next-auth';

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    session: Session
}

const ConversationModal = ({ isOpen, onClose, session }: IModalProps) => {
    const { user: { id: userId } } = session;
    const [username, setUsername] = useState<string>('');
    const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
    const [searchUsers, { data, loading, error }] = useLazyQuery<SearchUsersData, SearchUsersInput>
        (UserOperations.Queries.searchUsers);
    const [createConversation, { loading: createConversationLoading }] = useMutation<CreateConversationData, CreateConversationInput>(ConversationOperations.Mutations.createConversation);


    const onCreateConversation = async () => {
        const participantIds = [...participants.map(p => p.id), userId];
        try {
            const { } = await createConversation({
                variables: { participantIds }
            });
        } catch (error: any) {
            toast.error(error?.message)
        }
    }

    const onSearch = (event: React.FormEvent) => {
        event.preventDefault();
        try {
            searchUsers({ variables: { username } });
        } catch (error: any) {
            toast.error(error?.message);
        }
    }

    const addParticipant = (user: SearchedUser) => {
        setParticipants(prev => [...prev, user]);
        setUsername('');
    }

    const removeParticipant = (userId: string) => {
        setParticipants(prev => prev.filter(p => p.id !== userId));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#2d2d2d" pb={4}>
                <ModalHeader>Create a conversation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={onSearch}>
                        <Stack spacing={4}>
                            <Input placeholder="Enter a username" value={username} onChange={event => setUsername(event.target.value)} />
                            <Button type="submit" disabled={!username} isLoading={loading}>Search</Button>
                        </Stack>
                    </form>
                    {data?.searchUsers &&
                        <UserSearchList users={data?.searchUsers} addParticipant={addParticipant} />}
                    {participants.length !== 0 && <>
                        <Participants participants={participants} removeParticipant={removeParticipant} />
                        <Button
                            bg="brand.100"
                            width="100%"
                            mt={6}
                            _hover={{ bg: "brand.100" }}
                            isLoading={createConversationLoading}
                            onClick={onCreateConversation}
                        >
                            Create Conversation
                        </Button>
                    </>}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ConversationModal;