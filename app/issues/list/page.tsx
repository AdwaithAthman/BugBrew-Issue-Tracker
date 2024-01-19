import IssueActions from "./IssueActions";
import prisma from "@/prisma/client";
import { Pagination } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import IssueTable from "./IssueTable";
import { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next/types";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
    pageSize: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize =
    (parseInt(searchParams.pageSize) <= 25
      ? parseInt(searchParams.pageSize)
      : undefined) || 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BugBrew - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
