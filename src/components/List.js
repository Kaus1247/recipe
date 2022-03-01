import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, layout } from 'styled-system';
import propTypes from '@styled-system/prop-types';

export const ListItem = styled.li`
  padding: ${(props) => {return props.padding || 0 }};
  border-top: ${(props) => {return props.borderTop || 0 }};
`;

ListItem.defaultProps = {
  margin: 0,
  padding: 0,
  width: '100%',
  border: 'none',
};

ListItem.displayName = 'ListItem';

const List = styled.ul`
  list-style-type: ${(props) => props.listStyleType};
  ${space}
  ${layout}
`;

List.propTypes = {
  ...propTypes.layout,
  ...propTypes.space,
  listStyleType: PropTypes.string,
};

List.defaultProps = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  width: '100%',
};

List.displayName = 'List';

export default List;
