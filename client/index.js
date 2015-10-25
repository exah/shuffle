import 'babel-core/polyfill';

import createStore from './store';
import reducers from './reducers';

import { readState } from './storage';
import { restoreState } from './smartActions';

import * as transport from './transport';
import { updateTopRooms, newMessage, newAttachment,
         joinUser, leaveUser } from 'actions';

import components from './components';

const store = createStore(reducers);
store.dispatch( restoreState( readState() ) );

components(store);

transport.onMessage( data => store.dispatch( newMessage(data) ) );
transport.onAttachment( data => store.dispatch( newAttachment(data) ) );
transport.onJoinUser( data => store.dispatch( joinUser(data) ) );
transport.onLeaveUser( data => store.dispatch( leaveUser(data) ) );
transport.onTopRooms( data => store.dispatch( updateTopRooms(data.rooms) ) );
