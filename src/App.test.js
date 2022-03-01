import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import ThemeProvider from './components/ThemeProvider';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Body from './layout/Body';
import { Router } from "@reach/router";
import Recipes from "./pages/Recipes";

describe('App', () => {

  let appWrapper;
  beforeAll(()=> {
    appWrapper = shallow(<App/>);
  })

  it('renders without crashing', () => {

    expect(appWrapper).not.toEqual(null);
  })

  it('should have one themeProvider', () => {
    const themeProvider = appWrapper.find(ThemeProvider)
    expect(themeProvider).toHaveLength(1);
  })

  it('should have a themeProvider with 3 childrens', () => {
    const themeProvider = appWrapper.find(ThemeProvider)
    const themeProviderChildrens = themeProvider.children();
    expect(themeProviderChildrens).toHaveLength(3);
  })

  it('should have a Header', () => {
    const header = appWrapper.find(Header)
    expect(header).toHaveLength(1);
  })

  it('should have a Body', () => {
    const body = appWrapper.find(Body)
    expect(body).toHaveLength(1);
  })

  it('should have a Router', () => {
    const router = appWrapper.find(Router)
    expect(router).toHaveLength(1);
  })

  it('should have a Router with only one route', () => {
    const router = appWrapper.find(Router)
    const routes = router.children()
    expect(routes).toHaveLength(1);
  })

  it('should have a Router which will have Recipes as a route', () => {
    const router = appWrapper.find(Router)
    const routes = router.find(Recipes)
    expect(routes).toHaveLength(1);
  })

  it('should have a Footer', () => {
    const footer = appWrapper.find(Footer)
    expect(footer).toHaveLength(1);
  })

  it('should render initial layout', () => {
    expect(appWrapper.getElements()).toMatchSnapshot()
  })

});



