import EventsApi from '@/api/events';

const state = {
    events: [],
    event: {}
};

const mutations = {
    SET_ALL_EVENTS(state, events) {
        state.events = events;
    },

    SELECT_EVENT(state, event) {
        state.event = event;
    }
};

const actions = {
    retrieveEvents({commit, state}, force = false) {
        return new Promise((resolve, reject) => {
            if (state.events.length === 0 || force) { // If no events are loaded
                EventsApi.getAll()
                    .then(events => {
                        commit('SET_ALL_EVENTS', events.data);
                        resolve();
                    })
                    .catch(err => reject(err));
            }
            else {
                resolve();
            }
        });
    },

    selectEvent({dispatch, commit, state}, id) {
        return dispatch('retrieveEvents')
            .then(_ => {
                const event = state.events.filter(event => event.id === parseInt(id))[0];

                if (typeof event !== 'undefined') commit('SELECT_EVENT', event);
                else throw Error;
            });
    },

    unselectEvent({commit}) {
        return commit('SELECT_EVENT', {});
    },

    storeEvent({dispatch}, event) {
        return EventsApi.save(event)
            .then(_ => dispatch('retrieveEvents', true));
    },

    updateEvent({dispatch}, event) {
        return EventsApi.update(event)
            .then(_ => dispatch('retrieveEvents', true))
            .then(_ => dispatch('selectEvent', event.id));
    },

    deleteEvent({dispatch}, id) {
        return EventsApi.delete(id)
            .then(_ => dispatch('retrieveEvents', true))
            .catch(err => console.log(err));
    }
};

const getters = {
    events(state) {
        return state.events;
    },

    selectedEvent(state) {
        return state.event;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};