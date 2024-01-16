import { Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <Flex className="max-w-xl" direction="column" gap="2">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Flex>
  );
};

export default IssueFormSkeleton;
