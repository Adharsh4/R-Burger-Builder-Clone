import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/Buildcontrols';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder setIngredientToInitial={() => {}}/>); // since in componentDidMount has the method we are makking sure we are claing this method and it doesnt take any args and it can be empty
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});