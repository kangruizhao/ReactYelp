export default function(state = null, action) {
  switch (action.type) {
    case "FETCH_REST":
      console.log(action);
      return action.payload || false;
      case "FETCH_AREST":
        console.log(action);
        return action.payload || false;
    default:
      return state;
  }
}
