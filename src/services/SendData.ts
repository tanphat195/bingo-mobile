class SendData {
  cmd: string;
  params: any;
  constructor(cmd) {
    this.cmd = cmd;
    this.params = {};
  }

  getCmd = () => {
    return this.cmd;
  };

  getParams = () => {
    return this.params;
  };

  addParam = (key, value) => {
    this.params[key] = value;
    return this;
  };

  addParams = params => {
    this.params = { ...this.params, ...params };
  };
}

export default SendData;
