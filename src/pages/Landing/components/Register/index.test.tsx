import { mount } from "enzyme";
import React from "react";
import Register from "./index";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

const wrapper = mount(<Register />);
const submitBtn = wrapper.find("button");
const inputs = wrapper.find("Input");

describe("Register test", () => {
  it("test components", () => {
    expect(inputs.length === 3 && submitBtn.length === 1);
  });

  it("test error", () => {
    wrapper.find("form").simulate("submit");
    const errors = wrapper
      .find("span")
      .filterWhere((n) => n.hasClass("error-msg"));
    expect(
      errors.at(0).text() === "name is required" &&
        errors.at(1).text() === "email is required"
    );
  });

  it("test submit", () => {
    inputs.at(0).simulate("change", { target: { value: "name" } });
    inputs.at(1).simulate("change", { target: { value: "linrong123@qq.com" } });
    inputs.at(2).simulate("change", { target: { value: "linrong123@qq.com" } });
    wrapper.find("form").simulate("submit");
    expect(submitBtn.text() === "Sending, please wait");
  });
});
