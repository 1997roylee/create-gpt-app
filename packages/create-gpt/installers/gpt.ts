import { Installer } from "../utils";

export default Installer.createInstaller({
    projectName: "OpenAI",
    dependencies: {
        "openai": "^3.2.0"
    },
})