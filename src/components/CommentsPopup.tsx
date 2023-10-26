import React, { FC } from "react";

interface ComponentsPopupProps {
  data: Comment[];
  isActivePopup: boolean;
  handleClosePopup: (bool: boolean) => void;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentsPopup: FC<ComponentsPopupProps> = ({
  data,
  isActivePopup,
  handleClosePopup,
}) => {
  const comments = data;
  const closePopup = () => {
    handleClosePopup(false);
  };
  return (
    <div
      className={isActivePopup ? "popup-container  active" : "popup-container"}
    >
      <button className="closePopup" onClick={closePopup}>
        X
      </button>
      <ul>
        {comments.length > 0 ? (
          comments.map((item) => (
            <li className="comment-item" key={item.id}>
              <p className="comment-name"> Name : {item.name}</p>
              <p className="comment-email"> Email: {item.email}</p>
              <p className="comment-text">Text: {item.body}</p>
            </li>
          ))
        ) : (
          <h2>No Comments</h2>
        )}
      </ul>
    </div>
  );
};

export default CommentsPopup;
