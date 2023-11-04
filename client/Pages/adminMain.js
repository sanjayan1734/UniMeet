import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const AdminMain = () => {
    const [events, setEvents] = useState([
        { id: 1, title: 'Event 1', description: 'Description for Event 1' },
        { id: 2, title: 'Event 2', description: 'Description for Event 2' },
        { id: 3, title: 'Event 3', description: 'Description for Event 3' },
    ]);

    const [newEvent, setNewEvent] = useState({ title: '', description: '' });

    const handleCreateEvent = () => {
        const newId = events.length + 1;
        setEvents([...events, { id: newId, ...newEvent }]);
        setNewEvent({ title: '', description: '' });
    };

    const handleDeleteEvent = (id) => {
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
    };

    const handleEditEvent = (id, updatedEvent) => {
        const updatedEvents = events.map((event) => {
            if (event.id === id) {
                return { ...event, ...updatedEvent };
            }
            return event;
        });
        setEvents(updatedEvents);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upcoming Events</Text>
            <ScrollView>
                {events.map((event) => (
                    <View key={event.id} style={styles.card}>
                        <Text style={styles.cardTitle}>{event.title}</Text>
                        <Text style={styles.cardDescription}>{event.description}</Text>
                        <View style={styles.cardButtons}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleEditEvent(event.id, { title: 'New Title', description: 'New Description' })}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(event.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.form}>
                <Text style={styles.formTitle}>Create New Event</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={newEvent.title}
                    onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={newEvent.description}
                    onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                />
                <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    cardButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#f44336',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    form: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    createButton: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
        alignSelf: 'flex-end',
    },
});

export default AdminMain;
