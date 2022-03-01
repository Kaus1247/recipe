import React from "react";
import RecipeCard, { SelectedRecipeFooter, UnselectedRecipeFooter } from "./RecipeCard";
import { shallow } from "enzyme";
import Box from "../../components/Box";
import Text from '../../components/Text';

describe('RecipeCard', () => {

  it('renders without crashing', () => {
    let recipeCardWrapper = shallow(<RecipeCard/>);
    expect(recipeCardWrapper).not.toEqual(null);
  })

  describe('Contains', () => {

    let recipeCardWrapper;
    let recipeCardContainer;
    let imageSrcUri;
    let recipeName;
    let recipeheadline;
    beforeAll(() => {
      imageSrcUri = "image-src";
      recipeName = "recipe 1";
      recipeheadline = "This is a sample headline";
      recipeCardWrapper = shallow(<RecipeCard image={imageSrcUri} name={recipeName} headline={recipeheadline}/>);
      recipeCardContainer = recipeCardWrapper.find(Box).at(0);
    })

    it('3 childrens under the box container of recipe card', () => {
      const boxChildrens = recipeCardContainer.children();
      expect(boxChildrens).toHaveLength(3);
    })

    it('one image inside the first children', () => {
      const boxChildrens = recipeCardContainer.children();
      const firstChild = boxChildrens.first();
      const image = firstChild.find('img');
      expect(image).toHaveLength(1);
    })

    it('two text nodes inside the second children', () => {
      const boxChildrens = recipeCardContainer.children();
      const secondChild = boxChildrens.at(1);
      const textNodes = secondChild.find(Text)
      expect(textNodes).toHaveLength(2)
    })

    it('renders third child as SelectedRecipeFooter if recipe is added more 1 or more times', () => {
      const imageSrcUri = "image-src";
      const recipeName = "recipe 1";
      const recipeheadline = "This is a sample headline";
      const recipeSelectedCount = 2;
      let recipeCardWrapper = shallow(<RecipeCard image={imageSrcUri} name={recipeName} headline={recipeheadline} selected={recipeSelectedCount}/>);
      let recipeCardContainer = recipeCardWrapper.find(Box).at(0);
      const boxChildrens = recipeCardContainer.children();
      const thirdChild = boxChildrens.at(2);
      const selectedRecipeFooter = thirdChild.find(SelectedRecipeFooter)
      expect(selectedRecipeFooter).toHaveLength(1)
    })

    it('renders third child as UnselectedRecipeFooter if recipe is not selected at all', () => {
      const imageSrcUri = "image-src";
      const recipeName = "recipe 1";
      const recipeheadline = "This is a sample headline";
      const recipeSelectedCount = 0;
      let recipeCardWrapper = shallow(<RecipeCard image={imageSrcUri} name={recipeName} headline={recipeheadline} selected={recipeSelectedCount}/>);
      let recipeCardContainer = recipeCardWrapper.find(Box).at(0);
      const boxChildrens = recipeCardContainer.children();
      const thirdChild = boxChildrens.at(2);
      const unselectedRecipeFooter = thirdChild.find(UnselectedRecipeFooter)
      expect(unselectedRecipeFooter).toHaveLength(1)
    })

  })

  it('renders a image whose src is passed as a prop to it', () => {
    const imageSrcUri = "image-src"
    let recipeCardWrapper = shallow(<RecipeCard image={imageSrcUri}/>);
    let recipeCardContainer = recipeCardWrapper.find(Box).at(0);
    const boxChildrens = recipeCardContainer.children();
    const firstChild = boxChildrens.first();
    const imageElement = firstChild.find('img');
    const imageSrc = imageElement.props().src;
    expect(imageSrc).toEqual(imageSrcUri);
  })

  it('displays a recipe name & headline, passed as props to it', () => {
    const imageSrcUri = "image-src";
    const recipeName = "recipe 1";
    const recipeheadline = "This is a sample headline";
    let recipeCardWrapper = shallow(<RecipeCard image={imageSrcUri} name={recipeName} headline={recipeheadline}/>);
    let recipeCardContainer = recipeCardWrapper.find(Box).at(0);
    const boxChildrens = recipeCardContainer.children();
    const secondChild = boxChildrens.at(1);
    const secondChildAsText = secondChild.text()
    expect(secondChildAsText).toContain(recipeName);
    expect(secondChildAsText).toContain(recipeheadline);
  })

  it('should render correct layout when recipe is added once or more', () => {
    const recipeData = {
      image: "image-src",
      name: "recipe 1",
      headline: "This is a sample headline",
      selected: 1,
      extraCharge: 1234,
      id: "123",
      maxRecipesSelected: false,
      minRecipesSelected: true,
      selectionLimit: 1,
      yields: 2,
    }
    let recipeCardWrapper = shallow(<RecipeCard {...recipeData}/>);
    expect(recipeCardWrapper.getElements()).toMatchSnapshot()
  })

  it('should render correct layout when recipe is not added at all', () => {
    const recipeData = {
      image: "image-src",
      name: "recipe 1",
      headline: "This is a sample headline",
      selected: 0,
      extraCharge: 3433,
      id: "123",
      maxRecipesSelected: true,
      minRecipesSelected: true,
      selectionLimit: 1,
      yields: 4,
    }
    let recipeCardWrapper = shallow(<RecipeCard {...recipeData}/>);
    expect(recipeCardWrapper.getElements()).toMatchSnapshot()
  })
})
