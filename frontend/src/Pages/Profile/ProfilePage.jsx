import React from 'react'
import Service from '../../utils/http';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar,Container, Text, Stack} from '@mantine/core';
export default function ProfilePage() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchUser = async () => {

        try {
            const response = await service.get('user/me');
            setUser(response);
        }
         catch (error) { 
                       console.error('Error fetching user data:', error);
        } 
        finally {   
                     setLoading(false);
        }   

    };

    useEffect(
        () => { fetchUser() }, [fetchUser]
    );

    if (loading) {
       return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Text>User not found</Text>;
    }


        return (
 <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
            </Stack>
        </Container>
    
    )
}