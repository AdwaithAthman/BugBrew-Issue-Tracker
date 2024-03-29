import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { Grid, Box, Flex } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/app/components"

const DeleteIssueButton = dynamic(() => import("./DeleteIssueButton"), { 
  ssr: false,
  loading: () => <Skeleton height="2rem" /> 
});

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (isNaN(parseInt(params.id))) notFound();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: `BugBrew - ${issue!.title}`,
    description: "Details of issue " + issue!.id,
  };
}

export default IssueDetailPage;
