import { FntFixedTasks } from "./tasks/FntFixedTasks";
import { TaskConfig } from "./tasks/TaskConfig";

export class FntHelper {
    start() {
        let taskConfig = new TaskConfig();
        let tasks = [
            // 对输出的图片加密
            new FntFixedTasks(),
        ];
        tasks.forEach((task) => {
            task.handle(taskConfig);
        });
        console.log("恭喜，处理成功！");
    }
}

new FntHelper().start();
