const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export default config;
