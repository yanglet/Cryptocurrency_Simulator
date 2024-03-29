import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { PostsProvider } from "../../contexts/Post";
import PostContainers from "../../components/Post/containers/PostContainers";
import { PostDetailProvider } from "../../contexts/Post/detail";
import PostDetailContainers from "../../components/Post/containers/PostDetailContainers";
import Btn from "../../components/Post/components/Btn";
import CommentContainers from "../../components/Comment/containers/CommentContainers";
import { CommentsProvider } from "../../contexts/Comment";
import CommentForm from "../../components/Comment/components/CommentForm";
import { useEffect } from "react";
function Community(props) {
  const router = useRouter();
  const { params } = router.query;
  console.log(params);
  const [postId, setPostId] = useState([])
  
  useEffect(() => {
    setPostId(params)
  }, [params])


  if (params === undefined) {
    return (
      <div className="mb-40 max-w-5xl mx-auto">
        <Head>
          <title>모의 투자 사이트 | 커뮤니티</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="py-11 px-9 ">
          <div className="text-lg mb-9 pb-2 border-b-2 text-gray-600 font-bold">
            커뮤니티
          </div>
          <div className='text-right mb-9'>

          <Btn src="/community/post" color="bg-blue-500 rounded-lg text-white text-sm p-2" value="쓰기"/>
          </div>
          <PostsProvider>
            <PostContainers />
          </PostsProvider>
        </div>
      </div>
    ) }
    else{
      return (
        <div className="mb-40 max-w-5xl mx-auto">
        <Head>
          <title>모의 투자 사이트 | 커뮤니티</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="py-11 px-9 ">
        <div className="text-lg mb-4 pb-2 border-b-2 text-gray-600 font-bold">
            게시글
          </div>
          <PostDetailProvider id={params}>
            <PostDetailContainers />
          </PostDetailProvider>
          <div className="text-sm mb-4 pb-6 border-b-2 text-gray-600 font-bold">
            댓글
          </div>
          <CommentsProvider id={params}>
            <CommentContainers id={params} />
          </CommentsProvider>
          <CommentForm id={params} />

        </div>
        </div>
      )
      }
}
export default Community;
