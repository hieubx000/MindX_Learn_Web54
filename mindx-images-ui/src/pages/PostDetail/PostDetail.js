import React from 'react'
import { useLocation, useParams, useSearchParams} from 'react-router-dom'
import {MainLayout} from '../../components/Layout'

export default function PostList() {
    const {id} = useParams()
    const location = useLocation()
    const [serchParams] = useSearchParams()
    console.log(location, Object.fromEntries([...serchParams]));
    // const {postId} = params
    // console.log(postId);
    return (
        <MainLayout>
            <div>Đây là trang post detail {id}</div>
        </MainLayout>
    )
}
