import React from "react";
import Link from "next/link";

function Post({ content }) {
  return (
    <table className="w-full table-auto text-sm">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-2 w-14">번호</th>
          <th className="px-7 w-76 ">제목</th>
          <th className=" w-24 ">글쓴이</th>
          <th className="w-48">등록일</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {content &&
          content.map((item) => (
            <Link href={`/community/${item.id}`} key={item.id}>
              <tr className="border-b">
                <td className="px-2 py-3 w-14">{item.id}</td>
                <td className="px-7 w-76 ">{item.title}</td>
                <td className="w-24 ">{item.name}</td>
                <td className="w-48">{item.createTime}</td>
              </tr>
            </Link>
          ))}
      </tbody>
    </table>
  );
}

export default Post;
