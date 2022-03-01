import React from "react";
import PriceInfo from "./PriceInfo";
import { shallow } from "enzyme";
import Tooltip, { TooltipContainer } from "../../components/Tooltip";
import IconButton from "../../components/IconButton";
import IconInfoCircle from "../../icons/IconInfoCircle";
import PriceSummary from "./PriceSummary";

describe('PriceInfo', () => {
  it('renders without crash', () => {
    const priceInfoWrapper = shallow(<PriceInfo/>);
    expect(priceInfoWrapper).not.toEqual(null)
  })

  it('renders a tooltip container', () => {
    const priceInfoWrapper = shallow(<PriceInfo/>);
    const toolTipContainer = priceInfoWrapper.find(TooltipContainer);
    expect(toolTipContainer).toHaveLength(1);
  })

  it('renders a IconButton', () => {
    const priceInfoWrapper = shallow(<PriceInfo/>);
    const iconButton = priceInfoWrapper.find(IconButton);
    expect(iconButton).toHaveLength(1);
  })

  it('renders a IconInfoCircle', () => {
    const priceInfoWrapper = shallow(<PriceInfo/>);
    const iconInfoCircle = priceInfoWrapper.find(IconInfoCircle);
    expect(iconInfoCircle).toHaveLength(1);
  })

  it('does not renders a Tooltip initially', () => {
    const priceInfoWrapper = shallow(<PriceInfo/>);
    const tooltip = priceInfoWrapper.find(Tooltip);
    expect(tooltip).toHaveLength(0);
  })

  it('renders a Tooltip on click of icon button', () => {
    const priceInfoWrapper = shallow(<PriceInfo/>);
    const iconButton = priceInfoWrapper.find(IconButton);
    iconButton.simulate('click')
    const tooltip = priceInfoWrapper.find(Tooltip);
    expect(tooltip).toHaveLength(1);
  })

  it('renders a PriceSummary inside tooltip on click of icon button', () => {
    const priceInfoWrapper = shallow(<PriceInfo/>);
    const iconButton = priceInfoWrapper.find(IconButton);
    iconButton.simulate('click')
    const tooltip = priceInfoWrapper.find(Tooltip);
    const priceSummary = tooltip.find(PriceSummary)
    expect(priceSummary).toHaveLength(1);
  })

  it('passes all the of its own props to PriceSummary', () => {
    const summary = new Map();
    summary.set("recipeId1",{id: "recipeId1" , name : "recipe 1", selected : 2, totalRecipePrice: 1798 })
    const totalPrice = "$27.98";
    const shippingPrice = 1000;
    const priceInfoWrapper = shallow(<PriceInfo summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice}/>);
    const iconButton = priceInfoWrapper.find(IconButton);
    iconButton.simulate('click')
    const tooltip = priceInfoWrapper.find(Tooltip);
    const priceSummary = tooltip.find(PriceSummary)
    expect(priceSummary.props().summary).toEqual(summary);
    expect(priceSummary.props().totalPrice).toEqual(totalPrice);
    expect(priceSummary.props().shippingPrice).toEqual(shippingPrice);
  })

  it('should render correct layout before click on icon', () => {
    const summary = new Map();
    summary.set("recipeId1",{id: "recipeId1" , name : "recipe 1", selected : 2, totalRecipePrice: 1798 })
    const totalPrice = "$27.98";
    const shippingPrice = 1000;
    const priceInfoWrapper = shallow(<PriceInfo summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice}/>);
    expect(priceInfoWrapper.getElements()).toMatchSnapshot()
  })

  it('should render correct layout after click on icon', () => {
    const summary = new Map();
    summary.set("recipeId1",{id: "recipeId1" , name : "recipe 1", selected : 2, totalRecipePrice: 1798 })
    const totalPrice = "$27.98";
    const shippingPrice = 1000;
    const priceInfoWrapper = shallow(<PriceInfo summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice}/>);
    const iconButton = priceInfoWrapper.find(IconButton);
    iconButton.simulate('click')
    expect(priceInfoWrapper.getElements()).toMatchSnapshot()
  })


});
