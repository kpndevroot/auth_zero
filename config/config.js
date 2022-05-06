const config = {
  PORT: 7001,
  ENV: "PROD",
  DEV: {
    DATABASE: {
      // URI: "mongodb://127.0.0.1",
      URI: "mongodb://localhost",
      PORT: 27017,
      DATABASE: "Authzero",
    },
    EMAIL: {
      SERVICE: "gmail",
      MAIL_ID: "",
      PASS: "",
    },
    PRIVATEKEY:
      "dfvvlkfdmlv98usvjksjuefjsjdkcnskdncjsdhc9okjdsckljsdku8r9vjdjf",
    PRIVATEKEYS:
      "25krtiogadfvvlkfdmlv98usfkinozooznnFFzljfg4305vj99jgitrod",
  },
  PROD: {
    DATABASE: {
      URI: "mongodb+srv://auth:123@cluster0.urzzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      PORT: 27017,
      // DATABASE: "press",
      // DBlEY:"034942a1-35d2-4226-aa1a-ae9b04addf81"
    },
    EMAIL: {
      SERVICE: "gmail",
      MAIL_ID: "",
      PASS: "",
    },
    PRIVATEKEY:
      "dfvvlkfdmlv98usvjksjuefjsjdkcnskdncjsdhc9okjdsckljsdku8r9vjdjfv",
    PRIVATEKEYS:
      "25krtiogadfvvlkfdmlv98usfkinozooznn9c69okjdsckljsdku8r9vjdjfvkjndfkv",
  },
  R: {
    KEY_ID: "",
    KEY_SECRET: "",
  },
};

export default config;


