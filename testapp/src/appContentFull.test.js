import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount, shallow} from "enzyme";
import App from './App'

Enzyme.configure({ adapter: new Adapter() });
it("Fully renders three inputs", () => {
    const wrapper = mount(<App title="tester"/>)
    const count = wrapper.find("input.form-control").length
    expect(count).toBe(3);
})

it("Shallow renders zero inputs",()=>{
    const wrapper = shallow(<App />);
    const count = wrapper.find("input.form-control").length
    expect(count).toBe(0)
})