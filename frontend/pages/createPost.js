import React from 'react';
import CreatePost from '../components/Post/CreatePost';
import Head from 'next/head';

function createPost(props) {
    return (
        <div>
            <Head>
                <title>모의 투자 사이트 | 커뮤니티 글쓰기</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="text-center mt-11 font-bold text-2xl">
                Cryptocurrency Simulator 
            </div>
            <div className="text-center my-6 font-bold text-2xl">
                커뮤니티 글쓰기
            </div> 
            <CreatePost />
        </div>
    );
}

export default createPost;