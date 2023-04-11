import React from "react";
import FormProfileKOL from "../FormContent/FormProfileKOL";
import FormEmail from "../FormContent/FormEmail";
import FormPassword from "../FormContent/FormPassword";
import FormActivity from "../FormContent/FormActivity";
import FormPayment from "../FormContent/FormPayment";

const components = [
  { key: "1", component: <FormProfileKOL /> },
  { key: "sub1", component: <FormEmail /> },
  { key: "sub2", component: <FormPassword /> },
  { key: "3", component: <FormActivity /> },
  { key: "4", component: <FormPayment /> },
];

const SubContext = (props) => {
  return (
    <div className="sub-context" style={{ width: "100%" }}>
      {!props.changeContent && <FormProfileKOL />}
      {components.map((component) => {
        if (component.key === props.changeContent) return component.component;
      })}
    </div>
  );
};

export default SubContext;
