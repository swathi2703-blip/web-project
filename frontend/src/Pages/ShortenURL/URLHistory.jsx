import React, { useEffect, useState } from 'react'
import Service from '../../utils/http.js'
import { Button, Modal, Table, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Group, Pagination } from '@mantine/core';

export const URLHistory = () => {
   const [opened, { open, close }] = useDisclosure(false);
   const [deleteOpened, { open: deleteopened, close: deleteclose }] = useDisclosure(false);
   const [updatedData, setUpdatedData] = useState({});
   const [data, setData] = useState([]);
   const [shortCode, setShortCode] = useState("");
   const [rows, setRows] = useState([]);


   useEffect(() => {
       if(data && data.length > 0) {
           setRows(data.map((element) => (
               <Table.Tr key={element._id}>
                   <Table.Td>{element.originalUrl}</Table.Td>
                   <Table.Td>{element.shortCode}</Table.Td>
                   <Table.Td>{element.clickCount}</Table.Td>
                   <Table.Td>{element.createdAt}</Table.Td>
                   <Table.Td>{element.expiresAt}</Table.Td>
                   <Table.Td><Button variant="filled"
                       size="xs"
                       radius="sm"
                       onClick={() => handleUpdate(element)}
                   >Edit
                   </Button>
                   </Table.Td>
                   <Table.Td><Button variant="filled"
                       size="xs"
                       radius="sm"
                       onClick={() => handleDelete(element)}
                   >Delete
                   </Button>
                   </Table.Td>
               </Table.Tr>
           )));
       }
   }, [data]);
  
   const handleSubmit = async () => {
       await updateRecord(shortCode, updatedData);
       close();
       await fetchHistory();
   }

   const handleDelete= async () => {
         await deleteRecord(shortCode);
         deleteclose();
         await fetchHistory();
   }

   const deleteRecord = async (shortCode) => {
           const response1 = await service.delete(`s/${shortCode}`,data);
              console.log(response1);
              deleteopened();
   }

   const updateRecord = async (shortCode, updatedData) => {
       try {
           const response = await service.patch(`s/${shortCode}`, updatedData);
           console.log(response);
       } catch (error) {
           console.error(error.message);
       }
   }
   const handleUpdate = (element) => {
       setShortCode(element.shortCode);
       setUpdatedData({
           originalUrl: element.originalUrl,
           title: element.title,
       });
       console.log("ENTERED");
       open();
   }
   const service = new Service();
   const fetchHistory = async () => {
       try {
           const response = await service.get("user/my/urls");
           console.log(response.shortURLs);
           setData(response.shortURLs);
       } catch (error) {
           console.error(error);
       }
   }


   useEffect(() => {
       fetchHistory();
   }, []);


   return (
       <div>
           <Table highlightOnHover >
               <Table.Thead>
                   <Table.Tr>
                       <Table.Th>Original URL</Table.Th>
                       <Table.Th>Short Code</Table.Th>
                       <Table.Th>Click Count</Table.Th>
                       <Table.Th>Created At</Table.Th>
                       <Table.Th>Expires At</Table.Th>
                       <Table.Th>Actions</Table.Th>
                   </Table.Tr>
               </Table.Thead>
               <Table.Tbody>{rows}</Table.Tbody>
           </Table>
           <Modal opened={opened} onClose={close} title="Edit URL : ">
               <TextInput
                   defaultValue={updatedData.originalUrl}
                   label="Enter new URL"
                   onChange={(e) => {
                       setUpdatedData({ ...updatedData, originalUrl: e.target.value });
                   }}
                   placeholder="Input placeholder"
               />
               <TextInput
                   defaultValue={updatedData.title}
                   label="Enter New Title"
                   placeholder="Input placeholder"
                   onChange={(e) => {
                       setUpdatedData({ ...updatedData, title: e.target.value });
                   }}
               />
               <Button filled
                   onClick={() => {
                       handleSubmit();
                   }}>Update</Button>
           </Modal>
            <Modal opened={deleteOpened} onClose={deleteclose} title="Delete URL : ">
                <p>Are you sure you want to delete this URL?</p>
                 <Button filled
                   onClick={() => {
                       handleDelete();
                   }}>Delete</Button>
            </Modal>
            <Pagination.Root total={1}>
      <Group gap={5} justify="center">
         <h5 style={{ textAlign: 'first' }}>Showing URL's</h5>
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
       </div>
   )
}
