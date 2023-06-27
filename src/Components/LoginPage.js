import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import bghero from "../Image/bg-hero.jpg";
import GetStartedSnippet from "./PreviewGetStartedSnippet";

const { Title } = Typography;

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [subcription, setSubcription] = useState(false);
  const [planIds, setPlanIds] = useState();
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [existingCustomer, setExistingCustomer] = useState(false);
  //   const [customerDetails, setCustomerDetails] = useState(props.getAllCustomer);

  useEffect(() => {
    getFilterCustomer();
  }, [currentCustomer, planIds]);

  const onFinish = (values) => {
    let customerLogin = {
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      contact: values.contact,
    };
    setCurrentCustomer(customerLogin);
    localStorage.setItem("customerLogin", JSON.stringify(customerLogin));
    form.resetFields();
    props.setCustomerLogin(false);
    setSubcription(true);
  };

  const getFilterCustomer = () => {
    const filterCustomer = props?.getAllCustomer?.some(
      (cust) => cust.customerEmail === currentCustomer.email
    );
    setExistingCustomer(filterCustomer);
    const filterplanId = props?.getAllCustomer?.some(
      (id) => id.planId === props.selectedPlan
    );

    console.log(filterplanId);
    setPlanIds(filterplanId);
  };
  console.log(
    "testingg",
    existingCustomer,
    planIds,
    props.subStatus,
    props.previewPlan,
    props.selectedPlan,
    props.getAllCustomer.some((id) => id.subscriptionStatus === false)
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${bghero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ width: 400 }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
            Login
          </Title>
          <Form name="login" onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              name="fname"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name",
                },
              ]}
              className="customerDetails"
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lname"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name",
                },
              ]}
              className="customerDetails"
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
              className="customerDetails"
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="contact"
              label="Contact No."
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
              className="customerDetails"
            >
              <Input placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Modal
        title={
          existingCustomer && props.subStatus
            ? "Upgrade/Downgrade Subcription"
            : props.subStatus === false && existingCustomer
            ? null
            : "Create Subscriptions"
        }
        footer={null}
        open={subcription}
        onOk={() => setSubcription(false)}
        onCancel={() => setSubcription(false)}
        width={580}
        style={{ borderRadius: "10px" }}
        bodyStyle={
          existingCustomer
            ? {
                overflowX: "hidden",
                // overflowY: "hidden",
                borderRadius: "10px",
                height: "350px",
                padding: "2rem",
              }
            : {
                overflowX: "hidden",
                // overflowY: "hidden",
                borderRadius: "10px",
                height: "350px",
                padding: "2rem",
              }
        }
        closeIcon={
          <div
            onClick={() => {
              setSubcription(false);
            }}
            style={{ color: "#ffffff" }}
          >
            X
          </div>
        }
        className="viewModal"
      >
        {existingCustomer && planIds && props.subStatus === true ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>You can upgrade or downgrade your subscription plan</h1>

            <Button
              style={{
                width: "97px",
                marginTop: "5rem",
                background:
                  "linear-gradient(121.06deg, #5b92e5 20.17%, #2087c0 95.26%",
                color: "#ffffff",
              }}
              onClick={() => setSubcription(false)}
            >
              Ok
            </Button>
          </div>
        ) : existingCustomer && planIds && props.subStatus === false ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>
              You can't upgrade or downgrade your subscription plan through this
              plan
            </h1>

            <Button
              style={{
                width: "97px",
                marginTop: "5rem",
                background:
                  "linear-gradient(121.06deg, #5b92e5 20.17%, #2087c0 95.26%",
                color: "#ffffff",
              }}
              onClick={() => setSubcription(false)}
            >
              Ok
            </Button>
          </div>
        ) : (
          <GetStartedSnippet
            onCancel={() => setSubcription(false)}
            customerLogin={currentCustomer}
            previewPlan={props.previewPlan}
            selectedPlan={props.selectedPlan}
            selectedPrice={props.selectedPrice}
            tenantId={props.tenantId}
            productId={props.productId}
            subId={props?.subId}
            subStatus={props?.subStatus}
          />
        )}
      </Modal>
    </>
  );
};

export default LoginPage;
