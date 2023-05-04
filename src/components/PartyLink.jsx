import { useState } from 'react';

export const PartyLink = ({ party_member, party_id }) => {
    const [linkCopied, setLinkCopied] = useState(false);
    const URL =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3000'
            : 'https://queasong.onrender.com';

    const fullUrl = `${URL}/${party_member}/${party_id}`;

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            setLinkCopied(true);
        });
    }

    return (
        <>
            <button id="copy-link-button" onClick={() => copyToClipboard(fullUrl)}>
                {party_member}'s submission link
            </button>

            {linkCopied && (
                <p>Link copied to clipboard!</p>
            )}
        </>
    );
};
