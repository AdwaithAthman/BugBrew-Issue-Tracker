"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const sizes = ["10", "15", "20", "25"];

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const changePageSize = (size: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", size);
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" justify="between">
      <Flex align="center" gap="2">
        <Text size="2">
          Page {currentPage} of {pageCount}
        </Text>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
      <Flex align="center" gap="2">
        <Text size="2">Show</Text>
        <Select.Root
          defaultValue={pageSize.toString() || "10"}
          onValueChange={changePageSize}
        >
          <Select.Trigger placeholder="Choose size" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Choose</Select.Label>
              {sizes?.map((size) => (
                <Select.Item
                  key={size}
                  value={size}
                  disabled={currentPage * parseInt(size) > itemCount}
                >
                  {size}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Flex>
  );
};

export default Pagination;
