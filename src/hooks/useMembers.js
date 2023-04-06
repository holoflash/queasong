import { useState, useEffect } from 'react';

export const useMembers = (initialNumMembers) => {
    const [members, setMembers] = useState([]);
    const [numMembers, setNumMembers] = useState(initialNumMembers);

    useEffect(() => {
        setMembers(
            Array.from({ length: numMembers }, () => ({
                name: '',
            }))
        );
    }, [numMembers]);

    const handleMemberNameChange = (index, value) => {
        setMembers(
            members.map((member, i) =>
                i === index ? { ...member, name: value } : member
            )
        );
    };

    return { members, numMembers, setNumMembers, handleMemberNameChange };
};
