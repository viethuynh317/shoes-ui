import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../../../../..//components/ProductDetailContent/index.css';
import { getFeedbackByIdSlice } from '../../../../employeeSlice';
import ReplyFeedbackForm from './components/ReplyFeedbackForm/ReplyFeedbackForm';

export default function ReplyFeedback() {
  const { replyFeedbacks } = useSelector((state) => state.employee);
  const { reply, content, createdAt, numOfStars, userName } = replyFeedbacks;

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
            src="https://secure.gravatar.com/avatar/b26407fdbb151a3a44fceda692c92874?s=60&d=mm&r=g"
            alt="img"
          />
        </div>
        <div className="product-detail-content-right">
          <h1 className="product-detail-content-title">{userName}</h1>
          <p className="product-detail-content-create-at">
            {moment(createdAt).format('HH:mm:ss, DD/MM/YYYY')}
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
