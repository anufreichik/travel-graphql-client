import React from 'react';
import DestinationInfo from "./DestinationInfo";
import {useNavigate, useParams} from "react-router-dom";

const DestinationWrapper = () => {
    let {destinationId} = useParams();
    const navigate = useNavigate();
    if (!destinationId) navigate('/');
    return (
        <div>
            {destinationId && (
                <DestinationInfo destinationId={destinationId}/>
            )}
        </div>
    );
};

export default DestinationWrapper;
