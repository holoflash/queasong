export const playlistDescription = (members) => {
    if (!members) {
        return "Something went wrong while creating a description."
    }

    const decodedMembers = members.map(member => {
        return {
            ...member,
            name: decodeURIComponent(member.name)
        };
    });

    const memberNames = decodedMembers.map((member) => member.name)

    let description;
    if (decodedMembers.length === 2) {
        description = `A playlist created by ${memberNames.join(" and ")}.`
    } else {
        description = `A playlist created by ${memberNames.slice(0, -1).join(", ")} and ${memberNames.slice(-1)}.`
    }

    if (description.length > 300) {
        return `A playlist created by ${memberNames[0]} and too many amazing people to name.`
    }

    return description;
}
