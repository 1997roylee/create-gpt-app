import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export enum OpenAIModelID {
  GPT_3_5 = "gpt-3.5-turbo",
  GPT_4 = "gpt-4",
}

type ValueOf<T> = T[keyof T];
export type OpenAIModel = ValueOf<OpenAIModelID>;

const DEFAULT_CONTENT_TYPE = "application/json";
const DEFAULT_MODEL_ID = OpenAIModelID.GPT_3_5;
const DEFAULT_METHOD = "POST";

export interface GPTConfig {
  max_tokens?: number;
  temperature?: number;
}

export class GPT {
  public model: OpenAIModel;
  private API_KEY: string;
  private MAX_TOKENS = 1000;
  private TEMPERATURE = 1;
  private DEFAULT_STREAM = true;
  public messages: any[] = [];

  constructor(model: OpenAIModel = DEFAULT_MODEL_ID, apiKey: string) {
    this.API_KEY = apiKey;
    this.model = model;
  }

  request = async (body: any, config: GPTConfig) => {
    const response = await fetch("${OPENAI_API_HOST}/v1/chat/completions", {
      method: DEFAULT_METHOD,
      headers: this.constructHeaders(),
      body: this.parseBody(body, config),
    });
    return this.parseResponse(response);
  };

  reset = async () => {};

  static async create(
    systemPropmt: String,
    model: OpenAIModel = DEFAULT_MODEL_ID,
    apiKey: string
  ) {
    return new GPT(model, apiKey);
  }

  private constructHeaders() {
    return {
      "Content-Type": DEFAULT_CONTENT_TYPE,
      Authorization: `Bearer ${this.API_KEY}`,
    };
  }

  private constructSystemMessage(systemPrompt: string) {
    return {
      role: "system",
      content: systemPrompt,
    };
  }

  private parseBody(body: any, config: GPTConfig) {
    return JSON.stringify({
      model: this.model,
      messages: [
        this.constructSystemMessage(body.systemPrompt),
        ...this.messages,
      ],
      max_tokens: config.max_tokens ?? this.MAX_TOKENS,
      temperature: config.temperature ?? this.TEMPERATURE,
      stream: this.DEFAULT_STREAM,
    });
  }

  private parseResponse(response: Response) {
    if (!response.ok) {
      const statusText = response.statusText;
      throw new Error(`OpenAI API returned an error: ${statusText}`);
    }

    return this.createStream(response);
  }

  private createStream(response: Response) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const onParse = (event: ParsedEvent | ReconnectInterval) => {
          if (event.type === "event") {
            const data = event.data;

            if (data === "[DONE]") {
              controller.close();
              return;
            }

            try {
              const json = JSON.parse(data);
              const text = json.choices[0].delta.content;
              const queue = encoder.encode(text);
              controller.enqueue(queue);
            } catch (e) {
              controller.error(e);
            }
          }
        };

        const parser = createParser(onParse);

        for await (const chunk of response.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      },
    });

    return stream;
  }
}
