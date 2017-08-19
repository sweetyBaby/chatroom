import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '../actions/login';
import Main from '../components/index/userList';

function mapStateToProps(state) {
  const props = {
    ...state.default.app,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = { getUsers };
  const actionMap = { actions: {
    ...bindActionCreators(actions, dispatch)
  } };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

