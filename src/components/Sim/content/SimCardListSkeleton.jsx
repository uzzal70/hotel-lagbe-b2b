import SimCardSkeleton from "./SimCardSkeleton";

const SimCardListSkeleton = ({ count = 3 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <SimCardSkeleton key={index} />
            ))}
        </>
    );
};

export default SimCardListSkeleton;
