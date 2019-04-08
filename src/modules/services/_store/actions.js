export function updateSelectedServices ({ commit, dispatch, state }, payload) {
    payload.active = !payload.active;
    if (payload.active) {
        state.selectedServices.push(payload);
    } else {
        state.selectedServices.forEach(item => {
            if (payload == item) {
                let position = state.selectedServices.indexOf(item);
                state.selectedServices.splice(position, 1);
            }
        });
    }
    dispatch('updateDoclist');
    dispatch('updateTotalPrice');
    commit("UPDATE_SELECTED_SERVICES");
}

export function updateDoclist ({ commit, state }) {
    // в будущем переделать надо, как-то колхозно выглядит
    state.doclist = []
    for (let o of state.selectedServices) {
        for (let doc of o.documents) {
            if (state.doclist.indexOf(doc) < 0) {
                state.doclist.push(doc);
            }
        }
        if (o.selected_suboption) {
            for (let doc of o.selected_suboption.documents) {
                if (state.doclist.indexOf(doc) < 0) {
                    state.doclist.push(doc);
                }
            }
        }
    }
    commit("UPDATE_DOCLIST");
}

export function updateTotalPrice({ commit, state }) {
    state.totalPrice = 0;
    let maxPrice = 0;
    for (let s of state.selectedServices) {
        maxPrice = s.price > maxPrice ? s.price : maxPrice;
        if (s.sub_options) {
            maxPrice = s.selected_suboption.price > maxPrice ? s.selected_suboption.price : maxPrice;
        }
    }
    state.totalPrice = maxPrice + (state.selectedServices.length - 1) * 50;
    commit("UPDATE_TOTAL_PRICE");
}

export function updateCurrentService ({ commit, state }, payload) {
    state.currentService = payload;
    commit("UPDATE_CURRENT_SERVICE");
}

export function updateSelectedSuboption ({ commit, state }, payload) {
    state.serviceList[0].selected_suboption = payload;
    commit("UPDATE_SELECTED_SUBOPTION");
}