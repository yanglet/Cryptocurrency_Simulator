import React from 'react';

function CommentForm(props) {
  
    return (
        <form>
      <div className="flex pt-8">
        <div className="w-5/6">
          <label htmlFor="content">
            <input
              className="pl-16 h-24 w-full border-2 border-gray-600 rounded-xl"
              type="text"
              id="content"
              name="content"
              required
            />
          </label>
        </div>
        <div className="w-1/6 pl-4">
          <button
            type="submit"
            className="w-full h-24 text-xl inline-block rounded-xl bg-gray-200 text-gray-600"
          >
            등록
          </button>
        </div>
      </div>
    </form>
    );
}

export default CommentForm;