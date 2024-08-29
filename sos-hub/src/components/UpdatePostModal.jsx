import { useState, useEffect } from "react";

const UpdatePostModal = ({ postId, existingPost, handleUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    body: "",
    tags: [],
    media: ""
  });

  useEffect(() => {
    if (existingPost) {
      setUpdatedPost({
        title: existingPost.title || "",
        body: existingPost.body || "",
        tags: Array.isArray(existingPost.tags) ? existingPost.tags : [],
        media: existingPost.media || ""
      });
    }
  }, [existingPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setUpdatedPost((prevState) => ({
        ...prevState,
        [name]: value.split(",").map(tag => tag.trim())
      }));
    } else {
      setUpdatedPost((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    handleUpdate(postId, updatedPost);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isModalOpen ? "" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Update Post</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">&times;</button>
            </div>
            <input
              type="text"
              name="title"
              value={updatedPost.title}
              onChange={handleChange}
              placeholder="Title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <textarea
              name="body"
              value={updatedPost.body}
              onChange={handleChange}
              placeholder="Body"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            ></textarea>
            <input
              type="text"
              name="tags"
              value={updatedPost.tags.join(",")}
              onChange={handleChange}
              placeholder="Tags"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
            <input
              type="text"
              name="media"
              value={updatedPost.media}
              onChange={handleChange}
              placeholder="Media URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-500 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostModal;
