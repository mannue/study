import React from "react";
import Adapter from "enzyme-adapter-react-16"
import Enzyme, { mount, shallow } from "enzyme";
import App from "./App"
import ValueInput from "./ValueInput";

Enzyme.configure({ adapter: new Adapter() });
it("uses title prop", () => {
    const titleVal = "test title";
    const wrapper = mount(<App title={titleVal}/>);

    const firstTitle = wrapper.find("h5").text();
    const stateValue = wrapper.state("title");

    expect(firstTitle).toBe(titleVal);
    expect(stateValue).toBe(titleVal);
})

it('updates state data',() => {
   const wrapper = shallow(<App/>)
    const button = wrapper.find("button").first();

   const values = [10,20,30]
   values.forEach((val, index) => {
       wrapper.instance().updateFieldValue(index + 1, val);
   })

    button.simulate("click")

    wrapper.instance().updateTotal();
   expect(wrapper.state("total")).toBe(values.reduce((total, val)=> total + val),0)
});

it('child function prop updates state ',  () => {
    const wrapper = mount(<App/>)
    const vaInput = wrapper.find(ValueInput).first()
    const inputElem = vaInput.find("input").first()

    inputElem.simulate("change", { target: { value: "100"}})
    wrapper.instance().updateTotal();

    expect(vaInput.state("fieldValue")).toBe("100");
    expect(wrapper.state("total")).toBe(100)
});