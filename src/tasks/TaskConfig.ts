export class TaskConfig {
    /**
     * fnt 文件
     */
    fntFilePath: string = "";

    /**
     * 需要增加的 yoffset
     */
    yOffset: number = 0;

    constructor() {
        // console.log("当前执行文件所在目录路径", __dirname);
        // console.log("当前执行文件绝对路径", __filename);
        console.log("当前执行node命令的目录路径", process.cwd());
        console.log("可执行文件路径", process.argv[0]);
        console.log("将执行的脚本路径", process.argv[1]);
        console.log("传入参数", process.argv.slice(2));

        this._fromString(process.argv[2]);

        console.log("初始化项目配置");
        console.log(this);
    }

    private _fromString(inputString: string) {
        let params: string[] = inputString.split(";");
        params.forEach((param: string) => {
            let paramStruct = param.split("=");
            let paramName = paramStruct[0];
            let paramValue = paramStruct[1];
            switch (paramName) {
                case "path": {
                    this.fntFilePath = paramValue;
                    break;
                }
                case "yoffset": {
                    this.yOffset = Number.parseInt(paramValue);
                    break;
                }
            }
        });
    }
}
