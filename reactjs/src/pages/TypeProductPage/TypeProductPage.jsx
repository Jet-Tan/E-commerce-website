import React from "react";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import { NavbarComponent } from "../../components/NavbarComponent/NavbarComponent";
import { Row, Col } from "antd";
import "./TypeProductPage.scss";
import { Pagination } from "antd";
export const TypeProductPage = () => {
  return (
    <div className="type-container">
      <Row gutter={16}>
        <Col span={5}>
          <NavbarComponent />
        </Col>

        <Col span={19}>
          <div className="type-card-content">
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </div>
          <div className="type-pagination">
            <Pagination defaultCurrent={1} total={500} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
