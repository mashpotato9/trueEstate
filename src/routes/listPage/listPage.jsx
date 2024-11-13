import './listPage.scss'
import Filter from '../../components/filter/filter.jsx'
import Cards from '../../components/cards/cards.jsx'
import GoogleMap from '../../components/map/map.jsx'
import { Await, useLoaderData } from 'react-router-dom'
import { Suspense } from 'react'

function ListPage() {

    const { postResponse } = useLoaderData()

    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await
                            resolve={postResponse}
                            errorElement={
                                <p>Error loading package location!</p>
                            }
                        >
                            {(postsData) => 
                                postsData.data.map(post=>
                                    <Cards key={post.id} data={post} />
                                )
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <GoogleMap data={{ postResponse }} />
            </div>
        </div>
    )
}

export default ListPage