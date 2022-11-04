import { useRouter } from "next/router";
import React, { useState } from "react";
import useInput from "../../../hooks/useInput";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { settings } from "../setting"

function PostForm() {
  const router = useRouter();
  const [content, onChangeContent] = useInput("");
  const [title, onChangeTitle] = useInput("");
  const [showImages, setShowImages] = useState([]);
  const handleAddImages = (event) => {
   
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const multipartFiles = e.target.multipartFiles.files; //form의 input을 갖고옴
    const formData = new FormData();
    for (const i = 0; i < multipartFiles.length; i++) {
      formData.append("requestFiles", multipartFiles[i]);
    }
    const requestData = {
      content,
      title,
    };

    const json = JSON.stringify(requestData);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("requestData", blob);
    for (const value of formData.values()) {
      console.log(value);
    }
    const res = await axios({
      method: "POST",
      url: "http://localhost:9090/v1/api/posts/post",
      mode: "cors",
      headers: authHeader(),
      data: formData,
    }).then(() => {
      router.push("/community");
      alert("게시글 업로드 완료!");
    });
    console.log(res);
  };
  return (
    <form className="my-6 text-sm" encType="multipart/form-data" onSubmit={onSubmit}>
      <div className="flex pb-7 border-b">
        <p className="text-gray-600 my-auto  ">제목</p>
        <input
          required
          value={title}
          onChange={onChangeTitle}
          className="text-gray-3 border outline-none px-3 ml-24 w-3/4 py-1 rounded-lg"
          placeholder="제목을 입력하세요. "
        />
      </div>
      <div className="text-gray-600 my-auto py-11 flex">
          <p className="text-sm text-gray-3 ">
            사진 첨부
          </p>
          <div>
          <input
          className="ml-16"
          type="file"
          id="Img"
          accept="image/*"
          name="multipartFiles"
          multiple
          onChange={handleAddImages}
        />
        <div className="text-center py-4">
            <Slider {...settings}>
              {showImages &&
                showImages.map((image, id) => (
                  <div key={id}>
                    <Image
                      src={image}
                      alt={`${image}-${id}`}
                      width="200"
                      height="200"
                    />
                  </div>
                ))}
            </Slider>
            </div>
        </div>
        </div>
 
      <div className="">
        <input
          required
          value={content}
          onChange={onChangeContent}
          className="text-gray-3 w-full border h-96 px-4 outline-none rounded-lg"
          placeholder="자유롭게 글을 작성해보세요 : ) "
        />
      </div>
      <div className="flex justify-end my-4">
        {/* router이용하여 뒤로가기  */}
        <button
          onClick={() => router.back()}
          className="bg-gray-100 rounded-lg py-1 px-2 mr-2 text-sm font-semibold"
          type="submit"
        >
          취소
        </button>
        <button
          className="bg-blue-500 text-white rounded-lg py-1 px-2 mr-2 text-sm font-semibold"
          type="submit"
        >
          확인
        </button>
      </div>
    </form>
  );
}

export default PostForm;
