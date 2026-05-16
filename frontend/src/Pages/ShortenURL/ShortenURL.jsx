import React, { useEffect, useState } from 'react'
import { Button, Stack, TextInput } from '@mantine/core';
import Service from '../../utils/http';
export const ShortenURL = () => {
   const service = new Service();
   const [data, setData] = useState({});
   const [shortUrl, setShortUrl] = useState("");
   const handleSubmit = async () => {
       try {
            const response = await service.post("s", data);
            setShortUrl(`https://url-shortener-bootcamp.onrender.com/api/s/${response.shortCode}`);
       } catch (error) {
           console.error("POST API call failed!", error.message);
       }
   }
   useEffect(() => {
       console.log(`Short URL is ${shortUrl}`);
   }, [shortUrl])
   return (
       <>
       <h3 style={{ textAlign: 'center' }}>Shorten Your URL</h3>
           {shortUrl && shortUrl.length>0 ? <p>Shorter Url : {shortUrl}</p> :
            <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="center"
      justify="flex-start"
      gap="lg"
    >
                   <TextInput
                       size="md"
                       label="Original URL"
                       withAsterisk
                       onChange={ (event) => setData({ ...data, originalUrl: event.target.value }) }
                       placeholder="Enter original URL"
                   />
                   <TextInput
                        size="md"
                       label="Customize your link"
                       placeholder="custom link"
                   />
                   <TextInput
                        size="md"
                       label="Title"
                       placeholder="Enter title for your link"
                   />
                    <Button onClick={handleSubmit}>Generate Short URL</Button>
               </Stack>
           }
       </>
   )
}
