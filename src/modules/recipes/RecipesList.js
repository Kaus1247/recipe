import React from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = React.useState(new Map());
  const { data, loading } = useFetchHelloFreshBox();

  // price summary and total price, feel free to remove or rename these variables and values.
  const [summary, setSummary] = React.useState(new Map());
  const [totalPrice, setTotalPrice] = React.useState(parseRawPrice(0));

  // min/max recipe boundaries, feel free to remove or rename these variables and values.
  const [minRecipesSelected, setMinRecipesSelected] = React.useState(false);
  const [maxRecipesSelected, setMaxRecipesSelected] = React.useState(false);

  const updateState = React.useCallback(
    (selectedRecipes, recipesCatalog, numRecipesSelected, boxTotalPrice) => {
      setSummary(selectedRecipes);
      setRecipes(recipesCatalog);
      setMinRecipesSelected(numRecipesSelected >= data.min)
      setMaxRecipesSelected(numRecipesSelected >= data.max)
      setTotalPrice(parseRawPrice(boxTotalPrice + data.shippingPrice))
    }, [setSummary, setRecipes, setMinRecipesSelected, setMaxRecipesSelected, setTotalPrice, data])

  React.useEffect(() => {
    const { recipes: fetchedRecipes } = data;

    if (fetchedRecipes) {
      const recipesCatalog = new Map();
      const existingSummary = new Map();
      let selectedRecipesCount = 0;
      let boxTotalPrice = 0;

      for(const recipe of fetchedRecipes){
        recipesCatalog.set(recipe.id, recipe);
        if(recipe.selected > 0){
          let recipePrice = (data.baseRecipePrice + recipe.extraCharge);
          let totalRecipePrice = recipePrice * recipe.selected;
          const recipeWithTotalPrice = Object.assign({},recipe,{totalRecipePrice})
          existingSummary.set(recipe.id, recipeWithTotalPrice);
          selectedRecipesCount += recipe.selected;
          boxTotalPrice += totalRecipePrice;
        }
      }
      updateState(existingSummary, recipesCatalog, selectedRecipesCount, boxTotalPrice);
    }
  }, [updateState, setRecipes, data]);

  if (loading) {
    return null;
  }

  const handleRecipeCatalogModification = (recipe, recipeId) => {
    const updatedRecipesCatalog = new Map([...recipes.entries()]);
    const recipePrice = data.baseRecipePrice + recipe.extraCharge;
    const totalRecipePrice =  recipePrice * recipe.selected;
    const recipeWithTotalCharge = Object.assign({},recipe,{totalRecipePrice});
    const updatedSummary = new Map([...summary.entries(), [recipeId, recipeWithTotalCharge]])
    if(recipeWithTotalCharge.selected === 0){
      updatedSummary.delete(recipeId);
    }
    let selectedRecipesCount = 0;
    let boxTotalPrice = 0
    for(const selectedRecipe of updatedSummary.values()){
      selectedRecipesCount += selectedRecipe.selected;
      boxTotalPrice += selectedRecipe.totalRecipePrice;
    }
    updateState(updatedSummary, updatedRecipesCatalog, selectedRecipesCount, boxTotalPrice);
  }

  // add/remove recipe, feel free to remove or rename these these variables and values.
  const handleAddRecipe = (recipeId) => {
    const addedRecipe = recipes.get(recipeId);
    if(!addedRecipe.selectionLimit || (addedRecipe.selectionLimit && addedRecipe.selected < addedRecipe.selectionLimit) ){
      addedRecipe.selected += 1;
    }
    handleRecipeCatalogModification(addedRecipe,recipeId)
  };

  const handleRemoveRecipe = (recipeId) => {
    const removedRecipe = recipes.get(recipeId);
    if(removedRecipe.selected > 0){
      removedRecipe.selected -= 1
    }
    handleRecipeCatalogModification(removedRecipe,recipeId);
  };

  return (
    <>
      <Row>
        <Col sm={6}>
          <span>
            <h2 className='h3'>{data.headline}</h2>
          </span>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>
                {
                  totalPrice === parseRawPrice(data.shippingPrice)
                    ? parseRawPrice(0)
                    : totalPrice
                }
              </h3>
            </Box>
            <PriceInfo summary={summary} totalPrice={totalPrice} shippingPrice={data.shippingPrice}/>
          </Flex>
        </Col>
      </Row>

      <Row>
        {Array.from(recipes.values()).map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={handleAddRecipe}
                handleRemoveRecipe={handleRemoveRecipe}
                minRecipesSelected={minRecipesSelected}
                maxRecipesSelected={maxRecipesSelected}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
