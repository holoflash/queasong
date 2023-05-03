const duplicates = {};

export const duplicateCheck = (name, index) => {
    if (name === '') {
        return `Guest_${index}`;
    }

    const count = (duplicates[name] = (duplicates[name] || 0) + 1);
    const suffix = count === 1 ? '' : `_${count}`;

    return encodeURIComponent(`${name}${suffix}`);
};
