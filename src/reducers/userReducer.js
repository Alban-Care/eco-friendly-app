import { toast } from 'react-toastify';
import {
  USER_ON_INPUT_CHANGE,
  ON_SIGN_IN_SUCCESS,
  ON_SIGN_IN_ERROR,
  ON_SETTINGS_UPDATE_SUCCESS,
  ON_SETTINGS_UPDATE_ERROR,
  ON_EMAIL_UPDATE_SUCCESS,
  ON_EMAIL_UPDATE_ERROR,
  ON_EMAIL_VERIFICATION_SUCCESS,
  ON_EMAIL_VERIFICATION_ERROR,
  ON_PASSWORD_UPDATE_SUCCESS,
  ON_PASSWORD_UPDATE_ERROR,
  ON_DELETE_ACCOUNT_SUCCESS,
  ON_DELETE_ACCOUNT_ERROR,
  ON_LOG_OUT,
  ON_SIGN_UP_SUCCESS,
  ON_SIGN_UP_ERROR,
  ON_GET_ADVICES_SUCCESS,
  ON_GET_ADVICES_ERROR,
} from '../actions/userActions';

import { CLEAR_MESSAGES } from '../actions/commonActions';

import { loadState } from '../utils/sessionStorage';

export const initialState = {
  isLogged: false,
  isRegistered: false,
  isUpdated: false,
  isLoaded: false,
  token: loadState('token') || '',
  data: loadState('user') || null,
  advices: loadState('advices') || null,
  avatar: '',
  nickname: '',
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  passwordConfirm: '',
  registerInfo: {
    email: '',
    nickname: '',
  },
  messages: {
    success: null,
    error: null,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_ON_INPUT_CHANGE:
      return {
        ...state,
        [action.identifier]: action.value,
      };
    case ON_SIGN_IN_SUCCESS:
      toast.success('Bienvenue !  Vous êtes maintenant connecté !');
      return {
        ...state,
        data: action.user,
        token: action.token,
        messages: {
          ...state.messages,
          success: ['Connexion réussie'],
        },
        isLogged: true,
        email: '',
        password: '',
      };
    case ON_SIGN_IN_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.message,
        },
      };
    case ON_SETTINGS_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.user,
        messages: {
          ...state.messages,
          success: ['Vos informations ont été mises à jour'],
        },
        avatar: '',
        nickname: '',
        email: '',
        firstname: '',
        lastname: '',
      };
    case ON_SETTINGS_UPDATE_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case ON_EMAIL_UPDATE_SUCCESS:
      return {
        ...state,
        registerInfo: {
          email: action.email,
          nickname: action.nickname,
        },
        messages: {
          ...state.messages,
          success: ['Un mail de confirmation vous a été envoyé'],
        },
        isUpdated: true,
      };
    case ON_EMAIL_UPDATE_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case ON_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        registerInfo: {
          email: state.data.email,
          nickname: state.data.nickname,
        },
        messages: {
          ...state.messages,
          success: ['Un mail de confirmation vous a été envoyé'],
        },
        isUpdated: true,
      };
    case ON_EMAIL_VERIFICATION_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case ON_PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          success: ['Votre mot de passe a été mis à jour'],
        },
        password: '',
        passwordConfirm: '',
        isUpdated: true,
      };
    case ON_PASSWORD_UPDATE_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error,
        },
      };
    case ON_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLogged: false,
        isRegistered: false,
        isUpdated: false,
        isLoaded: false,
        token: '',
        data: null,
        advices: [],
        avatar: '',
        nickname: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        passwordConfirm: '',
        registerInfo: {
          email: '',
          nickname: '',
        },
        messages: {
          ...state.messages,
          success: ['Votre compte a été supprimé'],
        },
      };
    case ON_DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case ON_LOG_OUT:
      return {
        ...state,
        isLogged: false,
        isRegistered: false,
        isUpdated: false,
        isLoaded: false,
        token: '',
        data: null,
        advices: [],
        avatar: '',
        nickname: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        passwordConfirm: '',
        messages: {
          ...state.messages,
          success: ['Vous avez été déconnecté'],
        },
      };
    case ON_SIGN_UP_SUCCESS:
      return {
        ...state,
        registerInfo: {
          email: action.email,
          nickname: action.nickname,
        },
        messages: {
          ...state.messages,
          success: ['Félicitaions, un mail de confirmation vous a été envoyé'],
        },
        isRegistered: true,
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
      };
    case ON_SIGN_UP_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case ON_GET_ADVICES_SUCCESS:
      return {
        ...state,
        advices: action.advices,
        isLoaded: true,
      };
    case ON_GET_ADVICES_ERROR:
      return {
        ...state,
        messages: {
          ...state.messages,
          error: action.error.response.data.errors,
        },
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          success: null,
          error: null,
        },
      };
    default:
      return state;
  }
};

export default reducer;
