import React from "react";
import RecipesList from "./RecipesList";
import { shallow, mount } from "enzyme";
import hellofreshBox from '../../data/hellofreshBox';
import PriceInfo from './PriceInfo';
import RecipeCard, { SelectedRecipeFooter, UnselectedRecipeFooter } from "./RecipeCard";

const mockHelloFreshBox = hellofreshBox;

jest.mock('../../hooks/useFetchHelloFreshBox', () => {
  return{
  __esModule: true,
  default: jest.fn().mockImplementation(() => {
    return {
      loading : false,
      data : mockHelloFreshBox
    }
  }),
}})



describe('RecipesList', () => {

  let recipesListWrapper;
  beforeAll(() => {
    recipesListWrapper = shallow(<RecipesList/>);
  })
  it('renders without crashing', () => {
    expect(recipesListWrapper).not.toEqual(null);
  })

  it('renders a react fragment', () => {
    const containerType = recipesListWrapper.type()
    expect(containerType).toEqual(React.Fragment)
  })

  it('renders a react fragment having 2 childs', () => {
    const childs = recipesListWrapper.children()
    expect(childs).toHaveLength(2)
  })

  it('renders a box heading inside the first child', () => {
    const firstChild = recipesListWrapper.children().at(0)
    const firstChildAsText = firstChild.text();
    expect(firstChildAsText).toContain(hellofreshBox.headline)
  })

  it('renders summary button inside the first child', () => {
    let recipesListWrapper = shallow(<RecipesList/>);
    const firstChild = recipesListWrapper.children().at(0)
    const priceInfos = firstChild.find(PriceInfo);
    expect(priceInfos).toHaveLength(1)
  })

  describe('when data is loaded',() => {
    let secondChild;
    beforeAll( () => {
      recipesListWrapper = mount(<RecipesList/>);
      recipesListWrapper.update()
      secondChild = recipesListWrapper.children().at(1);
    })

    it('renders correct number of recipes cards inside the second child', () => {
      const recipeCards = secondChild.find(RecipeCard);
      expect(recipeCards).toHaveLength(hellofreshBox.recipes.length)
    })

    it('renders correct footer when recipe is selected equal to selectionLimit of recipe per box', () => {
      const recipeIndex = 0;
      const recipeCard = secondChild.find(RecipeCard).at(recipeIndex);

      const selectedRecipeFooters = recipeCard.find(SelectedRecipeFooter);
      const unselectedRecipeFooters = recipeCard.find(UnselectedRecipeFooter);

      expect(selectedRecipeFooters).toHaveLength(1);
      expect(unselectedRecipeFooters).toHaveLength(0)

      const incrementSelection = selectedRecipeFooters.at(0).find('button').at(1);
      const decrementSelection = selectedRecipeFooters.at(0).find('button').at(0);
      expect(incrementSelection.props().disabled).toEqual(true);
      expect(decrementSelection.props().disabled).toEqual(false);
    })

    it('renders correct footer when recipe is selected but less than its selection limit per box', () => {
      const recipeIndex = 2;
      const recipeCard = secondChild.find(RecipeCard).at(recipeIndex);

      const selectedRecipeFooters = recipeCard.find(SelectedRecipeFooter);
      const unselectedRecipeFooters = recipeCard.find(UnselectedRecipeFooter);

      expect(selectedRecipeFooters).toHaveLength(1);
      expect(unselectedRecipeFooters).toHaveLength(0)

      const incrementSelection = selectedRecipeFooters.at(0).find('button').at(1);
      const decrementSelection = selectedRecipeFooters.at(0).find('button').at(0);

      expect(incrementSelection.props().disabled).toEqual(null);
      expect(decrementSelection.props().disabled).toEqual(false);
    })

    it('renders correct footer when recipe is not selected', () => {
      const recipeIndex = 20;
      const recipeCard = secondChild.find(RecipeCard).at(recipeIndex);

      const selectedRecipeFooters = recipeCard.find(SelectedRecipeFooter);
      const unselectedRecipeFooters = recipeCard.find(UnselectedRecipeFooter);

      expect(selectedRecipeFooters).toHaveLength(0);
      expect(unselectedRecipeFooters).toHaveLength(1)
      const addMealButton = unselectedRecipeFooters.find('button')
      expect(addMealButton).toHaveLength(1);
    })

  })

})
