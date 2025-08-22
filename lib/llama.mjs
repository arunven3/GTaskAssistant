// import path from "path";
// import { getLlama, LlamaChatSession } from "node-llama-cpp";

// export async function runLlama(prompt: string) {
//   process.env.LLAMA_CPP_PLATFORM = "win32";
//   process.env.LLAMA_CPP_ARCH = "x64";
//   process.env.LLAMA_CPP_DIST = "@node-llama-cpp/win32-x64";

//   const modelPath = path.join(
//     process.cwd(),
//     "LLMmodel",
//     "microsoft_Phi-4-mini-instruct-Q6_K.gguf",
//   );

//   const llama = await getLlama();
//   //   const model = await llama.loadModel({ modelPath });
//   //   const context = await model.createContext();

//   //   const session = new LlamaChatSession({
//   //     contextSequence: context.getSequence(),
//   //   });

//   //   return session.prompt(prompt);
// }

export async function getLlama() {
  const llama = await import("node-llama-cpp");
  return llama;
}
