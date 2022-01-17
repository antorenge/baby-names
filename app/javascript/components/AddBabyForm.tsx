import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface AddBabyFormProps {
  onSubmit: (name: string) => void;
}

const AddBabyForm = ({ onSubmit }: AddBabyFormProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateOneSpace = (name: string): boolean => {
    return /^(\w+\s?)*\s*$/.test(name) && name.split(" ").length - 1 == 1;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const trimmedName = name.trim();
    setError("");

    if (!trimmedName) {
      setError("Field is required.");
      return;
    }

    if (validateOneSpace(trimmedName)) {
      onSubmit(trimmedName);
      setName("");
    } else {
      setError("Only one space allowed between name");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-3 mb-3">
        <Form.Control
          type="text"
          placeholder="Enter baby name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={Boolean(error)}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddBabyForm;
