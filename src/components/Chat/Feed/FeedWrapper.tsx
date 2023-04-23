import { Session } from "next-auth";

interface IFeedWrapperProps {
    session: Session
}

const FeedWrapper = ({ session }: IFeedWrapperProps) => {
    return (
        <div>FeedWrapper</div>
    )
}

export default FeedWrapper;