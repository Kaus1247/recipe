import React from "react";
import PriceSummary from "./PriceSummary";
import { shallow } from "enzyme";
import List, { ListItem } from '../../components/List';
import Box from "../../components/Box";
import { parseRawPrice } from "./price";

describe('PriceSummary', () => {

  it('renders without crashing', () => {
    let priceSummaryWrapper = shallow(<PriceSummary/>);
    expect(priceSummaryWrapper).not.toEqual(null);
  })

  describe('when summary is not passed', () => {
    let priceSummaryWrapper;
    beforeAll(()=> {
      priceSummaryWrapper = shallow(<PriceSummary/>);
    })

    it('renders without crashing', () => {
      expect(priceSummaryWrapper).not.toEqual(null);
    })

    it('should render a List container even when summary is not passed as props', () => {
      const listContainer = priceSummaryWrapper.find(Box)
      expect(listContainer).toHaveLength(1)
    })

    it('should not render List when summary is not passed as props', () => {
      const list = priceSummaryWrapper.find(List)
      expect(list).toHaveLength(0)
    })
  });

  describe('when summary is passed', () => {
    let priceSummaryWrapper;
    beforeAll(()=> {
      // const summary = new Map();
      // priceSummaryWrapper = shallow(<PriceSummary summary={summary}/>);
    })

    it('should not render List if summary is empty', () => {
      const summary = new Map();
      priceSummaryWrapper = shallow(<PriceSummary summary={summary}/>);
      const list = priceSummaryWrapper.find(List)
      expect(list).toHaveLength(0)
    })

    it('should render List if summary has 1 item', () => {
      const summary = new Map();
      summary.set("recipeId1",{})
      priceSummaryWrapper = shallow(<PriceSummary summary={summary} totalPrice="$10.30" shippingPrice={1298}/>);
      const list = priceSummaryWrapper.find(List)
      expect(list).toHaveLength(1)
    })

    it('should render 3 ListItem if summary has 1 item', () => {
      const summary = new Map();
      summary.set("recipeId1",{name : "recipe 1", selected : 2, totalRecipePrice: 1798})
      priceSummaryWrapper = shallow(<PriceSummary summary={summary} />);
      const listItems = priceSummaryWrapper.find(ListItem)
      expect(listItems).toHaveLength(3)
    })

    it('should render 4 ListItem if summary has 2 item', () => {
      const summary = new Map();
      summary.set("recipeId1",{})
      summary.set("recipeId2",{})
      priceSummaryWrapper = shallow(<PriceSummary summary={summary} />);
      const listItems = priceSummaryWrapper.find(ListItem)
      expect(listItems).toHaveLength(4)
    })

    it('should render the correct recipe name ', () => {
      const summary = new Map();
      summary.set("recipeId1",{id: "recipeId1" , name : "recipe 1", selected : 2, totalRecipePrice: 1798 })
      const totalPrice = "$27.98";
      const shippingPrice = 1000;
      priceSummaryWrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice}/>);
      const recipeName = summary.get("recipeId1").name;
      expect(priceSummaryWrapper.text()).toContain(recipeName)
    })

    it('should render the correct total recipe price ', () => {
      const summary = new Map();
      summary.set("recipeId1",{id: "recipeId1" , name : "recipe 1", selected : 2, totalRecipePrice: 1798 })
      const totalPrice = "$27.98";
      const shippingPrice = 1000;
      priceSummaryWrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice}/>);
      const totalRecipePrice = summary.get("recipeId1").totalRecipePrice;
      expect(priceSummaryWrapper.text()).toContain(parseRawPrice(totalRecipePrice));
    })

    it('should render the correct shipping price', () => {
      const summary = new Map();
      summary.set("recipeId1",{id: "recipeId1" , name : "recipe 1", selected : 2, totalRecipePrice: 1798 })
      const totalPrice = "$27.98";
      const shippingPrice = 1000;
      priceSummaryWrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice}/>);
      const shippingPriceListItem = (priceSummaryWrapper.find(ListItem).at(1))
      const shippingPriceListItemAsText = shippingPriceListItem.text()
      expect(shippingPriceListItemAsText).toContain("Shipping " + parseRawPrice(shippingPrice));
    })

    it('should render the correct total box price ', () => {
      const summary = new Map();
      summary.set("recipeId1",{id: "recipeId1" , name : "recipe 1", selected : 2, totalRecipePrice: 1798 })
      const totalPrice = "$27.98";
      const shippingPrice = 1000;
      priceSummaryWrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice}/>);
      const totalPriceListItem = (priceSummaryWrapper.find(ListItem).at(2))
      const totalPriceListItemAsText = totalPriceListItem.text()
      expect(totalPriceListItemAsText).toContain("Total " + totalPrice)
    })

    it('should render correct layout for the given summary, totalPrice and shippingCost', () => {
      const summary = new Map();
      summary.set("recipeId1",{id: "recipeId1" , name : "recipe 1", selected : 2, totalRecipePrice: 1798 })
      const totalPrice = "$27.98";
      const shippingPrice = 1000;
      priceSummaryWrapper = shallow(<PriceSummary summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice}/>);
      expect(priceSummaryWrapper.getElements()).toMatchSnapshot()
    })
  });

});
