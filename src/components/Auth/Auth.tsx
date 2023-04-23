import { CreateUsernameData, CreateUsernameVariables } from "@/src/util/types";
import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import UserOperations from '../../graphql/operations/user';

interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
    const [username, setUsername] = useState("");
    const [createUsername, { loading }] = useMutation<
        CreateUsernameData,
        CreateUsernameVariables
    >(UserOperations.Mutations.createUsername);

    const onSubmit = async () => {
        if (!username) return;
        try {
            const { data } = await createUsername({ variables: { username } });
            if (!data?.createUsername) {
                throw new Error();
            }

            if (data.createUsername.error) {
                const { createUsername: { error } } = data;
                throw new Error(error);
            }
            toast.success('Username created successfully');

            // reload session to obtain new username
            reloadSession();

        } catch (error: any) {
            console.log("onSubmit error", error);
            toast.error(error?.message)
        }
    }

    return (
        <Center height="100vh">
            <Stack align={"center"} spacing={8}>
                {session ? (
                    <>
                        <Text fontSize={'3xl'}>Create a username</Text>
                        <Input placeholder="Enter a username" value={username} onChange={(event) => setUsername(event.target.value)} />
                        <Button width={'100%'} onClick={onSubmit} isLoading={loading}>Save</Button>
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
