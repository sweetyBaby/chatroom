import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, logoutUser } from '../actions/login';
import Main from '../components/login';

function mapStateToProps(state) {
  const props = {
    ...state.default.login,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = { login, logoutUser };
  const actionMap = { actions: {
    ...bindActionCreators(actions, dispatch)
  } };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);

