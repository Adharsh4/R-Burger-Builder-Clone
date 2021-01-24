import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import React from 'react'; // We are rendering NavigationItems so React is needed
import NavigationItem from './NavigationItem/NavigationItem';
//shallow render only the placeholder that is it oesnt render the sub components tree
configure({adapter: new Adapter()}) // to connect enzyme to our rect app and enzyme is used to render that particular component alone instead of rendering the whole component and testing 

describe('<NavigationItems />', () => {

    let wrapper;
    // beforeEach(()=>{
    //     wrapper = shallow(<NavigationItems />) // this function will get executed before runiing the test cases so no nned to declare the wrapper const inside every "it" function.
    //     // One more thing in second "it" we need authentication for that there is method provided by enzyme setProps. ex: wrapper.setProps({isAuthenticated: true})
    // })

    it('should render two <NavigationItem /> elemenets if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />) // here isAuthenticated is not passed so treated as false
        expect(wrapper.find(NavigationItem)).toHaveLength(2); //These are utilit methods made available by JEST
    })

    it('should render three <NavigationItem /> elemenets if authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated/>) // here isAuthenticated is  passed so treated as true automatically
        expect(wrapper.find(NavigationItem)).toHaveLength(3); 
    })

    it('should have logout link in  <NavigationItems />if authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated/>) // here isAuthenticated is  passed so treated as true automatically
        expect(wrapper.contains(<NavigationItem link = "/logout">Logout</NavigationItem>)).toEqual(true); 
    })
})