import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
    const [username, setUsername] = useState("");

    const onSubmit = async () => {
        try {

        } catch (error) {

        }
    }

    return (
        <Center height="100vh">
            <Stack align={"center"} spacing={8}>
                {session ? (
                    <>
                        <Text fontSize={'3xl'}>Create a username</Text>
                        <Input placeholder="Enter a username" value={username} onChange={(event) => setUsername(event.target.value)} />
                        <Button width={'100%'} onClick={onSubmit}>Save</Button>
                    </>
                ) : (
                    <>
                        <Text fontSize="3xl">iMessageClone</Text>
                        <Button
                            onClick={() => signIn("google")}
                            leftIcon={
                                <Image
                                    height={"20px"}
                                    src="/images/google.png"
                                    alt='google_logo'
                                />
                            }
                        >
                            Continue with Google
                        </Button>
                    </>
                )}
            </Stack>
        </Center>
    );
};

export default Auth;
