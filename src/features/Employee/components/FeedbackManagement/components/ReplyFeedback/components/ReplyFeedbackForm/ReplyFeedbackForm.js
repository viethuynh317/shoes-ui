import React from 'react';
import Input from '../../../../../../../../components/controls/Input';

export default function ReplyFeedbackForm({ feedback }) {
  return (
    <>
      <div className="feedback">
        <div className="header-feedback">
          <div className="header-feedback-left">
            <img
              className="feedback-user-avatar"
              src="https://i.pinimg.com/236x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg"
              alt="img"
            ></img>
          </div>
          <div className="header-feedback-right">
            <div>
              <span className="feedback-user-name">{feedback.userName}</span>
              {feedback.numOfStars ? (
                <span className="feedback-num-star">
                  {Math.round(feedback.numOfStars * 10) / 10} sao
                </span>
              ) : (
                ''
              )}
            </div>
            <span className="feedback-date">{new Date(feedback.createAt).toLocaleString()}</span>
            <div className="body-feedback">
              <p style={{ marginBottom: '5px' }}>Reply Feedback:</p>
              <Input value={feedback.content} disabled />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
