import { useState, useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

export const AllLinks = ({ partyData, party_id }) => {
    const [linkCopied, setLinkCopied] = useState(false);
    const copyRef = useRef(null);
    const URL =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3000'
            : 'https://queasong.onrender.com';

    useClickOutside(copyRef, () => {
        setLinkCopied(false);
    });

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            setLinkCopied(true);
        });
    }

    return (
        <div className='link-menu'>
            <details open>
                <summary>Links</summary>
                {linkCopied ? (
                    <p className="link-copied">Link copied to clipboard!</p>
                ) : (
                    <p className="copy-link">
                        Click on a name to copy link to clipboard
                    </p>
                )}
                <div id="submission-links">
                    {partyData.members.slice(1).map((member) => {
                        const fullUrl = `${URL}/${encodeURIComponent(member.name)}/${party_id}`;
                        return (
                            <div
                                className="submission-link"
                                key={member.name}
                                ref={copyRef}
                                onClick={() => copyToClipboard(fullUrl)}
                            >
                                <h3>{encodeURIComponent(member.name)}</h3>
                            </div>
                        );
                    })}
                </div>
            </details>
        </div>

    );
}
