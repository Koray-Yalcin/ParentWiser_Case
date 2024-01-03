import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { decode, encode } from 'base-64'
import Modal from 'react-native-modal';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

interface User {
    key: String
    name: String,
    age: Number,
    hometown: String
}
const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [data, setData] = useState({
        name: '',
        age: '',
        hometown: ''
    });
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get('https://crud-example-api.vercel.app/users', {
                    auth: {
                        username: "demo",
                        password: "demo"
                    },
                });
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();
    }, []);

    const handleDelete = async (key: string) => {
        try {
            await axios.delete(`https://crud-example-api.vercel.app/users/${key}`, {
                auth: {
                    username: "demo",
                    password: "demo"
                },
            }).then(async () => {
                const res = await axios.get('https://crud-example-api.vercel.app/users', {
                    auth: {
                        username: "demo",
                        password: "demo"
                    },
                });
                setUsers(res.data);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (key: string, data: any) => {
        try {
            await axios.patch(`https://crud-example-api.vercel.app/users/${key}`, data, {
                auth: {
                    username: "demo",
                    password: "demo"
                },
            }).then(async () => {
                const res = await axios.get('https://crud-example-api.vercel.app/users', {
                    auth: {
                        username: "demo",
                        password: "demo"
                    },
                });
                setUsers(res.data);
                setOpenEditModal(false);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleAdd = async (data: any) => {
        try {
            await axios.post(`https://crud-example-api.vercel.app/users`, data, {
                auth: {
                    username: "demo",
                    password: "demo"
                },
            }).then(async () => {
                const res = await axios.get('https://crud-example-api.vercel.app/users', {
                    auth: {
                        username: "demo",
                        password: "demo"
                    },
                });
                setUsers(res.data);
                setOpenAddModal(false);
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View className='container m-5'>
            <View>
                <Text className='font-semibold text-3xl'>Student List</Text>
                <Text className='text-xs'>Detailed information about your students</Text>
            </View>
            <View className='mt-5 flex flex-row items-center'>
                <TouchableOpacity
                    onPress={() => { setOpenAddModal(true); }}
                    className='px-8 py-4 mr-10 bg-yellow-500 rounded-full w-auto'>
                    <Text className='text-white font-bold'>+ Add New Student</Text>
                </TouchableOpacity>
                <TouchableOpacity className='mr-5'>
                    <Entypo name="menu" size={32} color="orange" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="codesquareo" size={28} color="gray" />
                </TouchableOpacity>
                {
                    openAddModal && (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Modal isVisible={true} onBackdropPress={() => { setOpenEditModal(false) }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput onChangeText={(text) => { setData({ ...data, name: text }) }} className=' p-4 border rounded-xl'>Name</TextInput>
                                    <TextInput onChangeText={(text) => { setData({ ...data, age: text }) }} className=' p-4 border rounded-xl'>Age</TextInput>
                                    <TextInput onChangeText={(text) => { setData({ ...data, hometown: text }) }} className=' p-4 border rounded-xl'>Hometown</TextInput>
                                    <Button title="Tamam" onPress={() => { handleAdd(data); }} />
                                    <Button title="Kapat" onPress={() => { setOpenAddModal(false) }} />
                                </View>
                            </Modal>
                        </View>
                    )
                }
            </View>
            {
                users && users.map((user: any) => (
                    <View key={user.key} className='my-4 border border-gray-400 rounded-xl w-4/5 p-2'>
                        <View className='flex flex-row justify-between'>
                            <Text className='text-xl font-semibold'>{user.name}</Text>
                            <View className='flex flex-row'>
                                <TouchableOpacity
                                    onPress={() => { setOpenEditModal(true) }}
                                    className='mr-5'>
                                    <Entypo name="edit" size={24} color="blue" />
                                </TouchableOpacity>
                                {
                                    openEditModal && (
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Modal isVisible={true} onBackdropPress={() => { setOpenEditModal(false) }}>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <TextInput onChangeText={(text) => { setData({ ...data, name: text }) }} className=' p-4 border rounded-xl'>{user.name}</TextInput>
                                                    <TextInput onChangeText={(text) => { setData({ ...data, age: text }) }} className=' p-4 border rounded-xl'>{user.age}</TextInput>
                                                    <TextInput onChangeText={(text) => { setData({ ...data, hometown: text }) }} className=' p-4 border rounded-xl'>{user.hometown}</TextInput>
                                                    <Button title="Tamam" onPress={() => { handleEdit(user.key, data) }} />
                                                    <Button title="Kapat" onPress={() => { setOpenEditModal(false) }} />
                                                </View>
                                            </Modal>
                                        </View>
                                    )
                                }
                                <TouchableOpacity
                                    onPress={() => { handleDelete(user.key) }}>
                                    <Entypo name="trash" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='mt-5'>
                            <View className='flex flex-row justify-between'>
                                <Text className='font-bold text-gray-500'>Age</Text>
                                <Text className='font-bold'>{user.age}</Text>
                            </View>
                            <View className='flex flex-row justify-between'>
                                <Text className='font-bold text-gray-500'>Hometown</Text>
                                <Text className='font-bold'>{user.hometown}</Text>
                            </View>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

export default Home