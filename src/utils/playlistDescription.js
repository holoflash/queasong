export function playlistDescription(hostName, members) {
    const memberNames = members.map((member) => member.name);
    const lastMemberName = memberNames.pop();
    const allOtherMembers = memberNames.join(", ");
    return allOtherMembers.length === 0
        ? `A playlist created by ${hostName} and ${lastMemberName}.`
        : `A playlist created by ${hostName}, ${allOtherMembers}, and ${lastMemberName}.`;

}