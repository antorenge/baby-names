import React from "react";
import { ListGroup } from "react-bootstrap";
import { Baby } from "../types";

interface BabyNameListProps {
  id: string;
  babies: Baby[];
}

const BabyNameList = ({ id, babies }: BabyNameListProps) => {
  return (
    <div>
      <h5>List #{id}</h5>
      <ListGroup>
        {babies?.length ? (
          babies?.map((baby) => (
            <ListGroup.Item key={baby.id}>{baby.name}</ListGroup.Item>
          ))
        ) : (
          <p>No names have been submitted</p>
        )}
      </ListGroup>
    </div>
  );
};

export default BabyNameList;
