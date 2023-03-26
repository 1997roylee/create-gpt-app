#!/usr/bin/env node

import { createApp } from "./helpers/createApp";
import { logger } from "./utils";

// import { runCli } from "./helpers"

export const createGPTStackApp = () => {
    // runCli()
    logger.info("Creating GPT Stack App");
    createApp("/Users/roy/Desktop/SourceCode/demo")
}

createGPTStackApp();