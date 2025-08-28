"use client";
import { Upload } from "@/components/base/upload";
import { BaseLayout } from "@/components/admin-ui/BaseLayout";
import { FileToBase64 } from "@/components/helpers/base64";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Label,
  TextInput,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { HiDocumentAdd, HiDocumentRemove, HiSearch } from "react-icons/hi";
import { useState } from "react";

import { useLoading } from "@/contexts/LoadingContext";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    showLoading("Uploading file...");
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      console.log(file.name);
      const base64 = await FileToBase64(file);
      console.log("Base64 String:", base64);

      const res = await fetch("/admin/secured/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64Data: base64, fileName: file.name }),
      });

      if (!res.ok) {
        alert("Failed to upload file.");
      }
      setOpenModal(false);
      event.target.value = "";
      hideLoading();

      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <BaseLayout>
      <div className="mx-auto px-4 pt-8 lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
          <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <Label htmlFor="search" className="sr-only">
                  Search
                </Label>
                <TextInput
                  id="search"
                  type="text"
                  icon={HiSearch}
                  placeholder="Search"
                  required
                  className="w-full"
                />
              </form>
            </div>

            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3">
              <Button color="primary" onClick={() => setOpenModal(true)}>
                <HiDocumentAdd className="mr-2 h-4 w-4" />
                Add
              </Button>
              <Button color="primary">
                <HiDocumentRemove className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableRow>
                  <TableHeadCell className="p-4">
                    <Checkbox />
                  </TableHeadCell>
                  <TableHeadCell>File Name</TableHeadCell>
                  <TableHeadCell>Size</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow>
                  <TableCell className="p-4">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                    File 1.pdf
                  </TableCell>
                  <TableCell>120 Kb</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <Upload
            description="Upload PDF document upto 5MB"
            handleFileChange={handleFileChange}
          />
        </ModalBody>
      </Modal>
    </BaseLayout>
  );
}
