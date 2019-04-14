export function updateSelectedDay ({ commit, state }, payload) {
    payload.active = true;
    state.selected_day = payload;
    commit("UPDATE_SELECTED_DAY");
}

export function updateWeather ({ commit, state }, payload) {
    state.weather = payload;
    commit("UPDATE_WEATHER");
}

export function updateDays ({ commit, state }, payload) {
    payload.dt = new Date(payload.dt * 1000)
    payload.active = false

    for(let weather of payload.weather) {
        switch (weather.main) {
            case "Clouds": 
                payload.img = state.icons[0];
                break;
            case "Clear": 
                payload.img = state.icons[1];
                break;
            case "Rain": 
                payload.img = state.icons[2];
                break;
        }
    }

    state.days.push(payload);
    commit("UPDATE_WEATHER");
}