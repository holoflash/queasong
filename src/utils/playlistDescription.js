export const playlistDescription = (members) => {
    if (!members) {
        return "Something went wrong while creating a description."
    }
    const memberNames = members.map((member) => member.name)

    if (members.length === 2) {
        return `A playlist created by ${memberNames.join(" and ")}.`
    } else {
        return `A playlist created by ${memberNames.slice(0, -1).join(", ")} and ${memberNames.slice(-1)}.`
    }
}
