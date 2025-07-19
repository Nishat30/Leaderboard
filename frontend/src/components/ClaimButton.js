import React from 'react';
import '../styles/ClaimButton.css'; // Create this CSS file

function ClaimButton({ onClaimPoints }) {
    return (
        <button onClick={onClaimPoints} className="claim-points-button">
            Claim Random Points
        </button>
    );
}

export default ClaimButton;