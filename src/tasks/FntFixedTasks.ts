import fs from "fs";
import { TaskConfig } from "./TaskConfig";
import { TaskInterface } from "./TaskInterface";

export class FntFixedTasks implements TaskInterface {
    /**
     * 处理任务
     *
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig): void {
        let fntFileBuffer: Buffer = fs.readFileSync(taskConfig.fntFilePath);
        let fntFileString = fntFileBuffer.toString();

        let fileLines: string[] = fntFileString.split(/\n/);
        let newFileLines = fileLines.map((line: string) => {
            // 只处理 yoffset 的行
            let index = line.indexOf("yoffset");
            if (index == -1) {
                return line;
            }

            // 找出 yoffset=xxx 的字符串
            let blocks: string[] = line.split(/\s+/);
            let curYOffsetFormula = blocks.find((block) => {
                return block.startsWith("yoffset");
            });
            if (!curYOffsetFormula) {
                return line;
            }

            // 计算 xxx 的新值
            let curYOffset: number = Number.parseInt(curYOffsetFormula.split("=")[1]);
            let newYOffset: number = curYOffset + taskConfig.yOffset;
            let newYOffsetFormula = "yoffset=" + newYOffset;

            // 写回到该行
            return line.replace(curYOffsetFormula, newYOffsetFormula);
        });

        // 重写回去
        fs.writeFileSync(taskConfig.fntFilePath, newFileLines.join("\n"));
    }
}
