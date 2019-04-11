export function updateSelectedDay ({ commit, state }, payload) {
    payload.active = true;
    state.selected_day = payload;
    commit("UPDATE_SELECTED_DAY");
}
export function updateWeather ({ commit, state }, payload) {
    state.weather = payload;
    commit("UPDATE_WEATHER");
}