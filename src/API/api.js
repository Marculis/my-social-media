import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: { "API-KEY": "7f9d8199-145b-4be9-a880-a02b952595cc" },
});

export const authAPI = {
  authMe: () => {
    return instance.get("auth/me").then((response) => {
      return response.data;
    });
  },

  setMeLogin: (loginData) => {
    return instance.post("auth/login", loginData).then((response) => {
      return response.data;
    });
  },
  setMeLogout: () => {
    return instance.delete("auth/login").then((response) => {
      return response.data;
    });
  },
  getCaptcha: () => {
    return instance.get("security/get-captcha-url").then((response) => {
      return response.data.url;
    });
  },
};

export const profileAPI = {
  getProfile: (userId) => {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },
  getStatus: (userId) => {
    return instance.get(`profile/status/${userId}`).then((response) => {
      return response.data;
    });
  },
  updateStatus: (status) => {
    return instance.put("profile/status", { status }).then((response) => {
      return response.data;
    });
  },

  loadProfilePhoto: (photo) => {
    const formData = new FormData();
    formData.append("file", photo);
    return instance
      .put("profile/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        return response.data;
      });
  },

  editProfile: (profileData) => {
    return instance.put("profile", profileData).then((response) => {
      return response;
    });
  },
};

export const usersAPI = {
  getUsers: (count, page, term, friend) => {
    return instance
      .get("users", {
        params: {
          count: count,
          page: page,
          term: term,
          friend: friend,
        },
      })
      .then((response) => {
        return response.data;
      });
  },
  followUser: (userId) => {
    return instance.post(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
  unfollowUser: (userId) => {
    return instance.delete(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
  isFollow: (userId) => {
    return instance.get(`follow/${userId}`).then((response) => {
      return response;
    });
  },
};
export const dialogsAPI = {
  getDialogs: () => {
    return instance.get("dialogs").then((response) => {
      return response.data;
    });
  },
  getMessagesWithUser: (userId) => {
    return instance.get(`dialogs/${userId}/messages`).then((response) => {
      return response.data;
    });
  },
  postMessageToUser: (userId, message) => {
    return instance
      .post(`dialogs/${userId}/messages`, message)
      .then((response) => {
        return response;
      });
  },
  deleteMessage: (messageId) => {
    return instance.delete(`dialogs/messages/${messageId}`).then((response) => {
      return response.data;
    });
  },
};
