import axios from 'axios';
import React, {useState, useEffect} from 'react';
import authHeader from '../../services/auth-header';
import CommentForm from './CommentForm';

function DetailPost({params}) {
    const [content, setContent] = useState([]);
    
    useEffect(() => {
      axios.get(`http://localhost:9090/v1/api/posts/${params}`, 
      {
        headers: authHeader() 
      }
      ).then(response => {
        setContent(response.data);
      }), 
      (error) => {
        console.log(error);
      }
    });
    return (
      <div className="max-w-6xl mx-auto py-4">
        {/* 제목 */}
        <div className="py-4 px-4 border-b-2 ">
            <p className="py-2 text-4xl text-gray-600">{content.title}</p>
        </div>
        {/* 글쓴이, 날짜, 조회, 추천 */}
        <div className="text-sm py-4 flex justify-start relative text-gray-500 border-b-2 ">
            <p className="px-4 border-r-2 ">세인</p>
            <p className="px-4 border-r-2 ">hyun@gmail.com</p>

        </div>
        {/* 내용 */}
        <div className=" h-72">
            <p className="px-4 py-4">{content.content}</p>
        </div>
          {/* 목록 이전글 다음글  */}
        <div className="flex justify-end pt-4 pb-32">
        <button className='bg-gray-100 rounded-xl px-2 py-2  mr-2'>목록</button>
            <button className='bg-gray-100 rounded-xl px-2 mr-2'>이전글</button>
            <button className='bg-gray-100 rounded-xl  px-2 '>다음글</button>
        </div>
        {/* 댓글부분 - 댓글 개수 추가  */}
        <div>
            <p className="text-sm py-4 border-b-2">댓글 1</p>
            <CommentForm />
        </div>
        </div>
    );
}

export default DetailPost;