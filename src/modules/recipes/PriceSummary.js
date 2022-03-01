import React from 'react';
import Box from '../../components/Box';
import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import List, { ListItem } from '../../components/List';
import Text from '../../components/Text';
import { parseRawPrice } from './price';

// Create PriceSummary user interface
const PriceSummary = ({ summary = (new Map()), totalPrice="$0.00", shippingPrice=0 }) => {
  return (
    <Box width={['290px', '450px']}>
      {
        summary.size > 0
          ? <List padding="16px">
              {
                Array.from(summary.values()).map((recipe, index)=>{
                  return (
                    <ListItem key={index+recipe.id} padding="0px 0px 8px 0px">
                      <Row>
                        <Col sm={9}>
                          <Flex alignItems="center" justifyContent="flex-start">
                            <Text fontWeight="400"> { recipe.name } x { recipe.selected }</Text>
                          </Flex>
                        </Col>
                        <Col sm={3}>
                          <Flex alignItems="center" justifyContent="flex-end">
                            <Text fontWeight="400">{ parseRawPrice(recipe.totalRecipePrice) }</Text>
                          </Flex>
                        </Col>
                      </Row>
                    </ListItem>
                  )
                })
              }
              <ListItem key={"shippingPrice"} padding="0px 0px 8px 0px">
                <Row>
                  <Col sm={9}>
                    <Flex alignItems="center" justifyContent="flex-start">
                      <Text fontWeight="400"> Shipping </Text>
                    </Flex>
                  </Col>
                  <Col sm={3}>
                    <Flex alignItems="center" justifyContent="flex-end">
                      <Text fontWeight="400">{ parseRawPrice(shippingPrice) }</Text>
                    </Flex>
                  </Col>
                </Row>
              </ListItem>
              <ListItem key={"totalBoxPrice"} padding="8px 0px 0px 0px" borderTop="1px solid #E4E4E4">
                <Row>
                  <Col sm={9}>
                    <Flex alignItems="center" justifyContent="flex-start">
                      <Text fontWeight="600"> Total </Text>
                    </Flex>
                  </Col>
                  <Col sm={3}>
                    <Flex alignItems="center" justifyContent="flex-end">
                      <Text fontWeight="600">{ totalPrice }</Text>
                    </Flex>
                  </Col>
                </Row>
              </ListItem>
            </List>
          : null
      }

    </Box>
  )
};

export default PriceSummary;
