import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import './pin.scss';
import { AdvancedMarker, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';

function Pin({data}) {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    
    const position = {
        lat: Number(data.latitude),
        lng: Number(data.longitude)
    };

    if (isNaN(position.lat) || isNaN(position.lng)) {
        console.error('Invalid coordinates:', data.latitude, data.longitude);
        return null;
    }

    const handleMarkerClick = useCallback(
        () => setInfoWindowShown(isShown => !isShown),
        []
    );

    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={position}
                onClick={handleMarkerClick}
            />

            {infoWindowShown && (
                <InfoWindow anchor={marker} onClose={handleClose}>
                    <div className="popupContainer">
                        <img src={data.img[0]} alt="" />
                        <div className="textContainer">
                            <Link to={`/${data.id}`}>{data.title}</Link>
                            <span>{data.bedroom} bedroom</span>
                            <b>$ {data.price}</b>
                        </div>
                    </div>
                </InfoWindow>
            )}
        </>
    );
}

export default Pin;