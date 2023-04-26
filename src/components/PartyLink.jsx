import { useState } from 'react';

export const PartyLink = ({ party_member, party_id }) => {
    const [linkCopied, setLinkCopied] = useState(false);
    const URL = `http://localhost:8888/${party_member}/${party_id}`;

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
                    value={URL}
                    readOnly={true}
                    style={{ border: '1px solid #ccc', padding: '0.5em' }}
                />

                <button id="copy-link-button" onClick={() => copyToClipboard(URL)}>
                    COPY TO CLIPBOARD
                </button>
            </label>

            {linkCopied && (
                <p>Link copied to clipboard!</p>
            )}
        </>
    );
};
