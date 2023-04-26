import { useState } from 'react';

export const PartyLink = ({ party_member, party_id }) => {
    const [linkCopied, setLinkCopied] = useState(false);
    const URL =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:8888'
            : 'https://queasong.onrender.com';


    const fullUrl = `${URL}/${party_member}/${party_id}`;

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            setLinkCopied(true);
        });
    }

    return (
        <>
            <label>
                <input
                    type="text"
                    value={fullUrl}
                    readOnly={true}
                    style={{ border: '1px solid #ccc', padding: '0.5em' }}
                />

                <button id="copy-link-button" onClick={() => copyToClipboard(fullUrl)}>
                    COPY TO CLIPBOARD
                </button>
            </label>

            {linkCopied && (
                <p>Link copied to clipboard!</p>
            )}
        </>
    );
};
