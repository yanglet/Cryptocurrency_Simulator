import React, {useState, useEffect} from "react";
import PostService from "../../services/post.service";
import Link from "next/link";

function index(props) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    PostService.getAllPosts().then(
        (response) => {
            setContent(response.data);
        },
        (error) => {
            console.log(error);
        }
    );
  }, []);

  return (
    <div className="text-center">
      <table className="inline-block border-t-2  border-slate-500 table-fixed">
        <thead>
          <tr className="bg-red-200">
            <th className="w-16 pr-5">번호</th>
            <th className="w-96 pr-5">제목</th>
            <th className="w-36 pr-5">글쓴이</th>
            <th className="w-36 pr-5">랭킹</th>
            <th className="pr-5 ">등록일</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item) => (
            // 각 게시글 클릭시 이동
            <Link href={`/community/${item.id}`}>
              <tr className="border-b-2" key={item.id}>
                <td className="text-center pr-5">{item.id}</td>
                <td className="pr-5">{item.title}</td>
                <td className="text-center pr-5 w-44">{item.member.name}</td>
                <td className="text-center pr-5 w-44">{item.member.ranking.rank}</td>
                <td className="text-center pr-5">{item.createdDate}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default index;
