import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export const GuestList = ({ members, handleMemberNameChange }) => {
    return (
        <>
            {members.map((member, i) => (
                <label id="guests" key={i}>
                    <FontAwesomeIcon icon={faUser} size="xl" />
                    <input
                        placeholder={'Guest ' + (i + 1) + ' name'}
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberNameChange(i, e.target.value)}
                    />
                </label>
            ))}
        </>
    );
};