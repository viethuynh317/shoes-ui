import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFeedbackByIdSlice } from '../../../../employeeSlice';
import ReplyFeedbackForm from './components/ReplyFeedbackForm/ReplyFeedbackForm';
import '../../../../../..//components/ProductDetailContent/index.css';

export default function ReplyFeedback() {
  const { replyFeedbacks } = useSelector((state) => state.employee);
  const { reply, content, createAt, numOfStars, userName } = replyFeedbacks;

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedbackByIdSlice(id));
  }, [dispatch, id]);

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <div className="product-detail-content-left">
          <img
            src="https://i.pinimg.com/236x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg"
            alt="img"
          />
        </div>
        <div className="product-detail-content-right">
          <h1 className="product-detail-content-title">{userName}</h1>
          <p className="product-detail-content-create-at">
            {new Date(createAt).toLocaleString()}
          </p>
          <table className="mt-1">
            <tbody>
              {content ? (
                <tr>
                  <td>Feedback:</td>
                  <td>
                    <p className="product-detail-content-description">
                      {content}
                    </p>
                  </td>
                </tr>
              ) : null}
              <tr>
                <td>Stars:</td>
                <td>
                  <p className="product-detail-content-description">
                    {numOfStars}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="product-detail-feedbacks">
        <h2 className="list-feedback-name">Reply Feedback</h2>
        {reply !== undefined ? (
          <div className="list-feedback">
            {reply.length > 0 ? (
              reply.map((feedback, index) => (
                <ReplyFeedbackForm feedback={feedback} key={index} />
              ))
            ) : (
              <p className="no-feedback">Chưa có đánh giá.</p>
            )}
          </div>
        ) : (
          <p className="no-feedback">Chưa có đánh giá.</p>
        )}
      </div>
    </div>
  );
}
