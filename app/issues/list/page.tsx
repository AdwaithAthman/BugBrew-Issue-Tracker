import IssueActions from "./IssueActions";
import prisma from "@/prisma/client";
import { Pagination } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next/types";
import IssueTable from "./IssueTable";

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    orderIn: string;
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
  const orderIn = searchParams.orderIn === "asc" ? "asc" : "desc";

  const columnNames = columns.map((column) => column.value);
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: orderIn }
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
