import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  currentPageUsers: [],
  usersById: {},
  totalPages: 1,
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },

    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },

    getFriendRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },

    sendFriendRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    },
    declineRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
  
    },
    acceptRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.usersById[targetUserId].friendship = friendship;
    

    },
    cancelRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.usersById[targetUserId].friendship = null;
     
    },
    removeFriendSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.usersById[targetUserId].friendship = null;
    },
  },
});

export default friendSlice.reducer;

export const getUsers =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(friendSlice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/users", { params });
      dispatch(friendSlice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(friendSlice.actions.hasError(error.message));
      toast.error(error.message)
    }
    };
export const getFriends =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(friendSlice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/friends", { params });
      dispatch(friendSlice.actions.getFriendsSuccess(response.data));
    } catch (error) {
      dispatch(friendSlice.actions.hasError(error.message));
      toast.error(error.message)

    }
    };
export const getIncomingFriendsRequests =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(friendSlice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/friends/requests/incoming", { params });
      dispatch(friendSlice.actions.getFriendRequestsSuccess(response.data));
    } catch (error) {
      dispatch(friendSlice.actions.hasError(error.message));
      toast.error(error.message)

    }
    };
  
export const getOutgoingFriendsRequests =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(friendSlice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/friends/requests/outgoing", { params });
      dispatch(friendSlice.actions.getFriendRequestsSuccess(response.data));
    } catch (error) {
      dispatch(friendSlice.actions.hasError(error.message));
      toast.error(error.message)

    }
    };
  

export const sendFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(friendSlice.actions.startLoading());
  try {
    const response = await apiService.post(`/friends/requests`, {
      to: targetUserId,
    });
    dispatch(
      friendSlice.actions.sendFriendRequestSuccess({
        ...response.data,
        targetUserId,
      })
    );

  toast.success("Request sent")
  } catch (error) {
    dispatch(friendSlice.actions.hasError(error.message));
    toast.error(error.message)
  }
};

export const declineRequest = (targetUserId) => async (dispatch) => {
  dispatch(friendSlice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "declined",
    });
    dispatch(
      friendSlice.actions.declineRequestSuccess({
        ...response.data,
        targetUserId,
      })
    );
    toast.success("Request declined")

  } catch (error) {
    dispatch(friendSlice.actions.hasError(error.message));
    toast.error(error.message)
  }
};
export const acceptRequest = (targetUserId) => async (dispatch) => {
  dispatch(friendSlice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "accepted",
    });
    dispatch(
      friendSlice.actions.acceptRequestSuccess({
        ...response.data,
        targetUserId,
      })
    );
    toast.success("Request accepted")

  } catch (error) {
    dispatch(friendSlice.actions.hasError(error.message));
    toast.error(error.message)
  }
};
export const cancelRequest = (targetUserId) => async (dispatch) => {
  dispatch(friendSlice.actions.startLoading());
  try {
    const response = await apiService.delete(
      `/friends/requests/${targetUserId}`
    );
    dispatch(
      friendSlice.actions.cancelRequestSuccess({
        ...response.data,
        targetUserId,
      })
    );
    toast.success("Request cancelled")

  } catch (error) {
    dispatch(friendSlice.actions.hasError(error.message));
    toast.error(error.message)
  }
};
export const removeFriend = (targetUserId) => async (dispatch) => {
  dispatch(friendSlice.actions.startLoading());
  try {
    const response = await apiService.delete(`/friends/${targetUserId}`);
    dispatch(
      friendSlice.actions.removeFriendSuccess({
        ...response.data,
        targetUserId,
      })
    );
    toast.success("Friend removed")

  } catch (error) {
    dispatch(friendSlice.actions.hasError(error.message));
    toast.error(error.message)
  }
};