import { Grid } from '@mui/material';
import React from 'react';
import Controls from '../../../../../../components/controls/Controls';
import { Form, useForm } from '../../../../../../hooks/customHooks/useForm';

export default function FeedbackForm(props) {
  const { addNewReplyFeedback, recordForEdit, nameButton } = props;

  const initialFValues = {
    feedbackId: recordForEdit,
    content: '',
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addNewReplyFeedback(values, resetForm);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Input
            name="feedbackId"
            label="Feedback Id"
            value={recordForEdit}
            disabled
          />
          <Controls.Input
            name="content"
            label="Content"
            value={values.content}
            onChange={handleInputChange}
          />
        </Grid>

        <div>
          <Controls.Button type="submit" text={nameButton} />
          <Controls.Button text="Reset" color="default" onClick={resetForm} />
        </div>
      </Grid>
    </Form>
  );
}
