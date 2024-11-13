import { Suspense } from 'react';
import Pin from '../pin/pin';
import './map.scss';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Await } from 'react-router-dom';

function GoogleMap({ data }) {
    const getCenter = () => {
        if (data.postResponse) {
            return { 
                lat: 52.4797, 
                lng: -1.90269 
            };
        }
        return {
            lat: Number(data.latitude),
            lng: Number(data.longitude)
        };
    };

    return (

        <APIProvider apiKey={`${import.meta.env.VITE_GOOGLEMAP_API_KEY}`}>
            <Map defaultCenter={getCenter()} defaultZoom={7} mapId={`${import.meta.env.VITE_GOOGLEMAP_ID}`} className='map'>
            {data.postResponse ? (
                    <Suspense fallback={null}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={null}
                        >
                            {(postsData) => 
                                postsData.data.map((item) => (
                                    <Pin key={item.id} data={item} />
                                ))
                            }
                        </Await>
                    </Suspense>
                ) : (
                    <Pin data={data} />
                )}
            </Map>
        </APIProvider>
    );
}

export default GoogleMap;