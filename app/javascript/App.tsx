import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";

import AddBabyForm from "./components/AddBabyForm";
import BabyNameList from "./components/BabyNameList";
import { createBaby, listBabies } from "./features/babies/babiesSlice";
import { RootState } from "./store";
import { getUniqueId } from "./utils";

function App() {
  const { listId } = useParams();
  const [cookies, setCookie] = useCookies(["listId"]);
  const dispatch = useDispatch();
  const { babies, apiError } = useSelector((state: RootState) => state.babies);

  const [newListId] = useState(getUniqueId());
  const currentListId = cookies.listId || listId || newListId;

  useEffect(() => {
    if (listId) {
      dispatch(listBabies({ list_id: listId }));
    } else if (cookies?.listId) {
      dispatch(listBabies({ list_id: cookies.listId }));
    } else {
      dispatch(listBabies({ list_id: newListId }));
    }
  }, [listId, cookies, newListId, dispatch]);

  const handleSubmit = (name: string) => {
    const latestListId = listId || newListId;
    setCookie("listId", latestListId, { path: "/" });
    dispatch(
      createBaby({
        name,
        list_id: latestListId,
      })
    );
  };

  return (
    <Container>
      <h2>Baby Names</h2>
      {apiError?.createBaby && (
        <Row>
          <Col>
            <Alert variant="danger">{apiError["createBaby"]?.error}</Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={6}>
          <AddBabyForm onSubmit={handleSubmit} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={6}>
          <BabyNameList id={currentListId} babies={babies} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
