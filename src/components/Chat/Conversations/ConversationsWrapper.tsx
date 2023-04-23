import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationsList from "./ConversationList";

interface IConversationsWrapperProps {
    session: Session
}

const ConversationsWrapper = ({ session }: IConversationsWrapperProps) => {
    return (
        <Box width={{ base: '100%', md: "400px" }} bg={'whiteAlpha.50'} py={6} px={3}>
            <ConversationsList session={session} />
        </Box>)
}

export default ConversationsWrapper;