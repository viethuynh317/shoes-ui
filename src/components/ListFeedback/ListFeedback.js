import React from 'react';
import Feedback from '../Feedback/Feedback';
import './index.css';

export default function ListFeedback({ listFeedback }) {
  return (
    <>
      <h2 className="list-feedback-name">Đánh giá</h2>
      {listFeedback !== undefined ? (
        <div className="list-feedback">
          {listFeedback.length > 0 ? (
            listFeedback.map((feedback, index) => <Feedback feedback={feedback} key={index} />)
          ) : (
            <p className="no-feedback">Chưa có đánh giá.</p>
          )}
        </div>
      ) : (
        <p className="no-feedback">Chưa có đánh giá.</p>
      )}
    </>
  );
}
