export function playlistDescription(hostName, members) {
    const memberNames = members.map((member) => member.name);
    const lastMemberName = memberNames.pop();
    const allOtherMembers = memberNames.join(", ");
    if (allOtherMembers.length === 0) {
        return `A playlist created by ${hostName} and ${lastMemberName}.`;
    } else {
        return `A playlist created by ${allOtherMembers} and ${lastMemberName}.`;
    }
}